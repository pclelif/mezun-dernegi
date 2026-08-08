import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { announcements, events } from "@/content/sample-data";

export default function HomePage() {
  return (
    <>
      <section className="flex min-h-[55vh] items-end border-b border-[#6C757D]/20 bg-white text-black">
        <div className="container-site py-12 md:py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#EC1C24]">KAAFL Mezunlar Derneği</p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">Bir okul. Binlerce hikâye. Tek bir aile.</h1>
          <p className="mt-5 max-w-2xl text-lg text-[#6C757D]">Geçmişimizi yaşatıyor, mezunlarımızı buluşturuyor ve geleceğe birlikte değer katıyoruz.</p>
          <Link href="/uyelik" className="mt-6 inline-flex rounded-md bg-[#EC1C24] px-5 py-2.5 font-semibold text-white">Üye Ol</Link>
        </div>
      </section>

      <section className="section-space container-site">
        <SectionHeading eyebrow="Hikâyemiz" title="Okuldan bugüne" />
        <p className="max-w-3xl text-lg leading-8 text-black">Derneğimizin kuruluşundan bugüne uzanan kısa tarihçesi ve mezun dayanışmasının gelişimi bu alanda anlatılacak.</p>
      </section>

      <section className="section-space bg-[#F1F3F5]">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="Güncel" title="Duyurular" />{announcements.map((item) => <article className="mb-4 border-b border-[#6C757D]/20 bg-white py-4" key={item.slug}><time className="text-sm text-[#6C757D]">{item.date}</time><h3 className="mt-2 text-xl font-bold">{item.title}</h3></article>)}</div>
          <div><SectionHeading eyebrow="Takvim" title="Yaklaşan etkinlikler" />{events.map((item) => <article className="mb-4 rounded-lg border border-[#6C757D]/20 bg-white p-5" key={item.slug}><time className="text-sm text-[#EC1C24]">{item.date}</time><h3 className="mt-2 text-xl font-bold">{item.title}</h3><p className="mt-2 text-[#6C757D]">{item.location}</p></article>)}</div>
        </div>
      </section>

      <section className="section-space container-site text-center">
        <SectionHeading eyebrow="Mezun ağı" title="Şehirleri ve meslekleri aşan bağ" centered />
        <p className="mx-auto max-w-2xl text-black">Mezunların meslek ve şehir bazında birbirine ulaşabileceği ağ yapısı sonraki sprintlerde geliştirilecek.</p>
      </section>

      <section className="section-space border-t border-[#6C757D]/20 bg-[#F1F3F5] text-center text-black">
        <div className="container-site"><h2 className="text-2xl font-bold md:text-4xl">Sen de bu hikâyenin bir parçası ol.</h2><Link href="/uyelik" className="mt-6 inline-flex rounded-md bg-[#EC1C24] px-5 py-2.5 font-semibold text-white">Üyelik başvurusu yap</Link></div>
      </section>
    </>
  );
}
