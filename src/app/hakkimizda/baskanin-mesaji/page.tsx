import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContentPage } from "@/components/shared/content-page";
import { associationName } from "@/config/site";

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

export default function BaskaninMesajiPage() {
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
        <article className="w-full text-left">
          <div className="flex flex-col">
            
            {/* METİN DOĞRUDAN YAZILDI (Veritabanı bağlantısı koparıldı) */}
            <div className="text-base leading-7 text-zinc-700 space-y-4">
              <p>
                Sevgili Mezunlarımız, Kıymetli Öğretmenlerimiz ve Değerli Mensuplarımız,
              </p>
              <p>
                Okulumuzun adını onurla taşıyan derneğimizde, kuruluş sürecine başkanlık etmekten ve aktif olarak Yönetim Kurulu Başkanlığını sürdürmekten gurur ve mutluluk duyuyorum. Ortak mirasımız olan Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi'nin bizlere kazandırdığı değerleri yaşatmak ve gelecek nesillere aktarmak en büyük amacımızdır.
              </p>
              <p>
                Birlikteliğimizi güçlendirerek mezunlarımız ve öğrencilerimiz arasında köprüler kuracak; eğitimden sosyal dayanışmaya kadar pek çok alanda önemli izler bırakacağız. Sizlerin desteği ve katılımıyla derneğimizi çok daha ileriye taşıyacağımıza inancım tamdır.
              </p>
              <p>
                Birlikte daha güçlüyüz, aramıza hoş geldiniz.
              </p>
            </div>
            
            {/* İMZA BLOKU - SOLA DAYALI (items-start kullanıldı) */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-start">
              <p className="text-lg font-bold text-slate-900">Muhammed Emin Yılmaz</p>
              <p className="text-sm font-medium text-[#dc2626]">Yönetim Kurulu Başkanı</p>
              <p className="text-xs text-slate-500 mt-1">Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği</p>
            </div>
            
          </div>
        </article>
      </ContentPage>
    </>
  );
}