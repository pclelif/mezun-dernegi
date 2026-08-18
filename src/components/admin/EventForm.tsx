"use client";

import { ArrowLeft, CalendarDays, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient, slugify, type DbEvent } from "@/lib/supabase/client";

type EventFormProps = {
  initial?: DbEvent;
};

export function EventForm({ initial }: EventFormProps) {
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
      slug: slugify(title) || `etkinlik-${Date.now()}`,
      description: String(form.get("description") ?? "").trim() || null,
      date: String(form.get("date") ?? "").trim() || null,
      time: String(form.get("time") ?? "").trim() || null,
      location: String(form.get("location") ?? "").trim() || null,
      status: String(form.get("status") ?? "upcoming"),
      image_url: images[0] || null,
      is_published: form.get("is_published") === "on",
    };

    try {
      const supabase = createClient();
      const query = initial
        ? supabase.from("events").update(payload).eq("id", initial.id)
        : supabase.from("events").insert(payload);
      const { error: saveError } = await query;
      if (saveError) throw saveError;
      router.push("/admin/etkinlikler");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etkinlik kaydedilemedi.");
      setSaving(false);
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/etkinlikler" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-red-600">
          <ArrowLeft className="size-4 shrink-0 -translate-y-[2px]" aria-hidden="true" />
          <span>Listeye dön</span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-zinc-950">
          {initial ? "Etkinliği Düzenle" : "Yeni Etkinlik"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <label className="block text-sm font-semibold text-zinc-800">
          Başlık
          <input name="title" required defaultValue={initial?.title} className={fieldClass} />
        </label>
        <label className="block text-sm font-semibold text-zinc-800">
          Açıklama
          <textarea name="description" rows={4} defaultValue={initial?.description ?? ""} className={fieldClass} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-zinc-800">
            Tarih
            <div className="relative mt-1.5">
              <input name="date" type="date" defaultValue={initial?.date ?? ""} className={`${fieldClass} mt-0 pr-10`} />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            </div>
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Saat
            <input name="time" defaultValue={initial?.time ?? ""} className={fieldClass} placeholder="15.00" />
          </label>
        </div>
        <label className="block text-sm font-semibold text-zinc-800">
          Konum
          <input name="location" defaultValue={initial?.location ?? ""} className={fieldClass} />
        </label>
        <label className="block text-sm font-semibold text-zinc-800">
          Durum
          <select name="status" defaultValue={initial?.status ?? "upcoming"} className={fieldClass}>
            <option value="upcoming">Yaklaşan</option>
            <option value="past">Geçmiş</option>
          </select>
        </label>

        <ImageUploader value={images} onChange={setImages} label="Etkinlik görseli" />
        <label className="flex items-center gap-3 text-sm font-semibold text-zinc-800"><input name="is_published" type="checkbox" defaultChecked={initial?.is_published ?? true} className="size-4 accent-red-600" />Web sitesinde yayınla</label>

        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 font-semibold text-white hover:bg-red-700 disabled:opacity-60 sm:w-auto"
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
          {saving ? "Kaydediliyor…" : initial ? "Değişiklikleri Kaydet" : "Etkinliği Kaydet"}
        </button>
      </form>
    </div>
  );
}
