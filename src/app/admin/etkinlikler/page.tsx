"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, formatTurkishDate, type DbEvent } from "@/lib/supabase/client";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("date-desc");

  const sortItems = useCallback((dataList: DbEvent[], key: string) => {
    const list = [...dataList];
    if (key === "date-desc") {
      list.sort((a, b) => String(b.date || b.created_at).localeCompare(String(a.date || a.created_at)));
    } else if (key === "date-asc") {
      list.sort((a, b) => String(a.date || a.created_at).localeCompare(String(b.date || b.created_at)));
    } else if (key === "title-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    } else if (key === "title-desc") {
      list.sort((a, b) => b.title.localeCompare(a.title, "tr"));
    }
    return list;
  }, []);

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
      const loaded = (data ?? []) as DbEvent[];
      setEvents(sortItems(loaded, sortBy));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etkinlikler yüklenemedi.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortItems]);

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
          const loaded = (data ?? []) as DbEvent[];
          setEvents(sortItems(loaded, sortBy));
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [sortBy, sortItems]);

  function handleSortChange(key: string) {
    setSortBy(key);
    setEvents((current) => sortItems(current, key));
  }

  function moveItem(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= events.length) return;
    const updated = [...events];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setEvents(updated);
  }

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
          <p className="mt-1 text-sm text-slate-600">Etkinlikleri listeleyin, sıralayın, ekleyin veya silin.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="pointer-events-none absolute left-3 size-4 text-slate-500" aria-hidden="true" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="h-10 rounded-md border border-zinc-300 bg-white pl-9 pr-4 text-sm font-semibold text-zinc-800 shadow-sm outline-none transition focus:border-red-500 cursor-pointer"
              aria-label="Sıralama ölçütü"
            >
              <option value="date-desc">Sırala: Tarihe Göre (En Yeni)</option>
              <option value="date-asc">Sırala: Tarihe Göre (En Eski)</option>
              <option value="title-asc">Sırala: Başlığa Göre (A-Z)</option>
              <option value="title-desc">Sırala: Başlığa Göre (Z-A)</option>
            </select>
          </div>
          <Link
            href="/admin/etkinlikler/yeni"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <Plus className="size-4" aria-hidden="true" />
            Yeni Ekle
          </Link>
        </div>
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
                  <th className="w-16 px-3 py-3 text-center font-semibold">Sıra</th>
                  <th className="px-4 py-3 font-semibold">Başlık</th>
                  <th className="px-4 py-3 font-semibold">Tarih</th>
                  <th className="px-4 py-3 font-semibold">Durum</th>
                  <th className="px-4 py-3 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id} className="border-b border-zinc-100 last:border-0 hover:bg-slate-50/50">
                    <td className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-400">
                        <button
                          type="button"
                          onClick={() => moveItem(index, "up")}
                          disabled={index === 0}
                          className="rounded p-1 hover:bg-zinc-200 hover:text-zinc-800 disabled:opacity-30"
                          title="Yukarı taşı"
                        >
                          <ArrowUp className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(index, "down")}
                          disabled={index === events.length - 1}
                          className="rounded p-1 hover:bg-zinc-200 hover:text-zinc-800 disabled:opacity-30"
                          title="Aşağı taşı"
                        >
                          <ArrowDown className="size-3.5" />
                        </button>
                      </div>
                    </td>
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
                    <td className="flex items-center gap-2 px-4 py-3">
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
