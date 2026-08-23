"use client";

import { LoaderCircle, Save } from "lucide-react";
import { type FormEvent, useState } from "react";
import type { ContentSection, ContentSectionKey } from "@/config/content";
import { adminDbMutate } from "@/lib/supabase/admin-mutate";
import { ImageUploader } from "./ImageUploader";
import { PdfUploader } from "./PdfUploader";

export function ContentEditor({
  sectionKey,
  section,
  initial,
}: {
  sectionKey: ContentSectionKey;
  section: ContentSection;
  initial: Record<string, string>;
}) {
  const [values, setValues] = useState({ ...section.defaults, ...initial });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fieldClass =
    "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const content = { ...values };
    section.fields.forEach(({ key, type }) => {
      if (type !== "image" && key !== "charter_url") content[key] = String(form.get(key) ?? "").trim();
    });

    try {
      await adminDbMutate({
        table: "site_content",
        action: "upsert",
        data: { section: sectionKey, content, updated_at: new Date().toISOString() },
        onConflict: "section",
      });
      setValues(content);
      setMessage("Değişiklikler kaydedildi.");
    } catch (err) {
      setMessage(`Kaydedilemedi: ${err instanceof Error ? err.message : "Hata oluştu."}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {section.fields.map((field) => {
          const isFullWidth =
            field.type === "textarea" || field.key === "charter_url" || section.fields.length === 1;
          return (
            <div
              key={field.key}
              className={`rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 ${
                isFullWidth ? "md:col-span-2" : ""
              }`}
            >
              {field.key === "charter_url" ? (
                <PdfUploader
                  value={values[field.key] ?? ""}
                  onChange={(url) => setValues((current) => ({ ...current, charter_url: url }))}
                />
              ) : field.type === "image" ? (
                <ImageUploader
                  label={field.label}
                  value={values[field.key] ? [values[field.key]] : []}
                  onChange={(urls) => setValues((current) => ({ ...current, [field.key]: urls[0] ?? "" }))}
                />
              ) : (
                <label className="block text-sm font-semibold text-zinc-800">
                  {field.label}
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.key}
                      rows={field.rows ?? 4}
                      defaultValue={values[field.key]}
                      className={fieldClass}
                    />
                  ) : (
                    <input
                      name={field.key}
                      type={field.type ?? "text"}
                      defaultValue={values[field.key]}
                      className={fieldClass}
                    />
                  )}
                  {field.help ? (
                    <span className="mt-1.5 block text-xs font-normal text-slate-500">{field.help}</span>
                  ) : null}
                </label>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div>
          {message ? (
            <p
              role="status"
              className={
                message.startsWith("Kaydedilemedi")
                  ? "text-sm font-semibold text-red-700"
                  : "text-sm font-semibold text-emerald-700"
              }
            >
              {message}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ec1c24] px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Kaydediliyor…" : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </form>
  );
}
