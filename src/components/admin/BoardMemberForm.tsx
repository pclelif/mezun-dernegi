"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient, type DbBoardMember } from "@/lib/supabase/client";

type BoardMemberFormProps = {
  initial?: DbBoardMember;
};

export function BoardMemberForm({ initial }: BoardMemberFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(initial?.image_url ? [initial.image_url] : []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const boardType = String(form.get("board_type") ?? "");
    const displayOrder = Number(form.get("display_order") ?? 0);

    if (!name || !role) {
      setError("Ad soyad ve görev/unvan alanları zorunludur.");
      setSaving(false);
      return;
    }

    if (boardType !== "management" && boardType !== "audit") {
      setError("Geçerli bir kurul tipi seçiniz.");
      setSaving(false);
      return;
    }

    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      setError("Görüntülenme sırası sıfır veya daha büyük bir tam sayı olmalıdır.");
      setSaving(false);
      return;
    }

    const payload = {
      name,
      role,
      board_type: boardType,
      image_url: images[0] || null,
      display_order: displayOrder,
    };

    try {
      const supabase = createClient();
      const query = initial
        ? supabase.from("board_members").update(payload).eq("id", initial.id)
        : supabase.from("board_members").insert(payload);
      const { error: saveError } = await query;
      if (saveError) throw saveError;

      router.push("/admin/kurul");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kurul üyesi kaydedilemedi.");
      setSaving(false);
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/kurul"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Listeye dön
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-zinc-950">
          {initial ? "Kurul Üyesini Düzenle" : "Yeni Kurul Üyesi"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <label className="block text-sm font-semibold text-zinc-800">
          Ad Soyad *
          <input name="name" required defaultValue={initial?.name ?? ""} className={fieldClass} />
        </label>

        <label className="block text-sm font-semibold text-zinc-800">
          Görev/Unvan *
          <input name="role" required defaultValue={initial?.role ?? ""} className={fieldClass} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-zinc-800">
            Kurul Tipi *
            <select
              name="board_type"
              required
              defaultValue={initial?.board_type ?? "management"}
              className={fieldClass}
            >
              <option value="management">Yönetim Kurulu</option>
              <option value="audit">Denetim Kurulu</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-zinc-800">
            Görüntülenme Sırası
            <input
              name="display_order"
              type="number"
              min={0}
              step={1}
              defaultValue={initial?.display_order ?? 0}
              className={fieldClass}
            />
          </label>
        </div>

        <ImageUploader value={images} onChange={setImages} label="Üye fotoğrafı" />

        {error ? (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 font-semibold text-white hover:bg-red-700 disabled:opacity-60 sm:w-auto"
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
          {saving ? "Kaydediliyor…" : initial ? "Değişiklikleri Kaydet" : "Kurul Üyesini Kaydet"}
        </button>
      </form>
    </div>
  );
}
