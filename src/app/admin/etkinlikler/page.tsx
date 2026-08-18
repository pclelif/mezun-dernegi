"use client";

import { LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, formatTurkishDate, type DbEvent } from "@/lib/supabase/client";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (queryError) throw queryError;
      setEvents((data ?? []) as DbEvent[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etkinlikler yüklenemedi.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) {
          setError(queryError.message);
          setEvents([]);
        } else {
          setEvents((data ?? []) as DbEvent[]);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`"${title}" etkinliğini silmek istediğinize emin misiniz?`)) return;

    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("events").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setEvents((current) => current.filter((event) => event.id !== id));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Silme işlemi başarısız.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Etkinlikler</h1>
          <p className="mt-1 text-sm text-slate-600">Etkinlikleri listeleyin, ekleyin veya silin.</p>
        </div>
        <Link
          href="/admin/etkinlikler/yeni"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          <Plus className="size-4" aria-hidden="true" />
          Yeni Ekle
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-6 py-16 text-slate-500">
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Yükleniyor…
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button type="button" onClick={() => void loadEvents()} className="mt-4 text-sm font-semibold text-zinc-900 underline">
              Tekrar dene
            </button>
          </div>
        ) : events.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">Henüz etkinlik yok. Yeni bir etkinlik ekleyin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Başlık</th>
                  <th className="px-4 py-3 font-semibold">Tarih</th>
                  <th className="px-4 py-3 font-semibold">Durum</th>
                  <th className="px-4 py-3 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-3 font-medium text-zinc-900">{event.title}</td>
                    <td className="px-4 py-3 text-slate-600">{formatTurkishDate(event.date) || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          event.status === "past" ? "bg-zinc-200 text-zinc-700" : "bg-red-50 text-red-700"
                        }`}
                      >
                        {event.status === "past" ? "Geçmiş" : "Yaklaşan"}
                      </span>
                    </td>
                    <td className="flex gap-2 px-4 py-3">
                      <Link
                        href={`/admin/etkinlikler/${event.id}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50"
                      >
                        <Pencil className="size-3.5" aria-hidden="true" />
                        Düzenle
                      </Link>
                      <button
                        type="button"
                        onClick={() => void handleDelete(event.id, event.title)}
                        disabled={deletingId === event.id}
                        className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                        {deletingId === event.id ? "Siliniyor…" : "Sil"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
