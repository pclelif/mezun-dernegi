"use client";

import { ArrowUpDown, ChevronDown, GripVertical, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, formatTurkishDate, type DbAnnouncement } from "@/lib/supabase/client";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<DbAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("created-desc");

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const sortItems = useCallback((dataList: DbAnnouncement[], key: string) => {
    const list = [...dataList];
    if (key === "created-desc") {
      list.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
    } else if (key === "created-asc") {
      list.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
    } else if (key === "title-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    } else if (key === "title-desc") {
      list.sort((a, b) => b.title.localeCompare(a.title, "tr"));
    }
    return list;
  }, []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (queryError) throw queryError;
      const loaded = (data ?? []) as DbAnnouncement[];
      setItems(sortItems(loaded, sortBy));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Duyurular yüklenemedi.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortItems]);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) {
          setError(queryError.message);
          setItems([]);
        } else {
          const loaded = (data ?? []) as DbAnnouncement[];
          setItems(sortItems(loaded, sortBy));
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [sortBy, sortItems]);

  function handleSortChange(key: string) {
    setSortBy(key);
    if (key !== "manual") {
      setItems((current) => sortItems(current, key));
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
    const updated = [...items];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setItems(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`"${title}" duyurusunu silmek istediğinize emin misiniz?`)) return;

    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("announcements").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setItems((current) => current.filter((item) => item.id !== id));
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
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Duyurular</h1>
          <p className="mt-1 text-sm text-slate-600">Duyuruları listeleyin, sıralayın, ekleyin veya silin.</p>
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
              <option value="title-asc">Başlığa Göre</option>
              <option value="manual">Manuel Sıralama</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 size-4 text-slate-500" aria-hidden="true" />
          </div>
          <Link
            href="/admin/duyurular/yeni"
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
            <button type="button" onClick={() => void loadItems()} className="mt-4 text-sm font-semibold text-zinc-900 underline">
              Tekrar dene
            </button>
          </div>
        ) : items.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">Henüz duyuru yok. Yeni bir duyuru ekleyin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 select-none">
                <tr>
                  {sortBy === "manual" && <th className="w-12 px-4 py-3.5 text-center"></th>}
                  <th className="px-6 py-3.5 font-semibold">Başlık</th>
                  <th className="px-6 py-3.5 font-semibold">Tarih</th>
                  <th className="px-6 py-3.5 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {items.map((item, index) => {
                  const isDragging = draggedIndex === index;
                  const isOver = dragOverIndex === index;

                  return (
                    <tr
                      key={item.id}
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
                      <td className="px-6 py-3.5 font-medium text-zinc-900 align-middle">{item.title}</td>
                      <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap align-middle">{formatTurkishDate(item.date) || "—"}</td>
                      <td className="px-6 py-3.5 whitespace-nowrap align-middle">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/duyurular/${item.id}`}
                            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50"
                          >
                            <Pencil className="size-3.5" aria-hidden="true" />
                            Düzenle
                          </Link>
                          <button
                            type="button"
                            onClick={() => void handleDelete(item.id, item.title)}
                            disabled={deletingId === item.id}
                            className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 className="size-3.5" aria-hidden="true" />
                            {deletingId === item.id ? "Siliniyor…" : "Sil"}
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
    </div>
  );
}
