"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient, slugify, type DbAnnouncement } from "@/lib/supabase/client";

type AnnouncementFormProps = {
  initial?: DbAnnouncement;
};

export function AnnouncementForm({ initial }: AnnouncementFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(initial?.image_url ? [initial.image_url] : []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) {
      setError("Başlık zorunludur.");
      setSaving(false);
      return;
    }

    const payload = {
      title,
      slug: slugify(title) || `duyuru-${Date.now()}`,
      content: String(form.get("content") ?? "").trim() || null,
      date: String(form.get("date") ?? "").trim() || null,
      image_url: images[0] || null,
    };

    try {
      const supabase = createClient();
      const query = initial
        ? supabase.from("announcements").update(payload).eq("id", initial.id)
        : supabase.from("announcements").insert(payload);
      const { error: saveError } = await query;
      if (saveError) throw saveError;
      router.push("/admin/duyurular");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Duyuru kaydedilemedi.");
      setSaving(false);
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/duyurular" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Listeye dön
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-zinc-950">
          {initial ? "Duyuruyu Düzenle" : "Yeni Duyuru"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <label className="block text-sm font-semibold text-zinc-800">
          Başlık *
          <input name="title" required defaultValue={initial?.title} className={fieldClass} />
        </label>
        <label className="block text-sm font-semibold text-zinc-800">
          İçerik
          <textarea name="content" rows={7} defaultValue={initial?.content ?? ""} className={fieldClass} />
        </label>
        <label className="block text-sm font-semibold text-zinc-800">
          Tarih
          <input name="date" type="date" defaultValue={initial?.date ?? ""} className={fieldClass} />
        </label>

        <ImageUploader value={images} onChange={setImages} label="Duyuru görseli" />

        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 font-semibold text-white hover:bg-red-700 disabled:opacity-60 sm:w-auto"
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
          {saving ? "Kaydediliyor…" : initial ? "Değişiklikleri Kaydet" : "Duyuruyu Kaydet"}
        </button>
      </form>
    </div>
  );
}
