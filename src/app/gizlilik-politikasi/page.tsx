import { DataRecipients, RetentionDetails } from "@/components/legal/data-processing-details";
import { legalAddress } from "@/config/legal";
import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  legalHeadingClass,
  legalLinkClass,
  legalListClass,
  legalSectionClass,
} from "@/components/legal/legal-page";
import { associationName } from "@/config/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${associationName} internet sitesi gizlilik politikası.`,
  alternates: {
    canonical: "/gizlilik-politikasi",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      description="İnternet sitemizi kullanırken paylaştığınız bilgilerin korunmasına ilişkin esaslar."
    >
      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>1. Amaç ve kapsam</h2>
        <p>
          Bu Gizlilik Politikası, <strong>{associationName}</strong> (“Dernek”) tarafından işletilen
          internet sitesini ziyaret eden veya Dernek ile dijital kanallardan iletişim kuran kişilerin
          bilgilerinin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>2. Toplanan bilgiler</h2>
        <p>Siteyi kullanımınıza ve Dernek ile ilişkinize göre şu bilgiler toplanabilir:</p>
        <ul className={legalListClass}>
          <li>İletişim formu üzerinden ilettiğiniz ad soyad, e-posta adresi, konu ve mesaj içeriği; e-postayla iletişim kurduğunuzda gönderdiğiniz bilgiler.</li>
          <li>Üyelik e-posta adresine gönderdiğiniz kimlik, mezuniyet, üyelik bilgileri ve başvuru ekleri; adli sicil ve üyelik bilgileri özel nitelikli veri olarak ayrıca değerlendirilir.</li>
          <li>Aidat veya bağış süreçlerine ilişkin işlem ve dekont bilgileri.</li>
          <li>IP adresi, tarayıcı türü, erişim zamanı ve güvenlik günlükleri gibi teknik kayıtlar.</li>
          <li>Açık rızanız veya hukuki dayanak bulunması hâlinde etkinlik fotoğraf ve videoları.</li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>3. Bilgilerin kullanım amaçları</h2>
        <p>Toplanan bilgiler yalnızca aşağıdaki amaçlarla ve gerekli olduğu ölçüde kullanılır:</p>
        <ul className={legalListClass}>
          <li>Taleplerinizi yanıtlamak ve sizinle iletişim kurmak.</li>
          <li>Üyelik, aidat, bağış, etkinlik ve duyuru süreçlerini yürütmek.</li>
          <li>İnternet sitesinin güvenliğini, sürekliliğini ve performansını sağlamak.</li>
          <li>Derneğin tabi olduğu yasal ve idari yükümlülükleri yerine getirmek.</li>
          <li>Uyuşmazlıkların çözümü ve hakların korunması için kayıt tutmak.</li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>4. Çerezler</h2>
        <p>
          Google Analytics kaldırılmıştır; site Analytics ölçüm kodu yüklemez ve Google Analytics’e
          ziyaret verisi göndermez. Eski kabul/ret tercihleriniz bu hizmeti yeniden etkinleştirmez.
          Yönetici oturumları için gerekli çerezler kullanılabilir. Çerez türleri, amaçları
          ve tercihlerinizi nasıl yönetebileceğiniz hakkında ayrıntılı bilgi için{" "}
          <Link href="/cerez-politikasi" className={legalLinkClass}>
            Çerez Politikası
          </Link>{" "}
          sayfasını inceleyebilirsiniz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>5. Hizmet sağlayıcılar ve aktarım</h2>
        <DataRecipients />
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>6. Saklama ve güvenlik</h2>
        <RetentionDetails />
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>7. Üçüncü taraf bağlantıları ve servisler</h2>
        <p>
          Site, üçüncü taraf internet sitelerine bağlantı verebilir veya sayfa içerisinde harita (Google Maps)
          gibi harici servis bileşenleri sunabilir. Bu servislerin kullanımı sırasında ilgili sağlayıcılar
          tarafından teknik veriler işlenebilir. Bağlantı verilen sitelerin ve servislerin gizlilik
          politikalarını ayrıca incelemenizi öneririz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>8. Haklarınız ve iletişim</h2>
        <p>
          Kişisel verilerinize ilişkin haklarınız ve başvuru yöntemleri için{" "}
          <Link href="/kvkk" className={legalLinkClass}>
            KVKK Aydınlatma Metni
          </Link>{" "}
          sayfasını inceleyebilirsiniz. Sorularınızı <strong>kaaflmezunder@gmail.com</strong> adresine
          veya <strong>{legalAddress}</strong> adresine
          iletebilirsiniz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>9. Politika değişiklikleri</h2>
        <p>
          Bu politika mevzuat, hizmetler veya veri işleme süreçlerindeki değişikliklere göre
          güncellenebilir. Güncel metin yayımlandığı tarihten itibaren geçerli olur.
        </p>
      </section>
    </LegalPage>
  );
}
