"use client";

import {
  ArrowUpDown,
  CheckCheck,
  ChevronDown,
  Eye,
  EyeOff,
  Inbox,
  LoaderCircle,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createClient, formatTurkishDate } from "@/lib/supabase/client";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminContactPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("all");
  const [sortBy, setSortBy] = useState<"desc" | "asc">("desc");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ id: string; name: string } | null>(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  useEffect(() => {
    let active = true;
    void createClient()
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (!error) {
          setItems((data ?? []) as Message[]);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function toggleReadStatus(item: Message) {
    const nextStatus = !item.is_read;
    const { error } = await createClient()
      .from("contact_messages")
      .update({ is_read: nextStatus })
      .eq("id", item.id);

    if (!error) {
      setItems((all) =>
        all.map((x) => (x.id === item.id ? { ...x, is_read: nextStatus } : x))
      );
    }
  }

  async function markAllAsRead() {
    setBulkActionLoading(true);
    try {
      const unreadIds = items.filter((x) => !x.is_read).map((x) => x.id);
      if (!unreadIds.length) return;

      const { error } = await createClient()
        .from("contact_messages")
        .update({ is_read: true })
        .in("id", unreadIds);

      if (!error) {
        setItems((all) => all.map((x) => ({ ...x, is_read: true })));
      }
    } finally {
      setBulkActionLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const { error } = await createClient().from("contact_messages").delete().eq("id", id);
      if (!error) {
        setItems((all) => all.filter((x) => x.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  // Stats calculation
  const totalCount = items.length;
  const unreadCount = items.filter((x) => !x.is_read).length;
  const readCount = totalCount - unreadCount;

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (statusFilter === "unread" && item.is_read) return false;
        if (statusFilter === "read" && !item.is_read) return false;

        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          (item.subject && item.subject.toLowerCase().includes(q)) ||
          (item.phone && item.phone.toLowerCase().includes(q)) ||
          item.message.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortBy === "desc" ? timeB - timeA : timeA - timeB;
      });
  }, [items, statusFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">İletişim Formu</h1>
          <p className="mt-1 text-sm text-slate-600">Gelen iletişim mesajlarını listeleyin, okuyun ve yönetin.</p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() => void markAllAsRead()}
            disabled={bulkActionLoading}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50 cursor-pointer"
          >
            {bulkActionLoading ? <LoaderCircle className="size-4 animate-spin" /> : <CheckCheck className="size-4" />}
            Tümünü Okundu İşaretle ({unreadCount})
          </button>
        )}
      </div>

      {/* Summary Stat Badges - All Unified Red Icons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
              <Inbox className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Toplam</p>
              <p className="text-xl font-bold text-zinc-950">{totalCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
              <CheckCheck className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Okunmuş</p>
              <p className="text-xl font-bold text-zinc-950">{readCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-red-100 text-[#ec1c24]">
              <MessageSquare className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Okunmamış</p>
              <p className="text-xl font-bold text-red-700">{unreadCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim, e-posta veya mesajda ara…"
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-red-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-zinc-200 bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
                statusFilter === "all" ? "bg-white text-zinc-950 shadow-sm" : "text-slate-600 hover:text-zinc-900"
              }`}
            >
              Tümü ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("unread")}
              className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
                statusFilter === "unread" ? "bg-white text-red-700 font-bold shadow-sm" : "text-slate-600 hover:text-zinc-900"
              }`}
            >
              Yeni ({unreadCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("read")}
              className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
                statusFilter === "read" ? "bg-white text-zinc-950 shadow-sm" : "text-slate-600 hover:text-zinc-900"
              }`}
            >
              Okunmuş ({readCount})
            </button>
          </div>

          <div className="relative inline-flex items-center">
            <ArrowUpDown className="pointer-events-none absolute left-3 size-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "desc" | "asc")}
              className="h-10 appearance-none rounded-lg border border-zinc-300 bg-white pl-9 pr-8 text-xs font-semibold text-zinc-800 outline-none cursor-pointer hover:border-zinc-400"
            >
              <option value="desc">En Yeni Önce</option>
              <option value="asc">En Eski Önce</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 size-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-slate-500">
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          Yükleniyor…
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-slate-500">
          {searchQuery ? "Arama kriterlerine uygun mesaj bulunamadı." : "Henüz mesaj yok."}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`rounded-xl border bg-white p-5 shadow-sm transition-all ${
                !item.is_read
                  ? "border-red-300 bg-red-50/10 ring-1 ring-red-200"
                  : "border-zinc-200"
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-zinc-950">
                      {item.subject && item.subject.trim() !== "" ? item.subject : "Konusuz Mesaj"}
                    </h2>
                    {!item.is_read ? (
                      <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                        Yeni
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600">
                    <span className="font-semibold text-zinc-900">{item.name}</span>
                    <span className="text-slate-300 font-normal select-none">·</span>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-red-600 hover:underline"
                    >
                      {item.email}
                    </a>
                    {item.phone && (
                      <>
                        <span className="text-slate-300 font-normal select-none">·</span>
                        <a
                          href={`tel:${item.phone.replace(/\s+/g, "")}`}
                          className="text-slate-600 hover:text-red-600 hover:underline"
                        >
                          {item.phone}
                        </a>
                      </>
                    )}
                    <span className="text-slate-300 font-normal select-none">·</span>
                    <span className="text-slate-400">{formatTurkishDate(item.created_at)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=Re:%20${encodeURIComponent(item.subject || "İletişim Mesajınız")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50"
                  >
                    <Mail className="size-3.5 text-red-600" />
                    Yanıtla
                  </a>

                  <button
                    type="button"
                    onClick={() => void toggleReadStatus(item)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-slate-50 cursor-pointer"
                  >
                    {item.is_read ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5 text-red-600" />}
                    {item.is_read ? "Okunmadı İşaretle" : "Okundu İşaretle"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmItem({ id: item.id, name: item.name })}
                    disabled={deletingId === item.id}
                    className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                    {deletingId === item.id ? "Siliniyor…" : "Sil"}
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
                {item.message}
              </p>
            </article>
          ))}
        </div>
      )}

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
            <h3 className="text-center text-lg font-bold text-zinc-950">Mesajı Sil?</h3>
            <p className="mt-2 text-center text-sm text-slate-600">
              “{deleteConfirmItem.name}” tarafından gönderilen iletişim mesajı kalıcı olarak silinecektir. Bu işlem geri alınamaz.
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
