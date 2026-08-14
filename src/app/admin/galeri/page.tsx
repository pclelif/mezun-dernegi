"use client";

import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, formatTurkishDate, type DbGallery } from "@/lib/supabase/client";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<DbGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("galleries")
        .select("*")
        .order("created_at", { ascending: false });
      if (queryError) throw queryError;
      setItems((data ?? []) as DbGallery[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Albümler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase
      .from("galleries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) {
          setError(queryError.message);
          setItems([]);
        } else {
          setItems((data ?? []) as DbGallery[]);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`"${title}" albümünü ve fotoğraf kayıtlarını silmek istediğinize emin misiniz?`)) return;
    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("galleries").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Albüm silinemedi.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-950">Galeri</h1>
          <p className="mt-1 text-sm text-slate-600">Fotoğraf albümlerini yönetin.</p>
        </div>
        <Link
          href="/admin/galeri/yeni"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          <Plus className="size-4" aria-hidden="true" />
          Yeni Albüm
        </Link>
      </div>

      {loading ? (
        <p className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          Yükleniyor…
        </p>
      ) : error ? (
        <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
          Henüz albüm yok.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div
                className="aspect-video bg-slate-200 bg-cover bg-center"
                style={item.cover_image_url ? { backgroundImage: `url(${item.cover_image_url})` } : undefined}
                aria-hidden="true"
              />
              <div className="p-4">
                <h2 className="font-bold text-zinc-950">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{formatTurkishDate(item.date) || "Tarih yok"}</p>
                <button
                  type="button"
                  onClick={() => void handleDelete(item.id, item.title)}
                  disabled={deletingId === item.id}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  {deletingId === item.id ? "Siliniyor…" : "Sil"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
