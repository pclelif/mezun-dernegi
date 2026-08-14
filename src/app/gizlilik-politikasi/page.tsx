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
          <li>İletişim sırasında paylaştığınız ad, soyad, e-posta, telefon ve mesaj içeriği.</li>
          <li>Üyelik başvurusu kapsamında ilettiğiniz kimlik, mezuniyet ve üyelik bilgileri.</li>
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
          Site, güvenli ve düzgün çalışması için zorunlu çerezler kullanabilir. Çerez türleri, amaçları
          ve tercihlerinizi nasıl yönetebileceğiniz hakkında ayrıntılı bilgi için{" "}
          <Link href="/cerez-politikasi" className={legalLinkClass}>
            Çerez Politikası
          </Link>{" "}
          sayfasını inceleyebilirsiniz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>5. Hizmet sağlayıcılar ve aktarım</h2>
        <p>
          Bilgiler; barındırma, veri tabanı, dosya depolama, e-posta, güvenlik, muhasebe ve ödeme
          hizmetlerinin yürütülmesi için gerekli olduğu ölçüde hizmet sağlayıcılarla paylaşılabilir.
          Ayrıca mevzuat gerektirdiğinde yetkili kamu kurum ve kuruluşlarına aktarılabilir. Hizmet
          sağlayıcıların yurt dışında bulunması hâlinde KVKK’nın yurt dışına aktarıma ilişkin hükümleri
          ve uygun güvenceler gözetilir.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>6. Saklama ve güvenlik</h2>
        <p>
          Bilgiler işleme amacının gerektirdiği veya mevzuatta belirtilen süre boyunca saklanır. Dernek;
          yetkisiz erişim, kayıp, kötüye kullanım ve değişikliğe karşı erişim sınırlaması, güvenli
          bağlantı, yetkilendirme ve benzeri makul teknik ve idari tedbirleri uygular. İnternet üzerinden
          hiçbir aktarım yönteminin mutlak güvenlik sağlayamayacağı da dikkate alınmalıdır.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>7. Üçüncü taraf bağlantıları</h2>
        <p>
          Site, üçüncü taraf internet sitelerine bağlantı verebilir. Bu sitelerin içerik ve gizlilik
          uygulamaları Derneğin kontrolünde değildir. Bağlantı verilen sitelerin politikalarını ayrıca
          incelemenizi öneririz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>8. Haklarınız ve iletişim</h2>
        <p>
          Kişisel verilerinize ilişkin haklarınız ve başvuru yöntemleri için{" "}
          <Link href="/kvkk" className={legalLinkClass}>
            KVKK Aydınlatma Metni
          </Link>{" "}
          sayfasını inceleyebilirsiniz. Sorularınızı [DERNEK İLETİŞİM E-POSTASI] adresine veya [DERNEK
          ADRESİ] adresine iletebilirsiniz.
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
