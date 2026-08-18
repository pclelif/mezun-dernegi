"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

export type FAQItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

type FAQAccordionProps = {
  items: FAQItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
};

export function FAQAccordion({ items, allowMultiple = false, defaultOpenIds = [] }: FAQAccordionProps) {
  const instanceId = useId();
  const [openIds, setOpenIds] = useState<string[]>(() => allowMultiple ? defaultOpenIds : defaultOpenIds.slice(0, 1));

  function toggleItem(id: string) {
    setOpenIds((current) => {
      const isOpen = current.includes(id);

      if (allowMultiple) {
        return isOpen ? current.filter((openId) => openId !== id) : [...current, id];
      }

      return isOpen ? [] : [id];
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${instanceId}-${item.id}-trigger`;
        const panelId = `${instanceId}-${item.id}-panel`;

        return (
          <section className={index === 0 ? "" : "border-t border-zinc-200"} key={item.id}>
            <h2>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="flex min-h-14 w-full touch-manipulation items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold leading-6 text-zinc-950 outline-none transition-colors hover:bg-zinc-50 hover:text-red-600 active:bg-zinc-50 active:text-red-600 focus-visible:bg-zinc-50 focus-visible:text-red-600 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600 motion-reduce:transition-none md:px-6 [overflow-wrap:anywhere]"
              >
                <span className="min-w-0">{item.question}</span>
                <ChevronDown className={`size-5 shrink-0 text-red-600 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </h2>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
              <div className="px-5 pb-5 text-sm leading-7 text-zinc-600 md:px-6 md:pb-6 [overflow-wrap:anywhere]">
                {item.answer}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
