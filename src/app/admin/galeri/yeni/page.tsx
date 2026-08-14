"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient, slugify } from "@/lib/supabase/client";

export default function NewGalleryPage() {
  const router = useRouter();
  const [cover, setCover] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const date = String(form.get("date") ?? "").trim();

    if (!title) {
      setError("Albüm adı zorunludur.");
      setSaving(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data: gallery, error: galleryError } = await supabase
        .from("galleries")
        .insert({
          title,
          slug: slugify(title) || `album-${Date.now()}`,
          date: date || null,
          cover_image_url: cover[0] || null,
        })
        .select("id")
        .single();
      if (galleryError) throw galleryError;

      if (photos.length > 0) {
        const { error: imagesError } = await supabase.from("gallery_images").insert(
          photos.map((imageUrl) => ({
            gallery_id: gallery.id,
            image_url: imageUrl,
          })),
        );
        if (imagesError) {
          await supabase.from("galleries").delete().eq("id", gallery.id);
          throw imagesError;
        }
      }

      router.push("/admin/galeri");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Albüm oluşturulamadı.");
      setSaving(false);
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/galeri" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Albümlere dön
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-zinc-950">Yeni Albüm</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-zinc-800">
            Albüm Adı *
            <input name="title" required className={fieldClass} />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Tarih
            <input name="date" type="date" className={fieldClass} />
          </label>
        </div>

        <ImageUploader value={cover} onChange={setCover} label="Kapak görseli" />
        <ImageUploader value={photos} onChange={setPhotos} label="Albüm fotoğrafları" multiple />

        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 font-semibold text-white hover:bg-red-700 disabled:opacity-60 sm:w-auto"
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
          {saving ? "Kaydediliyor…" : "Albümü Kaydet"}
        </button>
      </form>
    </div>
  );
}
