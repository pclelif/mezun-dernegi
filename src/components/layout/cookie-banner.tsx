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
    "touch-manipulation font-semibold text-[#ec1c24] underline underline-offset-4 transition-colors hover:text-red-700 active:text-red-700";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez ve KVKK onay bildirimi"
      className="animate-fade-in-up fixed inset-x-0 bottom-0 z-[110] w-full border-t border-zinc-200 bg-white px-4 py-3 text-zinc-950 shadow-[0_-8px_24px_rgba(0,0,0,0.10)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="text-xs leading-5 text-zinc-700">
          Sitemizde çerezler kullanılmaktadır. Tercihlerinizi belirleyebilir, ayrıntılı bilgi için{" "}
          <Link href="/cerez-politikasi" className={linkClass}>
            Çerez Politikası
          </Link>{" "}
          ve{" "}
          <Link href="/kvkk" className={linkClass}>
            KVKK Aydınlatma Metni
          </Link>
          ’ni inceleyebilirsiniz.
        </p>

        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="inline-flex min-h-9 flex-1 touch-manipulation items-center justify-center rounded-md bg-[#ec1c24] px-4 text-xs font-semibold text-white transition-colors hover:bg-red-700 active:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:flex-none"
          >
            Kabul Et
          </button>
          <button
            type="button"
            onClick={() => saveConsent("rejected")}
            className="inline-flex min-h-9 flex-1 touch-manipulation items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 active:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:flex-none"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
}
