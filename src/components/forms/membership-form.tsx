"use client";

import type { FormEvent } from "react";

const inputClassName = "min-h-11 rounded-md border border-[#6C757D]/40 px-3 font-normal";

export function MembershipForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Supabase kayıt işlemi üyelik sprintinde buraya bağlanacak.
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-3xl gap-5 md:grid-cols-2">
      <label className="grid gap-2 text-sm font-bold">
        Ad soyad
        <input required name="fullName" className={inputClassName} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        E-posta
        <input required type="email" name="email" className={inputClassName} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Mezuniyet yılı
        <input required type="number" name="graduationYear" className={inputClassName} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Telefon
        <input required type="tel" name="phone" className={inputClassName} />
      </label>
      <label className="flex gap-3 md:col-span-2">
        <input required type="checkbox" name="kvkkConsent" />
        <span className="text-sm text-black">KVKK aydınlatma metnini okudum ve başvuru verilerimin işlenmesini kabul ediyorum.</span>
      </label>
      <button type="submit" className="min-h-11 rounded-md bg-[#EC1C24] px-5 font-semibold text-white md:w-fit">
        Başvuruyu gönder
      </button>
    </form>
  );
}
