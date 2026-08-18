"use client";

import { GripVertical, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, type DbBoardMember } from "@/lib/supabase/client";

const roleLabels: Record<string, string> = {
  head: "Yönetim Kurulu Başkanı",
  deputy: "Yönetim Kurulu Başkan Yardımcısı",
  secretary: "Genel Sekreter",
  accountant: "Sayman",
  member: "Yönetim Kurulu Üyesi",
  audit_head: "Denetim Kurulu Başkanı",
  audit_member: "Denetim Kurulu Üyesi",
};

export default function AdminBoardMembersPage() {
  const [members, setMembers] = useState<DbBoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ id: string; name: string } | null>(null);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const loadMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("board_members")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: true });

      if (queryError) throw queryError;
      setMembers((data ?? []) as DbBoardMember[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kurul üyeleri yüklenemedi.");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase
      .from("board_members")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) {
          setError(queryError.message);
          setMembers([]);
        } else {
          setMembers((data ?? []) as DbBoardMember[]);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Drag and drop handlers
  function handleDragStart(e: React.DragEvent, index: number) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...members];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setMembers(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from("board_members").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setMembers((current) => current.filter((member) => member.id !== id));
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
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Yönetim ve Denetim Kurulu</h1>
          <p className="mt-1 text-sm text-slate-600">Kurul üyelerini listeleyin, sürükleyerek sıralayın, ekleyin veya düzenleyin.</p>
        </div>
        <Link
          href="/admin/kurul/yeni"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700"
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
            <button type="button" onClick={() => void loadMembers()} className="mt-4 text-sm font-semibold text-zinc-900 underline">
              Tekrar dene
            </button>
          </div>
        ) : members.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">Henüz kurul üyesi eklenmemiş. Yeni üye ekleyin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 select-none">
                <tr>
                  <th className="w-12 px-4 py-3.5 text-center"></th>
                  <th className="px-6 py-3.5 font-semibold">Ad Soyad</th>
                  <th className="px-6 py-3.5 font-semibold">Görev</th>
                  <th className="px-6 py-3.5 font-semibold">Kurul</th>
                  <th className="px-6 py-3.5 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {members.map((member, index) => {
                  const isDragging = draggedIndex === index;
                  const isOver = dragOverIndex === index;

                  return (
                    <tr
                      key={member.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                      onDragEnd={handleDragEnd}
                      className={`cursor-grab active:cursor-grabbing transition-all duration-150 ${
                        isDragging
                          ? "opacity-30 bg-slate-100 scale-[0.99]"
                          : isOver
                          ? "border-t-2 border-t-red-500 bg-red-50/50"
                          : "hover:bg-slate-50/60"
                      }`}
                    >
                      <td className="w-12 px-4 py-3.5 text-center align-middle">
                        <GripVertical className="mx-auto size-4 text-slate-400 hover:text-red-600 transition-colors" />
                      </td>
                      <td className="px-6 py-3.5 font-medium text-zinc-900 align-middle">{member.name}</td>
                      <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap align-middle">{(member.role && roleLabels[member.role]) || member.role || "—"}</td>
                      <td className="px-6 py-3.5 whitespace-nowrap align-middle">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${member.board_type === "audit" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                          {member.board_type === "audit" ? "Denetim Kurulu" : "Yönetim Kurulu"}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap align-middle">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/kurul/${member.id}`}
                            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50"
                          >
                            <Pencil className="size-3.5" aria-hidden="true" />
                            Düzenle
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmItem({ id: member.id, name: member.name })}
                            disabled={deletingId === member.id}
                            className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50 cursor-pointer"
                          >
                            <Trash2 className="size-3.5" aria-hidden="true" />
                            {deletingId === member.id ? "Siliniyor…" : "Sil"}
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
            <h3 className="text-center text-lg font-bold text-zinc-950">Üyeyi Sil?</h3>
            <p className="mt-2 text-center text-sm text-slate-600">
              “{deleteConfirmItem.name}” isimli kurul üyesi kalıcı olarak silinecektir. Bu işlem geri alınamaz.
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
