"use client";

import { LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, type DbFaq } from "@/lib/supabase/client";

export default function AdminFaqsPage() {
  const [items, setItems] = useState<DbFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("faqs")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (queryError) throw queryError;
      setItems((data ?? []) as DbFaq[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "S.S.S. kayıtları yüklenemedi.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    void supabase
      .from("faqs")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data, error: queryError }) => {
        if (!active) return;

        if (queryError) {
          setError(queryError.message);
          setItems([]);
        } else {
          setItems((data ?? []) as DbFaq[]);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(id: string, question: string) {
    if (!window.confirm(`"${question}" sorusunu silmek istediğinize emin misiniz?`)) return;

    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("faqs").delete().eq("id", id);
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
          <h1 className="text-2xl font-bold text-zinc-950">S.S.S. Yönetimi</h1>
          <p className="mt-1 text-sm text-slate-600">
            Sıkça sorulan soruları listeleyin, ekleyin veya düzenleyin.
          </p>
        </div>
        <Link
          href="/admin/sss/yeni"
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
            <button
              type="button"
              onClick={() => void loadItems()}
              className="mt-4 text-sm font-semibold text-zinc-900 underline"
            >
              Tekrar dene
            </button>
          </div>
        ) : items.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">
            Henüz S.S.S. kaydı yok. Yeni bir soru ekleyin.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Sıra</th>
                  <th className="px-4 py-3 font-semibold">Soru</th>
                  <th className="px-4 py-3 font-semibold">Cevap</th>
                  <th className="px-4 py-3 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-3 text-slate-600">{item.display_order}</td>
                    <td className="max-w-xs px-4 py-3 font-medium text-zinc-900">
                      {item.question}
                    </td>
                    <td className="max-w-md px-4 py-3 text-slate-600">
                      <p className="line-clamp-2">{item.answer}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/sss/${item.id}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50"
                        >
                          <Pencil className="size-3.5" aria-hidden="true" />
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => void handleDelete(item.id, item.question)}
                          disabled={deletingId === item.id}
                          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="size-3.5" aria-hidden="true" />
                          {deletingId === item.id ? "Siliniyor…" : "Sil"}
                        </button>
                      </div>
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
