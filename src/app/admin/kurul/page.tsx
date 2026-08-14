"use client";

import { LoaderCircle, Pencil, Plus, Trash2, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient, type DbBoardMember } from "@/lib/supabase/client";

const boardLabels: Record<DbBoardMember["board_type"], string> = {
  management: "Yönetim Kurulu",
  audit: "Denetim Kurulu",
};

export default function AdminBoardPage() {
  const [members, setMembers] = useState<DbBoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("board_members")
        .select("*")
        .order("board_type", { ascending: false })
        .order("display_order", { ascending: true })
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
      .order("board_type", { ascending: false })
      .order("display_order", { ascending: true })
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

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`"${name}" adlı kurul üyesini silmek istediğinize emin misiniz?`)) return;

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
          <h1 className="text-2xl font-bold text-zinc-950">Kurul Yönetimi</h1>
          <p className="mt-1 text-sm text-slate-600">
            Yönetim ve denetim kurulu üyelerini listeleyin, ekleyin veya düzenleyin.
          </p>
        </div>
        <Link
          href="/admin/kurul/yeni"
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
              onClick={() => void loadMembers()}
              className="mt-4 text-sm font-semibold text-zinc-900 underline"
            >
              Tekrar dene
            </button>
          </div>
        ) : members.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">
            Henüz kurul üyesi yok. Yeni bir üye ekleyin.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Üye</th>
                  <th className="px-4 py-3 font-semibold">Görev/Unvan</th>
                  <th className="px-4 py-3 font-semibold">Kurul</th>
                  <th className="px-4 py-3 font-semibold">Sıra</th>
                  <th className="px-4 py-3 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex min-w-48 items-center gap-3">
                        <div className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100 text-slate-500">
                          {member.image_url ? (
                            <Image
                              src={member.image_url}
                              alt=""
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <UserRound className="size-5" aria-hidden="true" />
                          )}
                        </div>
                        <span className="font-medium text-zinc-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{member.role || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          member.board_type === "audit"
                            ? "bg-zinc-200 text-zinc-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {boardLabels[member.board_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{member.display_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/kurul/${member.id}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50"
                        >
                          <Pencil className="size-3.5" aria-hidden="true" />
                          Düzenle
                        </Link>
                        <button
                          type="button"
                          onClick={() => void handleDelete(member.id, member.name)}
                          disabled={deletingId === member.id}
                          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="size-3.5" aria-hidden="true" />
                          {deletingId === member.id ? "Siliniyor…" : "Sil"}
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
