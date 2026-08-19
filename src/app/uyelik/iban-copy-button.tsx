"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type IbanCopyButtonProps = {
  value: string;
};

export function IbanCopyButton({ value }: IbanCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copyIban() {
    const textToCopy = value.replaceAll(" ", "");
    let success = false;

    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch {
        success = false;
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        textarea.setAttribute("readonly", "");
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void copyIban()}
      aria-live="polite"
      className={`inline-flex h-8 touch-manipulation shrink-0 items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-semibold transition-all cursor-pointer ${
        copied
          ? "border-red-600 bg-red-50 text-red-600 font-bold shadow-xs"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-slate-50 hover:text-zinc-950 active:bg-slate-100 shadow-xs"
      }`}
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-red-600 shrink-0" aria-hidden="true" />
          <span>Kopyalandı</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
          <span>Kopyala</span>
        </>
      )}
    </button>
  );
}
