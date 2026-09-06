import { legalAddress } from "@/config/legal";
import type { Metadata } from "next";
import {
  LegalPage,
  legalHeadingClass,
  legalListClass,
  legalSectionClass,
  legalSubheadingClass,
} from "@/components/legal/legal-page";
import { associationName } from "@/config/site";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: `${associationName} internet sitesi çerez politikası.`,
  alternates: {
    canonical: "/cerez-politikasi",
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Çerez Politikası"
      description="İnternet sitemizde kullanılan çerezler ve bunlara ilişkin tercihlerinize dair bilgilendirme."
    >
      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>1. Çerez ve yerel depolama nedir?</h2>
        <p>
          Çerezler ve yerel depolama araçları (localStorage), ziyaret ettiğiniz internet siteleri tarafından
          tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyaları veya verilerdir. Bu teknolojiler
          sitenin güvenli çalışmasını, yönetici oturumlarının sürdürülmesini ve kullanıcı tercihlerinin
          hatırlanmasını sağlayabilir. Bu sitede genel ziyaretçi hesabı bulunmaz; oturum çerezleri yönetici girişiyle ilgilidir.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>2. Veri sorumlusu</h2>
        <p>
          Bu internet sitesindeki çerezler bakımından veri sorumlusu{" "}
          <strong>{associationName}</strong>’dir (“Dernek”).
        </p>
        <ul className={legalListClass}>
          <li>Adres: <strong>{legalAddress}</strong></li>
          <li>E-posta: <strong>kaaflmezunder@gmail.com</strong></li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>3. Kullanılan çerez ve depolama türleri</h2>
        <h3 className={legalSubheadingClass}>Zorunlu çerezler ve yerel depolama</h3>
        <p>
          Sitenin temel işlevleri, güvenliği ve yönetici
          oturumunun sürdürülebilmesi için gereklidir. Bu araçlar olmadan ilgili hizmetler sağlıklı çalışmayabilir
          ve kullanımları için ayrıca rıza aranmayabilir.
        </p>
        <h3 className={legalSubheadingClass}>İşlevsel çerezler</h3>
        <p>
          cookieConsent kaydı, bildirimdeki kabul/ret tercihinizi cihazınızda saklar ve bildirimin
          yeniden gösterilmesini önler. Bu tercih Google Analytics’i başlatmaz ve Google Maps
          bileşeninin yüklenmesini değiştirmez. Bu kayıt tarayıcı ayarlarından silinebilir.
        </p>
        <h3 className={legalSubheadingClass}>Üçüncü taraf harita bileşenleri</h3>
        <p>
          İletişim sayfasında yer alan Google Maps harita bileşeni, sayfa yüklendiğinde hizmetin sunulması
          amacıyla harici teknik çerezler veya erişim kayıtları oluşturabilir.
        </p>
        <h3 className={legalSubheadingClass}>Performans, analitik ve reklam çerezleri</h3>
        <p>
          Sitemizde Google Analytics kullanılmaz. Analytics ölçüm kodu yüklenmez ve
          Google Analytics’e ziyaret verisi gönderilmez.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>4. Çerezlerin kullanım amaçları</h2>
        <ul className={legalListClass}>
          <li>Sayfaların ve temel site özelliklerinin doğru çalışmasını sağlamak.</li>
          <li>Yetkili yönetici oturumlarını doğrulamak ve güvenliği korumak.</li>
          <li>İletişim sayfasındaki harita bileşeninin sorunsuz görüntülenmesini sağlamak.</li>
          <li>Kötüye kullanım ve yetkisiz erişim girişimlerini tespit etmek.</li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>5. Çerezlerin saklama süresi</h2>
        <p>
          Yönetici oturumunda kullanılan Supabase çerezleri, erişim ve oturum yenileme bilgilerinin
          saklanmasını sağlar. Çerezin tarayıcıda saklanma süresi ile oturumun sunucuda geçerli olduğu
          süre aynı değildir; tarayıcıyı kapatmak her zaman oturumu sonlandırmaz. Oturumdan çıkış
          ilgili istemci oturumunu temizler. Çerezlerin son kullanma tarihlerini tarayıcınızın site
          verileri bölümünde görebilirsiniz. Yerel depolama (localStorage) kayıtlarının süresi kendiliğinden
          dolmaz; uygulama veya kullanıcı tarafından silinene kadar kalabilir.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>6. Çerez tercihlerini yönetme</h2>
        <p>
          Tarayıcı ayarlarınızdan çerezleri görüntüleyebilir, silebilir veya engelleyebilirsiniz. Zorunlu
          çerezlerin engellenmesi sitenin ya da yönetim panelinin bazı bölümlerinin çalışmamasına neden
          olabilir. Tarayıcınızın yardım menüsünden güncel yönetim adımlarına ulaşabilirsiniz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>7. Kişisel veriler ve haklarınız</h2>
        <p>
          Çerezler yoluyla kişisel veri işlenmesi hâlinde işlemler 6698 sayılı KVKK’ya uygun yürütülür.
          KVKK’nın 11’inci maddesindeki haklarınıza ilişkin taleplerinizi{" "}
          <strong>{legalAddress}</strong> adresine veya{" "}
          <strong>kaaflmezunder@gmail.com</strong> adresine iletebilirsiniz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>8. Güncellemeler</h2>
        <p>
          Kullanılan teknolojiler veya mevzuat değiştiğinde bu politika güncellenebilir. Güncel metin,
          internet sitesinde yayımlandığı tarihte yürürlüğe girer.
        </p>
      </section>
    </LegalPage>
  );
}
