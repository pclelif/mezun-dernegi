"use client";

import type { FormEvent } from "react";

export function MembershipForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Supabase kayıt işlemi üyelik sprintinde buraya bağlanacak.
  }

  return <form onSubmit={handleSubmit} className="grid max-w-3xl gap-5 md:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Ad soyad<input required name="fullName" className="min-h-12 rounded-lg border border-[#6C757D]/40 px-4 font-normal" /></label><label className="grid gap-2 text-sm font-bold">E-posta<input required type="email" name="email" className="min-h-12 rounded-lg border border-[#6C757D]/40 px-4 font-normal" /></label><label className="grid gap-2 text-sm font-bold">Mezuniyet yılı<input required type="number" name="graduationYear" className="min-h-12 rounded-lg border border-[#6C757D]/40 px-4 font-normal" /></label><label className="grid gap-2 text-sm font-bold">Telefon<input required type="tel" name="phone" className="min-h-12 rounded-lg border border-[#6C757D]/40 px-4 font-normal" /></label><label className="flex gap-3 md:col-span-2"><input required type="checkbox" name="kvkkConsent" /><span className="text-sm text-[#6C757D]">KVKK aydınlatma metnini okudum ve başvuru verilerimin işlenmesini kabul ediyorum.</span></label><button type="submit" className="min-h-12 rounded-full bg-[#EC1C24] px-6 font-bold text-white md:w-fit">Başvuruyu gönder</button></form>;
}
