"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type CustomSelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  name: string;
  options: (string | CustomSelectOption)[];
  defaultValue?: string;
  className?: string;
};

export function CustomSelect({ name, options, defaultValue, className = "" }: CustomSelectProps) {
  const normalizedOptions: CustomSelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const initialVal = defaultValue || normalizedOptions[0]?.value || "";
  const [selected, setSelected] = useState(initialVal);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLabel = normalizedOptions.find((o) => o.value === selected)?.label || selected;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative mt-2">
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`min-h-12 w-full flex items-center justify-between rounded-lg border border-zinc-300 bg-white px-4 text-base font-normal text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 cursor-pointer ${className}`}
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown className={`size-4 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-red-600" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 max-h-60 w-full overflow-y-auto rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl shadow-zinc-900/10 backdrop-blur-md animate-in fade-in-50 zoom-in-95">
          {normalizedOptions.map((option) => {
            const isSelected = option.value === selected;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelected(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-red-50 text-red-600 font-bold"
                    : "text-zinc-700 hover:bg-slate-100 hover:text-zinc-950"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="size-4 text-red-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
