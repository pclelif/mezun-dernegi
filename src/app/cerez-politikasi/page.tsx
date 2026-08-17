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
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Çerez Politikası"
      description="İnternet sitemizde kullanılan çerezler ve bunlara ilişkin tercihlerinize dair bilgilendirme."
    >
      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>1. Çerez nedir?</h2>
        <p>
          Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınız aracılığıyla cihazınıza
          kaydedilen küçük metin dosyalarıdır. Çerezler sitenin çalışmasını, güvenli oturumların
          sürdürülmesini ve tercihlerin hatırlanmasını sağlayabilir.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>2. Veri sorumlusu</h2>
        <p>
          Bu internet sitesindeki çerezler bakımından veri sorumlusu{" "}
          <strong>{associationName}</strong>’dir (“Dernek”).
        </p>
        <ul className={legalListClass}>
          <li>Adres: <strong>Kızılay Mahallesi Fevzi Çakmak-2 Sokak No:33/4 Çankaya/Ankara</strong></li>
          <li>E-posta: <strong>kaaflmezunder@gmail.com</strong></li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>3. Kullanılan çerez türleri</h2>
        <h3 className={legalSubheadingClass}>Zorunlu çerezler</h3>
        <p>
          Sitenin temel işlevleri, güvenliği ve yönetici oturumunun sürdürülebilmesi için gereklidir.
          Bu çerezler olmadan ilgili hizmetler sağlıklı çalışmayabilir ve kullanımları için ayrıca
          rıza aranmayabilir.
        </p>
        <h3 className={legalSubheadingClass}>İşlevsel çerezler</h3>
        <p>
          Dil veya görünüm gibi tercihleri hatırlamak için kullanılabilir. Bu tür çerezler devreye
          alınırsa, gerekli olduğu durumlarda tercihiniz veya açık rızanız alınır.
        </p>
        <h3 className={legalSubheadingClass}>Performans ve analitik çerezleri</h3>
        <p>
          Site kullanımını toplu olarak anlamaya ve hizmeti geliştirmeye yardımcı olabilir. Zorunlu
          olmayan analitik çerezler, kullanılmaları hâlinde onayınız alınmadan etkinleştirilmez.
        </p>
        <h3 className={legalSubheadingClass}>Reklam ve pazarlama çerezleri</h3>
        <p>
          Dernek sitesi hâlihazırda kişiselleştirilmiş reklam amacıyla çerez kullanmayı hedeflemez.
          Böyle bir kullanım başlatılırsa bu politika güncellenir ve gerekli rıza mekanizması sağlanır.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>4. Çerezlerin kullanım amaçları</h2>
        <ul className={legalListClass}>
          <li>Sayfaların ve temel site özelliklerinin doğru çalışmasını sağlamak.</li>
          <li>Yetkili yönetici oturumlarını doğrulamak ve güvenliği korumak.</li>
          <li>Kötüye kullanım ve yetkisiz erişim girişimlerini tespit etmek.</li>
          <li>İzin verilmesi hâlinde site performansını ve kullanıcı deneyimini geliştirmek.</li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>5. Çerezlerin saklama süresi</h2>
        <p>
          Oturum çerezleri tarayıcınızı kapattığınızda silinir. Kalıcı çerezler ise amaçları için gerekli
          olan süre veya ilgili çerez üzerinde tanımlanan süre boyunca cihazınızda tutulur. Saklama
          süreleri mümkün olan en kısa süreyle sınırlandırılır.
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
          <strong>Kızılay Mahallesi Fevzi Çakmak-2 Sokak No:33/4 Çankaya/Ankara</strong> adresine veya{" "}
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
