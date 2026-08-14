import { CalendarDays, Images, Megaphone } from "lucide-react";
import { createServerSessionClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createServerSessionClient();
  const [eventsResult, announcementsResult, galleriesResult] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("announcements").select("*", { count: "exact", head: true }),
    supabase.from("galleries").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Toplam Etkinlik", value: eventsResult.count ?? 0, icon: CalendarDays },
    { label: "Toplam Duyuru", value: announcementsResult.count ?? 0, icon: Megaphone },
    { label: "Toplam Albüm", value: galleriesResult.count ?? 0, icon: Images },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
          Yönetim Paneline Hoş Geldiniz
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          Etkinlik, duyuru ve galeri içeriklerini buradan yönetebilirsiniz. Sol menüden ilgili bölüme geçin.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-bold text-zinc-950">{value}</p>
                <p className="mt-2 text-xs text-slate-400">Canlı Supabase verisi</p>
              </div>
              <span className="grid size-10 place-items-center rounded-lg bg-red-50 text-red-600">
                <Icon className="size-5" aria-hidden="true" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
