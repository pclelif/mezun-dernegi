"use client";

import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";
import { createClient, type DbAnnouncement } from "@/lib/supabase/client";

export default function EditAnnouncementPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<DbAnnouncement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data, error: queryError } = await supabase
          .from("announcements")
          .select("*")
          .eq("id", id)
          .single();
        if (queryError) throw queryError;
        setItem(data as DbAnnouncement);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Duyuru yüklenemedi.");
      }
    }
    void load();
  }, [id]);

  if (error) return <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>;
  if (!item) {
    return (
      <p className="flex items-center gap-2 text-sm text-slate-600">
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        Yükleniyor…
      </p>
    );
  }
  return <AnnouncementForm initial={item} />;
}
