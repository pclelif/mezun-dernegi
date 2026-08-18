"use client";

import { ArrowUpDown, ChevronDown, GripVertical, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, formatTurkishDate, type DbEvent } from "@/lib/supabase/client";

async function saveDisplayOrder(table: string, itemsList: { id: string }[]) {
  try {
    const supabase = createClient();
    await Promise.all(
      itemsList.map((item, idx) =>
        supabase.from(table).update({ display_order: idx }).eq("id", item.id)
      )
    );
  } catch (err) {
    console.error(`Failed to save order to ${table}:`, err);
  }
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ id: string; title: string } | null>(null);
  const [sortBy, setSortBy] = useState<string>("created-desc");

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Load saved sort preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin_events_sort");
      if (saved) setSortBy(saved);
    } catch {}
  }, []);

  const sortItems = useCallback((dataList: DbEvent[], key: string) => {
    const list = [...dataList];
    if (key === "created-desc") {
      list.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
    } else if (key === "date-desc") {
      list.sort((a, b) => String(b.date || b.created_at).localeCompare(String(a.date || a.created_at)));
    } else if (key === "title-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    }
    return list;
  }, []);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      let { data, error: queryError } = await supabase
        .from("events")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (queryError) {
        const fallback = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });
        data = fallback.data;
        queryError = fallback.error;
      }

      if (queryError) throw queryError;
      const loaded = (data ?? []) as DbEvent[];
      setEvents(sortBy === "manual" ? loaded : sortItems(loaded, sortBy));
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
    void (async () => {
      let { data, error: queryError } = await supabase
        .from("events")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (queryError) {
        const fallback = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });
        data = fallback.data;
        queryError = fallback.error;
      }

      if (!active) return;
      if (queryError) {
        setError(queryError.message);
        setEvents([]);
      } else {
        const loaded = (data ?? []) as DbEvent[];
        setEvents(sortBy === "manual" ? loaded : sortItems(loaded, sortBy));
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [sortBy, sortItems]);

  function handleSortChange(key: string) {
    setSortBy(key);
    try {
      localStorage.setItem("admin_events_sort", key);
    } catch {}
    if (key !== "manual") {
      const sorted = sortItems(events, key);
      setEvents(sorted);
      void saveDisplayOrder("events", sorted);
    }
  }

  // Drag and drop handlers
  function handleDragStart(e: React.DragEvent, index: number) {
    if (sortBy !== "manual") return;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    if (sortBy !== "manual") return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    if (sortBy !== "manual" || draggedIndex === null || draggedIndex === index) return;
    const updated = [...events];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setEvents(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    try {
      localStorage.setItem("admin_events_sort", "manual");
    } catch {}
    void saveDisplayOrder("events", updated);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  async function handleDelete(id: string) {
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
              className="h-10 appearance-none rounded-md border border-zinc-300 bg-white pl-9 pr-9 text-sm font-semibold text-zinc-800 shadow-sm outline-none transition focus:border-red-500 cursor-pointer"
              aria-label="Sıralama ölçütü"
            >
              <option value="created-desc">Eklenme Tarihine Göre</option>
              <option value="date-desc">Etkinlik Tarihine Göre</option>
              <option value="title-asc">Başlığa Göre</option>
              <option value="manual">Manuel Sıralama</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 size-4 text-slate-500" aria-hidden="true" />
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
              <thead className="border-b border-zinc-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 select-none">
                <tr>
                  {sortBy === "manual" && <th className="w-12 px-4 py-3.5 text-center"></th>}
                  <th className="w-full px-6 py-3.5 font-semibold">Başlık</th>
                  <th className="whitespace-nowrap px-6 py-3.5 font-semibold">Tarih</th>
                  <th className="whitespace-nowrap px-6 py-3.5 font-semibold">Durum</th>
                  <th className="whitespace-nowrap px-6 py-3.5 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {events.map((event, index) => {
                  const isDragging = draggedIndex === index;
                  const isOver = dragOverIndex === index;

                  return (
                    <tr
                      key={event.id}
                      draggable={sortBy === "manual"}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                      onDragEnd={handleDragEnd}
                      className={`transition-all duration-150 ${
                        sortBy === "manual" ? "cursor-grab active:cursor-grabbing" : ""
                      } ${
                        isDragging
                          ? "opacity-30 bg-slate-100 scale-[0.99]"
                          : isOver
                          ? "border-t-2 border-t-red-500 bg-red-50/50"
                          : "hover:bg-slate-50/60"
                      }`}
                    >
                      {sortBy === "manual" && (
                        <td className="w-12 px-4 py-3.5 text-center align-middle">
                          <GripVertical className="mx-auto size-4 text-slate-400 hover:text-red-600 transition-colors" />
                        </td>
                      )}
                      <td className="px-6 py-3.5 font-medium text-zinc-900 align-middle">{event.title}</td>
                      <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap align-middle">{formatTurkishDate(event.date) || "—"}</td>
                      <td className="px-6 py-3.5 whitespace-nowrap align-middle">
                        <span
                          className={`-ml-2.5 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold -translate-x-[0.75px] ${
                            event.status === "past" ? "bg-zinc-200 text-zinc-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          {event.status === "past" ? "Geçmiş" : "Yaklaşan"}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap align-middle">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/etkinlikler/${event.id}`}
                            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50"
                          >
                            <Pencil className="size-3.5" aria-hidden="true" />
                            Düzenle
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmItem({ id: event.id, title: event.title })}
                            disabled={deletingId === event.id}
                            className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50 cursor-pointer"
                          >
                            <Trash2 className="size-3.5" aria-hidden="true" />
                            {deletingId === event.id ? "Siliniyor…" : "Sil"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Brand-Themed Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-150 select-none"
          onClick={() => setDeleteConfirmItem(null)}
        >
          <div
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-50 text-[#ec1c24]">
              <Trash2 className="size-6" />
            </div>
            <h3 className="text-center text-lg font-bold text-zinc-950">Etkinliği Sil?</h3>
            <p className="mt-2 text-center text-sm text-slate-600">
              “{deleteConfirmItem.title}” etkinliği kalıcı olarak silinecektir. Bu işlem geri alınamaz.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="flex-1 h-10 rounded-lg border border-zinc-300 font-semibold text-zinc-700 hover:bg-slate-50 transition-colors text-sm cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = deleteConfirmItem;
                  setDeleteConfirmItem(null);
                  if (target) void handleDelete(target.id);
                }}
                disabled={Boolean(deletingId)}
                className="flex-1 h-10 rounded-lg bg-[#ec1c24] font-semibold text-white hover:bg-red-700 transition-colors text-sm disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {deletingId ? "Siliniyor…" : "Evet, Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
