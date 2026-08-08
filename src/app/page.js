import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { announcements, events } from "@/content/sample-data";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container-site home-hero__content">
          <h1 className="home-hero__title">Bir okul. Binlerce hikâye. Tek bir aile.</h1>
          <p className="home-hero__description">Geçmişimizi yaşatıyor, mezunlarımızı buluşturuyor ve geleceğe birlikte değer katıyoruz.</p>
          <Link href="/uyelik" className="button button--primary">Üye Ol</Link>
        </div>
      </section>

      <section className="section-space container-site">
        <SectionHeading eyebrow="Hikâyemiz" title="Okuldan bugüne" />
        <p className="body-copy">Derneğimizin kuruluşundan bugüne uzanan kısa tarihçesi ve mezun dayanışmasının gelişimi bu alanda anlatılacak.</p>
      </section>

      <section className="section-space section-surface">
        <div className="container-site two-column">
          <div>
            <SectionHeading eyebrow="Güncel" title="Duyurular" />
            {announcements.map((item) => <article className="content-list-item" key={item.slug}><time>{item.date}</time><h3>{item.title}</h3></article>)}
          </div>
          <div>
            <SectionHeading eyebrow="Takvim" title="Yaklaşan etkinlikler" />
            {events.map((item) => <article className="content-card" key={item.slug}><time className="content-card__date">{item.date}</time><h3 className="content-card__title">{item.title}</h3><p className="content-card__description">{item.location}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-space container-site">
        <SectionHeading eyebrow="Mezun ağı" title="Şehirleri aşan bağ" centered />
        <p className="body-copy body-copy--center">Mezunların meslek ve şehir bazında birbirine ulaşabileceği ağ yapısı sonraki sprintlerde geliştirilecek.</p>
      </section>

      <section className="cta-section">
        <div className="container-site"><h2>Derneğimize katılın.</h2><Link href="/uyelik" className="button button--primary">Üyelik başvurusu yap</Link></div>
      </section>
    </>
  );
}
