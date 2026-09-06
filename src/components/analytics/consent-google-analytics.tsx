"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "cookieConsent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getConsentSnapshot(): "accepted" | "rejected" | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
  } catch {
    return null;
  }
  return null;
}

function getServerSnapshot(): null {
  return null;
}

type ConsentGoogleAnalyticsProps = {
  measurementId: string;
};

/**
 * Google Analytics yalnızca cookieConsent === "accepted" iken yüklenir.
 * Reddet / seçim yok → Script DOM'a eklenmez.
 */
export function ConsentGoogleAnalytics({ measurementId }: ConsentGoogleAnalyticsProps) {
  const consent = useSyncExternalStore(subscribe, getConsentSnapshot, getServerSnapshot);
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!measurementId || !hasHydrated || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
