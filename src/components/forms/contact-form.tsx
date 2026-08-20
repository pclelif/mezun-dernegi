"use client";

import { ChevronDown, LoaderCircle, Send } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { createClient } from "@/lib/supabase/client";

export function ContactForm() {
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setNotice(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim() || null,
      message: String(data.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      setNotice({ ok: false, text: "Ad soyad, e-posta, telefon ve mesaj alanları zorunludur." });
      setSaving(false);
      return;
    }

    const { error } = await createClient().from("contact_messages").insert(payload);
    setSaving(false);
    if (error) {
      setNotice({ ok: false, text: "Mesajınız gönderilemedi. Lütfen yeniden deneyin." });
    } else {
      form.reset();
      setNotice({ ok: true, text: "Mesajınız alındı. En kısa sürede size dönüş yapacağız." });
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-base font-normal text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-zinc-800">
          Ad Soyad
          <input name="name" autoComplete="name" required className={inputClass} />
        </label>
        <label className="text-sm font-semibold text-zinc-800">
          E-posta
          <input name="email" type="email" autoComplete="email" required className={inputClass} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-zinc-800">
          Cep Telefonu
          <input name="phone" type="tel" autoComplete="tel" required className={inputClass} />
        </label>
        <label className="text-sm font-semibold text-zinc-800">
          Konu
          <CustomSelect
            name="subject"
            defaultValue="Genel bilgi"
            options={[
              "Genel bilgi",
              "Üyelik",
              "Aidat ve bağış",
              "Etkinlikler",
              "Öneri",
              "Şikâyet",
              "Diğer",
            ]}
          />
        </label>
      </div>

      <label className="text-sm font-semibold text-zinc-800">
        Mesaj
        <textarea name="message" required rows={7} className={`${inputClass} py-3`} />
      </label>

      <p className="text-xs leading-5 text-slate-500">
        Bu formu doldurarak ilettiğiniz kişisel verileriniz, talebinizin yanıtlanması ve sizinle iletişim kurulması amacıyla{" "}
        <Link href="/kvkk" className="font-semibold text-red-600 underline underline-offset-2 transition hover:text-red-700 active:text-red-700">
          KVKK Aydınlatma Metni
        </Link>{" "}
        kapsamında işlenmektedir.
      </p>

      {notice ? (
        <p role="status" className={`rounded-lg px-4 py-3 text-sm ${notice.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>
          {notice.text}
        </p>
      ) : null}

      <button
        disabled={saving}
        className="btn-shimmer inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-lg bg-red-600 px-6 font-semibold text-white transition hover:bg-red-700 active:bg-red-700 disabled:opacity-60 sm:justify-self-start cursor-pointer"
      >
        {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
        {saving ? "Gönderiliyor…" : "Mesaj Gönder"}
      </button>
    </form>
  );
}
