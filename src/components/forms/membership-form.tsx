"use client";

import type { FormEvent } from "react";
import { FormInput, FormSelect, FormTextarea } from "./form-field";

export type MembershipFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  graduationYear: string;
  message: string;
  kvkkConsent: boolean;
};

export function MembershipForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: MembershipFormValues = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      graduationYear: String(data.get("graduationYear") ?? ""),
      message: String(data.get("message") ?? ""),
      kvkkConsent: data.get("kvkkConsent") === "on",
    };

    // Supabase kayıt işlemi üyelik sprintinde bu tipli veri ile bağlanacak.
    void values;
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-3xl gap-5 md:grid-cols-2">
      <FormInput required name="firstName" label="Ad" autoComplete="given-name" />
      <FormInput required name="lastName" label="Soyad" autoComplete="family-name" />
      <FormInput required type="email" name="email" label="E-posta" autoComplete="email" />
      <FormInput required type="tel" name="phone" label="Telefon" autoComplete="tel" />
      <FormSelect required name="graduationYear" label="Mezuniyet yılı"><option value="">Yıl seçin</option>{Array.from({ length: 50 }, (_, index) => 2026 - index).map((year) => <option key={year} value={year}>{year}</option>)}</FormSelect>
      <FormInput name="schoolNumber" label="Okul numarası" inputMode="numeric" />
      <div className="md:col-span-2"><FormTextarea name="message" label="Eklemek istedikleriniz" rows={5} /></div>
      <label className="flex gap-3 text-sm leading-6 text-zinc-600 md:col-span-2"><input required type="checkbox" name="kvkkConsent" className="mt-1 size-4 accent-red-600" /><span>KVKK aydınlatma metnini okudum ve başvuru verilerimin işlenmesini kabul ediyorum.</span></label>
      <button type="submit" className="min-h-11 rounded-md bg-red-600 px-6 font-semibold text-white hover:bg-red-700 md:col-span-2 md:justify-self-start">Başvuruyu gönder</button>
    </form>
  );
}
