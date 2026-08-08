import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { EventCard } from "@/components/cards/event-card";
import { announcements, events } from "@/content/sample-data";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[32rem] items-end overflow-hidden bg-zinc-800 md:min-h-[36rem]">
        <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85')] bg-cover bg-center" role="img" aria-label="Birlikte yürüyen mezunlar" />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="mx-auto w-[min(100%-2rem,75rem)] py-14 text-white md:w-[min(100%-4rem,75rem)] md:py-20">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/80">KAAFL Mezunlar Derneği</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">Bir okuldan fazlası,<br className="hidden md:block" /> ömür boyu süren bir bağ.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 md:text-lg">Geçmişimizi yaşatıyor, mezunlarımızı buluşturuyor ve yeni kuşaklara birlikte değer katıyoruz.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/uyelik/basvuru" className="inline-flex min-h-11 items-center justify-center rounded-md bg-red-600 px-6 font-semibold text-white hover:bg-red-700">Derneğe üye ol</Link><Link href="/kurumsal/hakkimizda" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white px-6 font-semibold text-white hover:bg-white hover:text-zinc-950">Bizi tanıyın</Link></div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(100%-2rem,75rem)] gap-10 py-14 md:w-[min(100%-4rem,75rem)] md:grid-cols-[0.8fr_1.2fr] md:py-20">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">Hikâyemiz</p><h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">Aynı sıralardan güçlü bir mezun ağına</h2></div>
        <div><p className="text-base leading-7 text-zinc-600 md:text-lg md:leading-8">Derneğimiz; mezunlarımız arasındaki iletişimi canlı tutmak, dayanışmayı büyütmek ve okulumuza kalıcı katkılar sunmak için çalışır.</p><Link className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-zinc-950" href="/kurumsal/hakkimizda">Derneğimizi tanıyın <ArrowRight className="size-4 text-red-600" /></Link></div>
      </section>

      <section className="bg-zinc-100 py-14 md:py-20"><div className="mx-auto w-[min(100%-2rem,75rem)] md:w-[min(100%-4rem,75rem)]"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">Güncel</p><h2 className="mt-2 text-2xl font-bold text-zinc-950 md:text-3xl">Duyurular</h2></div><Link className="text-sm font-bold text-zinc-900" href="/duyurular">Tüm duyurular →</Link></div><div className="grid gap-5 md:grid-cols-2">{announcements.map((item) => <AnnouncementCard key={item.href} headingLevel="h3" {...item} />)}</div></div></section>

      <section className="mx-auto w-[min(100%-2rem,75rem)] py-14 md:w-[min(100%-4rem,75rem)] md:py-20"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">Takvim</p><h2 className="mt-2 text-2xl font-bold text-zinc-950 md:text-3xl">Yaklaşan etkinlikler</h2></div><div className="grid gap-5 md:grid-cols-2">{events.map((item) => <EventCard key={item.href} headingLevel="h3" {...item} />)}</div></section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-12 text-center"><div className="mx-auto w-[min(100%-2rem,48rem)]"><h2 className="text-2xl font-bold text-zinc-950">Mezun topluluğumuzun bir parçası olun.</h2><p className="mt-3 leading-7 text-zinc-600">Bağlarımızı güçlendirmek ve çalışmalarımıza katkı sunmak için derneğimize katılın.</p><Link href="/uyelik/basvuru" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-red-600 px-6 font-semibold text-white">Üyelik başvurusu yap</Link></div></section>
    </>
  );
}
