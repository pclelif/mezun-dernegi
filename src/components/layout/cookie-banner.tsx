"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "cookieConsent";
type ConsentValue = "accepted" | "rejected";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSnapshot(): ConsentValue | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
  } catch {
    return null;
  }
  return null;
}

function getServerSnapshot(): ConsentValue | null {
  return null;
}

export function CookieBanner() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const saveConsent = useCallback((value: ConsentValue) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Kayıt başarısız olsa da arayüz kapanır.
    }
    window.dispatchEvent(new Event("storage"));
  }, []);

  if (pathname.startsWith("/admin") || !hasHydrated || consent) {
    return null;
  }

  const linkClass =
    "font-semibold text-white underline underline-offset-4 transition-colors hover:text-red-300";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez ve KVKK onay bildirimi"
      className="animate-fade-in-up fixed bottom-0 left-0 right-0 z-[110] w-full border-t border-white/10 bg-zinc-900 p-4 text-white shadow-2xl md:bottom-6 md:right-6 md:left-auto md:w-[min(100%-2rem,26rem)] md:rounded-lg md:border md:border-white/10"
    >
      <p className="text-sm leading-6 text-zinc-200">
        Sitemizde, kullanıcı deneyimini geliştirmek ve hizmetlerimizden en iyi şekilde
        faydalanabilmeniz için çerezler kullanılmaktadır. Detaylı bilgi için{" "}
        <Link href="/cerez-politikasi" className={linkClass}>
          Çerez Politikası
        </Link>{" "}
        ve{" "}
        <Link href="/kvkk" className={linkClass}>
          KVKK Aydınlatma Metni
        </Link>{" "}
        sayfalarımızı inceleyebilirsiniz.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => saveConsent("accepted")}
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md bg-[#ec1c24] px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none"
        >
          Kabul Et
        </button>
        <button
          type="button"
          onClick={() => saveConsent("rejected")}
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md border border-white/20 bg-transparent px-4 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none"
        >
          Reddet
        </button>
      </div>
    </div>
  );
}
