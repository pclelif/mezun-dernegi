import { CalendarDays, Image, Images, Mail, Megaphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { createServerSessionClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createServerSessionClient();
  const [events, announcements, galleries, photos, messages, unread, recentEvents, recentAnnouncements] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("announcements").select("*", { count: "exact", head: true }),
    supabase.from("galleries").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("events").select("id,title,created_at").order("created_at", { ascending: false }).limit(3),
    supabase.from("announcements").select("id,title,created_at").order("created_at", { ascending: false }).limit(3),
  ]);
  const groups: { title: string; stats: { label: string; value: number; href: string; icon: LucideIcon }[] }[] = [
    { title: "İçerikler", stats: [
      { label: "Toplam Etkinlik", value: events.count ?? 0, href: "/admin/etkinlikler", icon: CalendarDays },
      { label: "Toplam Duyuru", value: announcements.count ?? 0, href: "/admin/duyurular", icon: Megaphone },
      { label: "Toplam Albüm", value: galleries.count ?? 0, href: "/admin/galeri", icon: Images },
      { label: "Toplam Fotoğraf", value: photos.count ?? 0, href: "/admin/galeri", icon: Image },
    ] },
    { title: "İletişim", stats: [
      { label: "Toplam Mesaj", value: messages.count ?? 0, href: "/admin/iletisim", icon: Mail },
      { label: "Okunmamış Mesaj", value: unread.count ?? 0, href: "/admin/iletisim", icon: Mail },
    ] },
  ];
  const latest = [...(recentEvents.data ?? []).map((x) => ({ ...x, type: "Etkinlik" })), ...(recentAnnouncements.data ?? []).map((x) => ({ ...x, type: "Duyuru" }))].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);
  return <div className="space-y-8"><div><h1 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">Genel Bakış</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">Dernek web sitenizdeki içerikleri ve iletişim mesajlarını buradan yönetin.</p></div>
    {groups.map((group) => <section key={group.title} className="space-y-3"><h2 className="text-lg font-bold text-zinc-900">{group.title}</h2><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{group.stats.map(({ label, value, href, icon: Icon }) => <Link href={href} key={label} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:shadow-md"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold text-zinc-950">{value}</p></div><span className="grid size-10 place-items-center rounded-lg bg-red-50 text-red-600"><Icon className="size-5" /></span></div></Link>)}</div></section>)}
    <div className="grid gap-5 lg:grid-cols-2"><section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-zinc-950">Son Eklenenler</h2><div className="mt-4 space-y-3">{latest.length ? latest.map((item) => <div key={`${item.type}-${item.id}`} className="flex items-center justify-between gap-3 border-b border-zinc-100 pb-3 text-sm last:border-0"><span className="font-medium text-zinc-800">{item.title}</span><span className="text-xs text-slate-500">{item.type}</span></div>) : <p className="text-sm text-slate-500">Henüz içerik eklenmedi.</p>}</div></section><section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-zinc-950">Bekleyen İşlemler</h2><Link href="/admin/iletisim" className="mt-4 flex justify-between rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-800"><span>Okunmamış iletişim mesajları</span><span>{unread.count ?? 0}</span></Link></section></div>
  </div>;
}
