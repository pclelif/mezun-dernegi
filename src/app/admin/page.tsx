import { ArrowRight, Bell, CalendarDays, Image, Mail, Megaphone, MessageSquare, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { formatTurkishDate } from "@/lib/supabase/client";
import { createServerSessionClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createServerSessionClient();
  const [
    events,
    announcements,
    photos,
    messages,
    unread,
    recentEvents,
    recentAnnouncements,
    recentMessages,
  ] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("announcements").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("events").select("id,title,created_at").order("created_at", { ascending: false }).limit(3),
    supabase.from("announcements").select("id,title,created_at").order("created_at", { ascending: false }).limit(3),
    supabase.from("contact_messages").select("id,name,email,subject,message,is_read,created_at").order("created_at", { ascending: false }).limit(3),
  ]);

  const stats: { label: string; value: number; href: string; icon: LucideIcon }[] = [
    { label: "Toplam Duyuru", value: announcements.count ?? 0, href: "/admin/duyurular", icon: Megaphone },
    { label: "Toplam Etkinlik", value: events.count ?? 0, href: "/admin/etkinlikler", icon: CalendarDays },
    { label: "Toplam Fotoğraf", value: photos.count ?? 0, href: "/admin/galeri", icon: Image },
    { label: "Toplam Mesaj", value: messages.count ?? 0, href: "/admin/iletisim", icon: Mail },
    { label: "Okunmamış Mesaj", value: unread.count ?? 0, href: "/admin/iletisim", icon: MessageSquare },
  ];

  const latestContent = [
    ...(recentEvents.data ?? []).map((x) => ({ ...x, type: "Etkinlik" })),
    ...(recentAnnouncements.data ?? []).map((x) => ({ ...x, type: "Duyuru" })),
  ]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 4);

  const notifications = recentMessages.data ?? [];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">Genel Bakış</h1>
        <p className="mt-1 text-xs text-slate-600 sm:text-sm">
          Yönetim paneline hoş geldiniz. Bekleyen bildirimler, son eklenen içerikler ve güncel dernek istatistikleri burada görüntülenmektedir.
        </p>
      </div>

      {/* Üst Kısım: Bildirimler (Sol) ve Son Eklenenler (Sağ) */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Sol: Bildirimler Panel */}
        <section className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm min-w-0">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
                  <Bell className="size-4" />
                </span>
                <h2 className="text-base font-bold text-zinc-950">Bildirimler</h2>
              </div>
              {(unread.count ?? 0) > 0 ? (
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                  {unread.count} yeni mesaj
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  Tümü okundu
                </span>
              )}
            </div>

            <div className="mt-3 space-y-2">
              {notifications.length > 0 ? (
                notifications.map((msg) => (
                  <Link
                    key={msg.id}
                    href="/admin/iletisim"
                    className={`block rounded-lg border p-3 transition hover:border-red-200 hover:bg-red-50/40 ${
                      !msg.is_read ? "border-red-200 bg-red-50/20" : "border-zinc-100 bg-slate-50/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="truncate text-xs font-bold text-zinc-900 sm:text-sm">{msg.name}</p>
                          {!msg.is_read ? (
                            <span className="shrink-0 rounded bg-[#ec1c24] px-1.5 py-0.2 text-[10px] font-bold uppercase tracking-wider text-white">
                              Yeni
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-slate-600">
                          {msg.subject || "Konu belirtilmedi"}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {formatTurkishDate(msg.created_at)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-slate-500">Henüz bildirim bulunmuyor.</p>
              )}
            </div>
          </div>

          <div className="mt-4 border-t border-zinc-100 pt-3">
            <Link
              href="/admin/iletisim"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec1c24] hover:underline"
            >
              Tüm İletişim Mesajlarını Görüntüle <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </section>

        {/* Sağ: Son Eklenenler Panel */}
        <section className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm min-w-0">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
              <h2 className="text-base font-bold text-zinc-950">Son Eklenenler</h2>
              <span className="text-xs font-medium text-slate-500">Son güncellemeler</span>
            </div>

            <div className="mt-3 space-y-2">
              {latestContent.length > 0 ? (
                latestContent.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center justify-between gap-2 rounded-lg border border-zinc-100 bg-slate-50/40 p-2.5 sm:p-3 text-sm min-w-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-zinc-900 text-xs sm:text-sm">{item.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{formatTurkishDate(item.created_at)}</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-zinc-200/70 px-2 py-0.5 text-[11px] font-semibold text-zinc-700">
                      {item.type}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-slate-500">Henüz içerik eklenmedi.</p>
              )}
            </div>
          </div>

          <div className="mt-4 border-t border-zinc-100 pt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-[#ec1c24]">
            <Link href="/admin/duyurular" className="hover:underline">Duyuruları Yönet →</Link>
            <Link href="/admin/etkinlikler" className="hover:underline">Etkinlikleri Yönet →</Link>
          </div>
        </section>
      </div>

      {/* Alt Kısım: İstatistikler */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-zinc-950">İstatistikler</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
          {stats.map(({ label, value, href, icon: Icon }) => (
            <Link
              href={href}
              key={label}
              className="group rounded-xl border border-zinc-200 bg-white p-3.5 sm:p-4.5 shadow-sm transition hover:border-red-200 hover:shadow-md min-w-0"
            >
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-1 sm:mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">{value}</p>
                </div>
                <span className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-[#ec1c24] transition group-hover:bg-[#ec1c24] group-hover:text-white">
                  <Icon className="size-4 sm:size-4.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
