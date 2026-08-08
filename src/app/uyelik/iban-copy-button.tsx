"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

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
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className={styles.copyButton} type="button" onClick={copyIban} aria-live="polite">
      {copied ? "Kopyalandı" : "Kopyala"}
    </button>
  );
}
