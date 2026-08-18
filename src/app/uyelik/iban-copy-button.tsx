"use client";

import { useEffect, useRef, useState } from "react";

type IbanCopyButtonProps = {
  value: string;
};

export function IbanCopyButton({ value }: IbanCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(value.replaceAll(" ", ""));
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void copyIban()}
      aria-live="polite"
      className="inline-flex min-h-10 touch-manipulation shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 transition-colors hover:border-red-600 hover:text-red-600 active:border-red-600 active:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      {copied ? "Kopyalandı" : "Kopyala"}
    </button>
  );
}
