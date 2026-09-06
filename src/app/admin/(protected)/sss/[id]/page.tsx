"use client";

import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaqForm } from "@/components/admin/FaqForm";
import { createClient, type DbFaq } from "@/lib/supabase/client";

export default function EditFaqPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<DbFaq | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data, error: queryError } = await supabase
          .from("faqs")
          .select("*")
          .eq("id", id)
          .single();

        if (queryError) throw queryError;
        setItem(data as DbFaq);
      } catch (err) {
        setError(err instanceof Error ? err.message : "S.S.S. kaydı yüklenemedi.");
      }
    }

    void load();
  }, [id]);

  if (error) {
    return <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>;
  }

  if (!item) {
    return (
      <p className="flex items-center gap-2 text-sm text-slate-600">
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        Yükleniyor…
      </p>
    );
  }

  return <FaqForm initial={item} />;
}
