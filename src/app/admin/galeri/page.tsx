"use client";

import { ArrowUpDown, ChevronDown, GripVertical, LoaderCircle, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient, type DbGalleryImage } from "@/lib/supabase/client";

async function saveDisplayOrder(table: string, itemsList: { id: string }[]) {
  try {
    const supabase = createClient();
    await Promise.all(
      itemsList.map((item, idx) =>
        supabase.from(table).update({ display_order: idx }).eq("id", item.id)
      )
    );
  } catch (err) {
    console.error(`Failed to save order to ${table}:`, err);
  }
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<DbGalleryImage[]>([]);
  const [uploads, setUploads] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("created-desc");

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const sortPhotos = useCallback((list: DbGalleryImage[], key: string) => {
    const sorted = [...list];
    if (key === "created-desc") {
      sorted.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
    }
    return sorted;
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) {
          setError(queryError.message);
          setImages([]);
        } else {
          const loaded = (data ?? []) as DbGalleryImage[];
          setImages(sortBy === "manual" ? loaded : sortPhotos(loaded, sortBy));
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [sortBy, sortPhotos]);

  function handleSortChange(key: string) {
    setSortBy(key);
    if (key !== "manual") {
      const sorted = sortPhotos(images, key);
      setImages(sorted);
      void saveDisplayOrder("gallery_images", sorted);
    }
  }

  // Drag and drop handlers for photos grid
  function handleDragStart(e: React.DragEvent, index: number) {
    if (sortBy !== "manual") return;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    if (sortBy !== "manual") return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    if (sortBy !== "manual" || draggedIndex === null || draggedIndex === index) return;
    const updated = [...images];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setImages(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    void saveDisplayOrder("gallery_images", updated);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  async function handleAddPhotos() {
    if (!uploads.length) return;
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();

      // Ensure a default gallery row exists
      const defaultGalleryId = "00000000-0000-0000-0000-000000000000";
      await supabase
        .from("galleries")
        .upsert({ id: defaultGalleryId, title: "Ana Galeri", slug: "ana-galeri" }, { onConflict: "id" });

      const { data, error: insertError } = await supabase
        .from("gallery_images")
        .insert(
          uploads.map((image_url, idx) => ({
            gallery_id: defaultGalleryId,
            image_url,
            display_order: images.length + idx,
          }))
        )
        .select("*");

      if (insertError) throw insertError;
      setImages((current) => [...(data as DbGalleryImage[]), ...current]);
      setUploads([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fotoğraflar yüklenemedi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) return;
    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("gallery_images").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setImages((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fotoğraf silinemedi.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Galeri</h1>
          <p className="mt-1 text-sm text-slate-600">Galeri fotoğraflarını listeleyin, sıralayın ve yönetin.</p>
        </div>
        <div className="relative inline-flex items-center">
          <ArrowUpDown className="pointer-events-none absolute left-3 size-4 text-slate-500" aria-hidden="true" />
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-10 appearance-none rounded-md border border-zinc-300 bg-white pl-9 pr-9 text-sm font-semibold text-zinc-800 shadow-sm outline-none transition focus:border-red-500 cursor-pointer"
            aria-label="Sıralama ölçütü"
          >
            <option value="created-desc">Eklenme Tarihine Göre</option>
            <option value="manual">Manuel Sıralama</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 size-4 text-slate-500" aria-hidden="true" />
        </div>
      </div>

      {error && <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <ImageUploader value={uploads} onChange={setUploads} label="Yeni fotoğraflar" multiple />
        <button
          type="button"
          disabled={saving || !uploads.length}
          onClick={() => void handleAddPhotos()}
          className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ec1c24] px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {saving ? "Yükleniyor…" : "Fotoğrafları Ekle"}
        </button>
      </section>

      {loading ? (
        <p className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          Yükleniyor…
        </p>
      ) : images.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
          Henüz fotoğraf yok.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((photo, index) => {
            const isDragging = draggedIndex === index;
            const isOver = dragOverIndex === index;

            return (
              <article
                key={photo.id}
                draggable={sortBy === "manual"}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-150 ${
                  sortBy === "manual" ? "cursor-grab active:cursor-grabbing" : ""
                } ${
                  isDragging
                    ? "opacity-30 bg-slate-100 scale-[0.98]"
                    : isOver
                    ? "border-2 border-red-500 bg-red-50/50"
                    : "hover:shadow-md"
                }`}
              >
                <div
                  className="relative aspect-square bg-slate-200 bg-cover bg-center cursor-pointer hover:opacity-95 transition-opacity"
                  style={{ backgroundImage: `url(${photo.image_url})` }}
                  aria-hidden="true"
                  onClick={() => setSelectedImage(photo.image_url)}
                >
                  {sortBy === "manual" && (
                    <div className="absolute top-2 left-2 z-10 rounded-md bg-black/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:text-red-500">
                      <GripVertical className="size-4" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end p-2.5 bg-slate-50 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={() => void handleDelete(photo.id)}
                    disabled={deletingId === photo.id}
                    className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                    {deletingId === photo.id ? "Siliniyor…" : "Sil"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          >
            <X className="size-6 text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Büyütülmüş fotoğraf"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
