import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { EventCard } from "@/components/cards/event-card";
import { associationName } from "@/config/site";
import { announcements, events } from "@/content/sample-data";

const upcomingEvents = events.filter((event) => event.status === "upcoming");

const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-red-600 px-6 font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";
const textLinkClass =
  "inline-flex items-center gap-2 rounded-sm text-sm font-bold text-zinc-900 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[23rem] items-end overflow-hidden bg-zinc-800 md:min-h-[26rem]">
        <div
          className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85')] bg-cover bg-center"
          role="img"
          aria-label="Birlikte yürüyen mezunlar"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="mx-auto w-[min(100%-2rem,75rem)] py-10 text-white md:w-[min(100%-4rem,75rem)] md:py-14">
          <p className="mb-4 max-w-3xl text-xs font-bold uppercase leading-5 tracking-[0.16em] text-white/80">
            {associationName}
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Bir okul. Binlerce hikâye. Tek bir aile.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
            Mezunlarımızı bir araya getiriyor, okulumuzla olan bağımızı ve birbirimizle olan iletişimimizi canlı tutuyoruz.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/uyelik/basvuru" className={primaryButtonClass}>Üye Ol</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(100%-2rem,75rem)] gap-10 py-14 md:w-[min(100%-4rem,75rem)] md:grid-cols-[0.8fr_1.2fr] md:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">Hakkımızda</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
            Geçmişin güçlü temelleriyle, geleceğe uzanan köprü.
          </h2>
        </div>
        <div className="md:pt-8">
          <p className="text-base leading-7 text-zinc-600 md:text-lg md:leading-8">
            Derneğimiz; mezunlarımız arasındaki iletişimi güçlendirmek, okulumuza katkı sağlamak ve mezunlarımızı ortak bir çatı altında buluşturmak amacıyla faaliyet göstermektedir.
          </p>
          <Link className={`${textLinkClass} mt-5`} href="/kurumsal/hakkimizda">
            Detaylı Bilgi <ArrowRight className="size-4 text-red-600" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-2rem,75rem)] py-14 md:w-[min(100%-4rem,75rem)] md:py-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950 md:text-3xl">Etkinlikler</h2>
            <p className="mt-2 text-base leading-7 text-zinc-600">Mezunlarımızla bir araya geldiğimiz etkinlikler ve buluşmalar.</p>
          </div>
          <Link className={textLinkClass} href="/etkinlikler">
            Tüm Etkinlikler <ArrowRight className="size-4 text-red-600" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {upcomingEvents.map((item) => <EventCard key={item.href} headingLevel="h3" {...item} />)}
        </div>
      </section>

      <section className="bg-zinc-100 py-14 md:py-20">
        <div className="mx-auto w-[min(100%-2rem,75rem)] md:w-[min(100%-4rem,75rem)]">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-zinc-950 md:text-3xl">Duyurular</h2>
              <p className="mt-2 text-base leading-7 text-zinc-600">Derneğimizden güncel haberler, duyurular ve gelişmeler.</p>
            </div>
            <Link className={textLinkClass} href="/duyurular">
              Tüm Duyurular <ArrowRight className="size-4 text-red-600" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {announcements.map((item) => <AnnouncementCard key={item.href} headingLevel="h3" {...item} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 py-12 text-center">
        <div className="mx-auto w-[min(100%-2rem,48rem)]">
          <h2 className="text-2xl font-bold text-zinc-950">Sen de bu hikâyenin bir parçası ol.</h2>
          <p className="mt-3 leading-7 text-zinc-600">Mezun topluluğumuza katılın, dernek çalışmalarından ve etkinliklerden haberdar olun.</p>
          <Link href="/uyelik/basvuru" className={`${primaryButtonClass} mt-6`}>Üyelik Başvurusu</Link>
        </div>
      </section>
    </>
  );
}
