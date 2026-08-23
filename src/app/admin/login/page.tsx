"use client";

import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes("placeholder.supabase.co") || key === "placeholder_key") return false;
  return true;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const tempEmail = process.env.NEXT_PUBLIC_TEMP_ADMIN_EMAIL || "kaafladmin@gmail.com";
    const tempPass = process.env.NEXT_PUBLIC_TEMP_ADMIN_PASSWORD || "kaaflmezunder06";

    // Instant offline / temp admin authentication
    if (!isSupabaseConfigured() || email === tempEmail) {
      if (email === tempEmail && password === tempPass) {
        document.cookie = "admin_session=true; path=/; max-age=86400; SameSite=Lax";
        router.replace("/admin");
        router.refresh();
        return;
      }
      if (!isSupabaseConfigured()) {
        setError("Geçersiz e-posta veya şifre.");
        setLoading(false);
        return;
      }
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        router.replace("/admin");
        router.refresh();
        return;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Giriş yapılamadı.");
        setLoading(false);
        return;
      }
    }

    setError("Giriş yapılamadı.");
    setLoading(false);
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <span className="grid size-12 place-items-center rounded-xl bg-red-50 text-red-600">
          <LockKeyhole className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-zinc-950">Yönetici Girişi</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          İçerik yönetim paneline erişmek için Supabase hesabınızla giriş yapın.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block text-sm font-semibold text-zinc-800">
            E-posta
            <input name="email" type="email" autoComplete="email" required className={fieldClass} />
          </label>
          <label className="block text-sm font-semibold text-zinc-800">
            Şifre
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={fieldClass}
            />
          </label>

          {error ? (
            <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
            {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </form>
      </div>
    </main>
  );
}
