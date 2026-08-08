import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { announcements, events } from "@/content/sample-data";

export default function HomePage() {
  return (
    <>
      <section className="flex min-h-[70vh] items-end bg-[linear-gradient(120deg,#143d2b,#1f5a40)] text-white">
        <div className="container-site py-16 md:py-24">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#e2c780]">KAFL Mezun Derneği</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-7xl">Bir okul. Binlerce hikâye. Tek bir aile.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">Geçmişimizi yaşatıyor, mezunlarımızı buluşturuyor ve geleceğe birlikte değer katıyoruz.</p>
          <Link href="/uyelik" className="mt-8 inline-flex rounded-full bg-[#c7a45a] px-6 py-3 font-bold text-[#17201b]">Üye Ol</Link>
        </div>
      </section>

      <section className="section-space container-site">
        <SectionHeading eyebrow="Hikâyemiz" title="Okuldan bugüne" />
        <p className="max-w-3xl text-lg leading-8 text-[#647068]">Derneğimizin kuruluşundan bugüne uzanan kısa tarihçesi ve mezun dayanışmasının gelişimi bu alanda anlatılacak.</p>
      </section>

      <section className="section-space bg-[#f6f4ee]">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="Güncel" title="Duyurular" />{announcements.map((item) => <article className="mb-4 rounded-2xl bg-white p-6" key={item.slug}><time className="text-sm text-[#647068]">{item.date}</time><h3 className="mt-2 text-xl font-bold">{item.title}</h3></article>)}</div>
          <div><SectionHeading eyebrow="Takvim" title="Yaklaşan etkinlikler" />{events.map((item) => <article className="mb-4 rounded-2xl bg-[#143d2b] p-6 text-white" key={item.slug}><time className="text-sm text-white/70">{item.date}</time><h3 className="mt-2 text-xl font-bold">{item.title}</h3><p className="mt-2 text-white/70">{item.location}</p></article>)}</div>
        </div>
      </section>

      <section className="section-space container-site text-center">
        <SectionHeading eyebrow="Mezun ağı" title="Şehirleri ve meslekleri aşan bağ" centered />
        <p className="mx-auto max-w-2xl text-[#647068]">Mezunların meslek ve şehir bazında birbirine ulaşabileceği ağ yapısı sonraki sprintlerde geliştirilecek.</p>
      </section>

      <section className="section-space bg-[#143d2b] text-center text-white">
        <div className="container-site"><h2 className="text-3xl font-bold md:text-5xl">Sen de bu hikâyenin bir parçası ol.</h2><Link href="/uyelik" className="mt-8 inline-flex rounded-full bg-[#c7a45a] px-7 py-3 font-bold text-[#17201b]">Üyelik başvurusu yap</Link></div>
      </section>
    </>
  );
}
