"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient } from "@/lib/supabase/client";

export default function NewGalleryPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    if (!photos.length) {
      setError("En az bir fotoğraf seçmelisiniz.");
      setSaving(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: imagesError } = await supabase.from("gallery_images").insert(
        photos.map((imageUrl, index) => ({
          gallery_id: "00000000-0000-0000-0000-000000000000",
          image_url: imageUrl,
          display_order: index,
        }))
      );
      if (imagesError) throw imagesError;

      setPhotos([]);
      router.push("/admin/galeri");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fotoğraflar eklenemedi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/galeri" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-red-600">
          <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
          <span className="translate-y-[1px]">Galeriye dön</span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">Fotoğraf Ekle</h1>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
        {error && <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>}

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <ImageUploader value={photos} onChange={setPhotos} label="Fotoğrafları seç" multiple />
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || !photos.length}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-red-600 px-4 font-semibold text-white disabled:opacity-50"
          >
            {saving ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Ekleniyor…
              </>
            ) : (
              "Fotoğrafları Galeriye Ekle"
            )}
          </button>
          <Link
            href="/admin/galeri"
            className="inline-flex min-h-11 items-center rounded-md border border-zinc-300 px-4 font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
