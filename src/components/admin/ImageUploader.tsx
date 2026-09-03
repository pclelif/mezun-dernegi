"use client";

import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { GripVertical, ImagePlus, LoaderCircle, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { useId, useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_RAW_FILE_SIZE = 50 * 1024 * 1024; // 50 MB before automatic client compression

/**
 * Compresses an image file in the browser using HTML Canvas before upload.
 * Resizes max dimension to 1920px (full HD) and compresses to JPEG ~85% quality.
 */
async function compressImageFile(file: File, maxDimension = 1920, quality = 0.85): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      // Draw white background behind transparent PNGs when converting to JPEG
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // If blob is larger than original without dimension reduction, keep original
          if (blob.size >= file.size && width === img.width && height === img.height) {
            resolve(file);
            return;
          }

          const newFileName = file.name.replace(/\.[^/.]+$/, ".jpg");
          const compressedFile = new File([blob], newFileName, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          resolve(compressedFile);
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

type ImageUploaderProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
  aspectRatio?: "square" | "video";
  cropAspectRatio?: number;
};

/** Crops a file using the pixel crop area returned by react-easy-crop */
async function cropImageFileByArea(file: File, pixelCrop: Area, outputAspectRatio: number): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const outW = 1600;
  const outH = Math.round(outW / outputAspectRatio);
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(
    bitmap,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outW,
    outH
  );
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
  if (!blob) return file;
  return new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg", lastModified: Date.now() });
}

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
  cropAspectRatio,
}: ImageUploaderProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cropFiles, setCropFiles] = useState<File[]>([]);
  const [cropIndex, setCropIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // react-easy-crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const isSquare = aspectRatio ? aspectRatio === "square" : true;
  const currentCropFile = cropFiles[cropIndex];
  const currentCropUrl = useMemo(
    () => (currentCropFile ? URL.createObjectURL(currentCropFile) : null),
    [currentCropFile]
  );

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function uploadFiles(filesToUpload: File[], replaceIndex?: number) {
    setUploading(true);
    try {
      const temporaryPreviews = filesToUpload.map((file) => URL.createObjectURL(file));
      setPreviewUrls(temporaryPreviews);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Görsel yüklemek için oturum açmalısınız.");
      const uploadedUrls: string[] = [];
      for (const file of filesToUpload) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${user.id}/${Date.now()}-${generateUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
        if (uploadError) throw uploadError;
        uploadedUrls.push(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
      }
      if (replaceIndex !== undefined) {
        const updated = [...value];
        updated[replaceIndex] = uploadedUrls[0];
        onChange(updated);
      } else {
        onChange(multiple ? [...value, ...uploadedUrls] : uploadedUrls);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
    } finally {
      setPreviewUrls((current) => { current.forEach(URL.revokeObjectURL); return []; });
      setUploading(false);
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(null);

    const selected = Array.from(files);
    const invalidType = selected.find((file) => !ALLOWED_TYPES.has(file.type));
    if (invalidType) {
      setError("Yalnızca JPEG, PNG veya WebP görseller yüklenebilir.");
      return;
    }

    const tooLarge = selected.find((file) => file.size > MAX_RAW_FILE_SIZE);
    if (tooLarge) {
      setError(`"${tooLarge.name}" 50 MB sınırını aşıyor.`);
      return;
    }

    try {
      // Auto-compress photos in browser before upload
      const compressedFiles = await Promise.all(
        selected.map((file) => compressImageFile(file, 1920, 0.85))
      );

      const filesToUpload = multiple ? compressedFiles : compressedFiles.slice(0, 1);
      if (cropAspectRatio) {
        setCropFiles(filesToUpload);
        setCropIndex(0);
        setEditingIndex(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
      } else {
        await uploadFiles(filesToUpload);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
    }
  }

  async function applyCrop() {
    const file = cropFiles[cropIndex];
    if (!file || !croppedAreaPixels) return;
    const cropped = await cropImageFileByArea(file, croppedAreaPixels, cropAspectRatio ?? 1);
    const next = [...cropFiles];
    next[cropIndex] = cropped;
    if (cropIndex + 1 < next.length) {
      setCropFiles(next);
      setCropIndex(cropIndex + 1);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } else if (editingIndex !== null) {
      setCropFiles([]);
      setCropIndex(0);
      await uploadFiles(next, editingIndex);
      setEditingIndex(null);
    } else {
      setCropFiles([]);
      setCropIndex(0);
      await uploadFiles(next);
    }
  }

  async function editImage(url: string, index: number) {
    if (!cropAspectRatio) return;
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Görsel düzenleme için açılamadı.");
      const blob = await response.blob();
      const file = new File([blob], "duzenlenmis-gorsel.jpg", {
        type: blob.type || "image/jpeg",
      });
      setCropFiles([file]);
      setCropIndex(0);
      setEditingIndex(index);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel düzenleme için açılamadı.");
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

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, index: number) {
    if (!multiple) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, index: number) {
    if (!multiple || draggedIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  }

  function handleDrop(dropIndex: number) {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const updated = [...value];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, moved);
    onChange(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  const visibleImages = uploading ? [...value, ...previewUrls] : value;

  return (
    <div className="flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <label htmlFor={inputId} className="block text-sm font-semibold text-zinc-800">
              {label}
            </label>
            {multiple && visibleImages.length > 1 && (
              <p className="text-xs text-slate-500 mt-0.5">
                Fotoğrafların sırasını değiştirmek için sürükleyip bırakabilirsiniz.
              </p>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-400">JPEG, PNG, WebP</span>
        </div>

        {visibleImages.length > 0 ? (
          <div className={`grid gap-3.5 ${multiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1"}`}>
            {visibleImages.map((url, index) => {
              const isTemporary = previewUrls.includes(url);
              const isDragging = draggedIndex === index;
              const isOver = dragOverIndex === index;

              return (
                <div
                  key={`${url}-${index}`}
                  draggable={multiple && !isTemporary}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(index);
                  }}
                  onDragEnd={handleDragEnd}
                  className={`relative group overflow-hidden rounded-xl border bg-white shadow-xs transition-all duration-150 ${
                    multiple ? "cursor-grab active:cursor-grabbing" : ""
                  } ${
                    isSquare ? "w-full" : "w-full min-h-[140px] sm:min-h-[160px]"
                  } ${
                    isDragging
                      ? "opacity-30 scale-[0.98] border-dashed border-red-400 bg-slate-100"
                      : isOver
                      ? "border-2 border-red-500 ring-2 ring-red-500/20 scale-[1.02] shadow-md"
                      : "border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                  }`}
                  style={{ aspectRatio: cropAspectRatio ?? (isSquare ? 1 : 16 / 9) }}
                >
                  {/* Order sequence number badge */}
                  {multiple && (
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-xs pointer-events-none">
                      <GripVertical className="size-3 text-zinc-300" />
                      <span>{index + 1}</span>
                    </div>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="size-full select-none object-cover pointer-events-none"
                  />

                  {isTemporary ? (
                    <div className="absolute inset-0 grid place-items-center rounded-xl bg-zinc-950/60 text-white">
                      <LoaderCircle className="size-6 animate-spin" aria-label="Yükleniyor" />
                    </div>
                  ) : (
                    <div className="absolute right-2 top-2 z-10 flex gap-1.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                      {cropAspectRatio ? (
                        <button
                          type="button"
                          onClick={() => void editImage(url, index)}
                          className="grid size-7.5 place-items-center rounded-full bg-white/95 text-zinc-700 shadow-sm transition hover:bg-zinc-900 hover:text-white"
                          aria-label="Görseli düzenle"
                          title="Görseli düzenle"
                        >
                          <Pencil className="size-3.5" aria-hidden="true" />
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => void removeImage(url)}
                        className="grid size-7.5 place-items-center rounded-full bg-white/95 text-red-600 shadow-sm transition hover:bg-red-600 hover:text-white"
                        aria-label="Görseli sil"
                        title="Görseli sil"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
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
              ? (multiple ? "Yeni Fotoğraf Ekle" : "Görseli Değiştir")
              : (multiple ? "Fotoğrafları Seç" : "Görsel Seç")}
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

      {/* ── react-easy-crop modal ── */}
      {cropFiles.length > 0 && cropAspectRatio && currentCropUrl ? (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-5 shadow-2xl">
            <h2 className="text-base font-bold text-zinc-950">
              Fotoğrafı Kırp
              {cropFiles.length > 1 ? ` (${cropIndex + 1} / ${cropFiles.length})` : ""}
            </h2>

            {/* Crop canvas area */}
            <div
              className="relative w-full overflow-hidden rounded-xl bg-zinc-900"
              style={{ height: 340 }}
            >
              <Cropper
                image={currentCropUrl}
                crop={crop}
                zoom={zoom}
                aspect={cropAspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={true}
                style={{
                  containerStyle: { borderRadius: "0.75rem", overflow: "hidden" },
                  cropAreaStyle: { border: "2px solid #ec1c24", color: "rgba(236,28,36,0.25)" },
                }}
              />
            </div>

            {cropFiles.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Düzenlenecek fotoğraflar">
                {cropFiles.map((file, index) => (
                  <button
                    key={`${file.name}-${index}`}
                    type="button"
                    onClick={() => {
                      setCropIndex(index);
                      setCrop({ x: 0, y: 0 });
                      setZoom(1);
                    }}
                    className={`size-12 shrink-0 overflow-hidden rounded-md border-2 ${
                      index === cropIndex ? "border-red-600" : "border-transparent"
                    }`}
                    aria-label={`${index + 1}. fotoğrafı düzenle`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(file)} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="flex justify-end gap-3 border-t border-zinc-100 pt-3">
              <button
                type="button"
                onClick={() => { setCropFiles([]); setCropIndex(0); setEditingIndex(null); }}
                className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => {
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                }}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Sıfırla
              </button>
              <button
                type="button"
                disabled={!croppedAreaPixels}
                onClick={() => void applyCrop()}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {cropIndex + 1 < cropFiles.length ? "Sonraki fotoğraf →" : "Kırpmayı uygula"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
