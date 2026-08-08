import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { announcements, events } from "@/content/sample-data";

export default function HomePage() {
  return (
    <>
      <section className="flex min-h-[70vh] items-end bg-[#EC1C24] text-white">
        <div className="container-site py-16 md:py-24">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white">KAAFL Mezun Derneği</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-7xl">Bir okul. Binlerce hikâye. Tek bir aile.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">Geçmişimizi yaşatıyor, mezunlarımızı buluşturuyor ve geleceğe birlikte değer katıyoruz.</p>
          <Link href="/uyelik" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-bold text-[#EC1C24]">Üye Ol</Link>
        </div>
      </section>

      <section className="section-space container-site">
        <SectionHeading eyebrow="Hikâyemiz" title="Okuldan bugüne" />
        <p className="max-w-3xl text-lg leading-8 text-[#6C757D]">Derneğimizin kuruluşundan bugüne uzanan kısa tarihçesi ve mezun dayanışmasının gelişimi bu alanda anlatılacak.</p>
      </section>

      <section className="section-space bg-[#F1F3F5]">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="Güncel" title="Duyurular" />{announcements.map((item) => <article className="mb-4 rounded-2xl bg-white p-6" key={item.slug}><time className="text-sm text-[#6C757D]">{item.date}</time><h3 className="mt-2 text-xl font-bold">{item.title}</h3></article>)}</div>
          <div><SectionHeading eyebrow="Takvim" title="Yaklaşan etkinlikler" />{events.map((item) => <article className="mb-4 rounded-2xl bg-[#EC1C24] p-6 text-white" key={item.slug}><time className="text-sm text-white/70">{item.date}</time><h3 className="mt-2 text-xl font-bold">{item.title}</h3><p className="mt-2 text-white/70">{item.location}</p></article>)}</div>
        </div>
      </section>

      <section className="section-space container-site text-center">
        <SectionHeading eyebrow="Mezun ağı" title="Şehirleri ve meslekleri aşan bağ" centered />
        <p className="mx-auto max-w-2xl text-[#6C757D]">Mezunların meslek ve şehir bazında birbirine ulaşabileceği ağ yapısı sonraki sprintlerde geliştirilecek.</p>
      </section>

      <section className="section-space bg-[#EC1C24] text-center text-white">
        <div className="container-site"><h2 className="text-3xl font-bold md:text-5xl">Sen de bu hikâyenin bir parçası ol.</h2><Link href="/uyelik" className="mt-8 inline-flex rounded-full bg-white px-7 py-3 font-bold text-[#EC1C24]">Üyelik başvurusu yap</Link></div>
      </section>
    </>
  );
}
