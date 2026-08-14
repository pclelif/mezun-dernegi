"use client";

import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { useId, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type ImageUploaderProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
};

function storagePathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/media/";
  const index = url.indexOf(marker);
  return index >= 0 ? decodeURIComponent(url.slice(index + marker.length)) : null;
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  label = "Görsel yükle",
}: ImageUploaderProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(null);

    const selected = Array.from(files);
    const invalidType = selected.find((file) => !ALLOWED_TYPES.has(file.type));
    if (invalidType) {
      setError("Yalnızca JPEG, PNG veya WebP görseller yüklenebilir.");
      return;
    }

    const tooLarge = selected.find((file) => file.size > MAX_FILE_SIZE);
    if (tooLarge) {
      setError(`"${tooLarge.name}" 5 MB sınırını aşıyor.`);
      return;
    }

    const filesToUpload = multiple ? selected : selected.slice(0, 1);
    const temporaryPreviews = filesToUpload.map((file) => URL.createObjectURL(file));
    setPreviewUrls(temporaryPreviews);
    setUploading(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Görsel yüklemek için oturum açmalısınız.");

      const uploadedUrls: string[] = [];

      for (const file of filesToUpload) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(path, file, { contentType: file.type, upsert: false });

        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("media").getPublicUrl(path);
        uploadedUrls.push(data.publicUrl);
      }

      onChange(multiple ? [...value, ...uploadedUrls] : uploadedUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
    } finally {
      temporaryPreviews.forEach(URL.revokeObjectURL);
      setPreviewUrls([]);
      setUploading(false);
    }
  }

  async function removeImage(url: string) {
    setError(null);
    try {
      const path = storagePathFromPublicUrl(url);
      if (path) {
        const supabase = createClient();
        const { error: removeError } = await supabase.storage.from("media").remove([path]);
        if (removeError) throw removeError;
      }
      onChange(value.filter((item) => item !== url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel silinemedi.");
    }
  }

  const visibleImages = uploading ? [...value, ...previewUrls] : value;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={inputId} className="text-sm font-semibold text-zinc-800">
          {label}
        </label>
        <span className="text-xs text-slate-500">JPEG, PNG, WebP · en fazla 5 MB</span>
      </div>

      {visibleImages.length > 0 ? (
        <div className={`grid gap-3 ${multiple ? "grid-cols-2 sm:grid-cols-3" : "max-w-sm grid-cols-1"}`}>
          {visibleImages.map((url, index) => {
            const isTemporary = previewUrls.includes(url);
            return (
              <div key={`${url}-${index}`} className="relative aspect-video overflow-hidden rounded-lg bg-slate-200">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${url})` }}
                  aria-hidden="true"
                />
                {isTemporary ? (
                  <div className="absolute inset-0 grid place-items-center bg-zinc-950/50 text-white">
                    <LoaderCircle className="size-6 animate-spin" aria-label="Yükleniyor" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => void removeImage(url)}
                    className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/95 text-red-600 shadow hover:bg-red-600 hover:text-white"
                    aria-label="Görseli sil"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}

      <label
        htmlFor={inputId}
        className={`flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-4 py-5 text-center transition-colors hover:border-red-400 hover:bg-red-50/30 ${
          uploading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <ImagePlus className="size-6 text-red-600" aria-hidden="true" />
        <span className="mt-2 text-sm font-semibold text-zinc-800">
          {uploading ? "Yükleniyor…" : multiple ? "Görselleri seç" : "Görsel seç"}
        </span>
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        disabled={uploading}
        className="sr-only"
        onChange={(event) => {
          void handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
