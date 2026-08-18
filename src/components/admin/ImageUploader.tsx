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
  aspectRatio?: "square" | "video";
};

function storagePathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/media/";
  const index = url.indexOf(marker);
  return index >= 0 ? decodeURIComponent(url.slice(index + marker.length)) : null;
}

function generateUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  label = "Görsel yükle",
  aspectRatio,
}: ImageUploaderProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isSquare = aspectRatio ? aspectRatio === "square" : label.toLowerCase().includes("logo");

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
        const path = `${user.id}/${Date.now()}-${generateUUID()}.${extension}`;
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
    <div className="flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={inputId} className="block text-sm font-semibold text-zinc-800">
            {label}
          </label>
          <span className="text-[11px] font-medium text-slate-400">JPEG, PNG · En fazla 5 MB</span>
        </div>

        {visibleImages.length > 0 ? (
          <div className={`grid gap-3 ${multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
            {visibleImages.map((url, index) => {
              const isTemporary = previewUrls.includes(url);
              return (
                <div
                  key={`${url}-${index}`}
                  className={`relative group overflow-hidden rounded-xl border border-zinc-200 bg-slate-50 shadow-sm transition hover:shadow-md ${
                    isSquare
                      ? "mx-auto size-36 sm:size-40"
                      : "w-full aspect-video min-h-[140px] sm:min-h-[160px]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className={`size-full ${isSquare ? "object-contain p-2 bg-white" : "object-cover"}`}
                  />
                  {isTemporary ? (
                    <div className="absolute inset-0 grid place-items-center rounded-xl bg-zinc-950/60 text-white">
                      <LoaderCircle className="size-6 animate-spin" aria-label="Yükleniyor" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void removeImage(url)}
                      className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/95 text-red-600 shadow transition hover:bg-red-600 hover:text-white"
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
      </div>

      <div>
        <label
          htmlFor={inputId}
          className={`flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-4 py-2.5 text-center text-sm font-semibold text-zinc-800 transition-colors hover:border-red-500 hover:bg-red-50/60 hover:text-red-700 ${
            uploading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          {uploading ? (
            <LoaderCircle className="size-4.5 animate-spin text-red-600" aria-hidden="true" />
          ) : (
            <ImagePlus className="size-4.5 text-red-600" aria-hidden="true" />
          )}
          <span>
            {uploading
              ? "Yükleniyor…"
              : visibleImages.length > 0
              ? (multiple ? "Yeni Görsel Ekle" : "Görseli Değiştir")
              : (multiple ? "Görselleri Seç" : "Görsel Seç")}
          </span>
        </label>
      </div>

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
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
