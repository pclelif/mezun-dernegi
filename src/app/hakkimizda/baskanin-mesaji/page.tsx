import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { associationName } from "@/config/site";
import { getSiteContent } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Başkanın Mesajı",
  description: `${associationName} Yönetim Kurulu Başkanı'nın mezunlarımıza, öğrencilerimize ve dernek topluluğumuza mesajı.`,
  alternates: {
    canonical: "/hakkimizda/baskanin-mesaji",
  },
  openGraph: {
    title: `Başkanın Mesajı | ${associationName}`,
    description: `${associationName} Yönetim Kurulu Başkanı'nın mezunlarımıza, öğrencilerimize ve dernek topluluğumuza mesajı.`,
    url: "/hakkimizda/baskanin-mesaji",
  },
};

const defaultPresidentMessage = `Sevgili Mezunlarımız, Kıymetli Öğretmenlerimiz ve Değerli Mensuplarımız,
Okulumuzun adını onurla taşıyan derneğimizde, kuruluş sürecine başkanlık etmekten ve aktif olarak Yönetim Kurulu Başkanlığını sürdürmekten gurur ve mutluluk duyuyorum. Ortak mirasımız olan Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi'nin bizlere kazandırdığı değerleri yaşatmak ve gelecek nesillere aktarmak en büyük amacımızdır.

Birlikteliğimizi güçlendirerek mezunlarımız ve öğrencilerimiz arasında köprüler kuracak; eğitimden sosyal dayanışmaya kadar pek çok alanda önemli izler bırakacağız. Sizlerin desteği ve katılımıyla derneğimizi çok daha ileriye taşıyacağımıza inancım tamdır.

Birlikte daha güçlüyüz, aramıza hoş geldiniz.`;

export default async function BaskaninMesajiPage() {
  const content = await getSiteContent("hakkimizda", contentSections.hakkimizda.defaults);

  const oldPresidentMessages = [
    `Değerli Mezunlarımız,

Okulumuzda başlayan ortak hikâyemizi mezuniyet sonrasında da dayanışma, paylaşım ve aidiyet duygusuyla sürdürmek için bir aradayız. Derneğimizin; mezunlarımız arasında güçlü bağlar kuran, öğrencilerimize destek olan ve okulumuzun değerlerini geleceğe taşıyan canlı bir buluşma noktası olmasını amaçlıyoruz.

Her mezunumuzun katkısı ve katılımı bu yapıyı daha güçlü kılacaktır. Birlikte üreteceğimiz çalışmaların mezun topluluğumuza ve okulumuza kalıcı değer katacağına inanıyor, hepinizi sevgi ve saygıyla selamlıyorum.`,
  ];

  const presidentMessage =
    content.president_message &&
    !oldPresidentMessages.includes(content.president_message.trim())
      ? content.president_message
      : defaultPresidentMessage;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hakkımızda", href: "/hakkimizda/dernek-hakkinda" },
          { name: "Başkanın Mesajı", href: "/hakkimizda/baskanin-mesaji" },
        ]}
      />
      <ContentPage
        eyebrow="MEZUNLARIMIZ İÇİN"
        title="Başkanın Mesajı"
        description="Başkanımızın mezunlarımıza ve derneğimize dair mesajı."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      >
        <article className={`grid w-full items-start gap-8 text-left ${content.president_image_url ? "md:grid-cols-[minmax(0,1fr)_18rem]" : ""}`}>
          <p className="whitespace-pre-line text-base leading-7 text-zinc-700">
            {presidentMessage}
          </p>
          {content.president_image_url ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-100 shadow-sm">
              <Image
                src={content.president_image_url}
                alt="Dernek başkanı"
                fill
                sizes="(min-width: 768px) 288px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </article>
      </ContentPage>
    </>
  );
}
