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
  title: "Kullanım Koşulları",
  description: `${associationName} internet sitesi kullanım koşulları.`,
  alternates: {
    canonical: "/kullanim-kosullari",
  },
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      description="İnternet sitesinin kullanımına ilişkin kurallar, haklar ve sorumluluklar."
    >
      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>1. İşleten ve kapsam</h2>
        <p>
          Bu internet sitesi <strong>{associationName}</strong> (“Dernek”) tarafından işletilmektedir.
          Bu koşullar, sitedeki hizmetlerin kapsamını ve tarafların sorumluluklarını açıklar.
          Siteyi ziyaret etmeniz tek başına bir sözleşme kabulü, üyelik başvurusu veya kişisel verilerin
          işlenmesine açık rıza anlamına gelmez. Ayrı bir kabul gerektiren işlemlerde ilgili koşullar
          işlemden önce sunulur.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>2. Sitenin amacı</h2>
        <p>
          Site; Derneğin faaliyetleri, etkinlikleri, duyuruları, üyelik süreçleri, aidat ve bağış
          bilgileri hakkında kamuoyunu ve mezunları bilgilendirmek amacıyla sunulur. Sitedeki içerikler
          genel bilgilendirme niteliğindedir ve tek başına resmî belge, taahhüt veya hukuki görüş
          oluşturmaz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>3. Kullanıcı yükümlülükleri</h2>
        <p>Siteyi kullanırken:</p>
        <ul className={legalListClass}>
          <li>Yürürlükteki mevzuata, kamu düzenine ve genel ahlaka uygun davranmayı,</li>
          <li>Yanlış, yanıltıcı veya başkasına ait bilgileri paylaşmamayı,</li>
          <li>Sitenin güvenliğini, çalışmasını veya diğer kullanıcıları olumsuz etkilememeyi,</li>
          <li>Yetkisiz erişim, otomatik veri çekme, zararlı yazılım veya benzeri girişimlerde bulunmamayı,</li>
          <li>Üçüncü kişilerin kişilik, gizlilik ve fikri mülkiyet haklarını ihlal etmemeyi</li>
        </ul>
        <p>kabul edersiniz.</p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>4. Üyelik işlemleri</h2>
        <p>
          İnternet sitesinde yer alan üyelik bilgileri başvuru sürecini kolaylaştırmak amacıyla
          sunulur. Üyelik, gerekli belgelerin teslimi ve Dernek tarafından ilgili mevzuat ile tüzük
          uyarınca yapılacak değerlendirme sonucunda kesinleşir. Form gönderimi tek başına üyelik hakkı
          doğurmaz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>5. Aidat ve bağışlar</h2>
        <p>
          Dernek, yayımladığı banka hesap bilgilerini doğru ve güncel tutmak ve tespit edilen hataları
          düzeltmekle sorumludur. Ödeme öncesinde alıcı unvanını ve IBAN’ı kontrol etmeniz; bir
          tutarsızlık varsa ödeme yapmadan Dernekle iletişim kurmanız önerilir. Bu kontrol önerisi,
          Derneğin yanlış veya güncel olmayan bilgi yayımlamasından doğan hukuki sorumluluğunu ortadan
          kaldırmaz. Bağışlar gönüllüdür. Aidat tutarları ve dönemleri mevzuata, tüzüğe ve yetkili organ
          kararlarına göre belirlenir; değişiklikler ilgili dönemiyle birlikte duyurulur.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>6. Fikri mülkiyet hakları</h2>
        <p>
          Site tasarımı, metinler, logolar, fotoğraflar, videolar ve diğer içerikler üzerindeki haklar
          Derneğe veya ilgili hak sahiplerine aittir. İçerikler, kanunun izin verdiği hâller dışında
          Derneğin yazılı izni olmadan ticari amaçla çoğaltılamaz, değiştirilemez, yayımlanamaz veya
          dağıtılamaz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>7. Üçüncü taraf hizmet ve bağlantıları</h2>
        <p>
          Sitede üçüncü taraf sitelere veya hizmetlere bağlantılar bulunabilir. Bu bağlantılar kolaylık
          amacıyla sunulur. Bağlantı verilen hizmetlerin kendi koşulları ve gizlilik politikaları
          geçerlidir. Derneğin kendi hizmet seçimi, veri aktarımı ve mevzuattan kaynaklanan
          yükümlülükleri devam eder.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>8. Hizmetin sunumu ve sorumluluğun sınırı</h2>
        <p>
          Dernek, sitenin kesintisiz veya hatasız çalışacağını garanti etmez. Bakım, güvenlik, teknik
          arıza veya mücbir sebeplerle site geçici olarak kullanılamayabilir. Dernek, kendisinden
          beklenen özeni göstermek ve tespit edilen hataları gidermekle yükümlüdür. Tarafların
          sorumluluğu somut olay ve uygulanacak mevzuata göre belirlenir; bu metin kanuni başvuru
          ve tazminat haklarını sınırlandırmaz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>9. Kişisel veriler</h2>
        <p>
          Kişisel verilerin işlenmesine ilişkin ayrıntılar için{" "}
          <Link href="/kvkk" className={legalLinkClass}>
            KVKK Aydınlatma Metni
          </Link>
          ,{" "}
          <Link href="/gizlilik-politikasi" className={legalLinkClass}>
            Gizlilik Politikası
          </Link>{" "}
          ve{" "}
          <Link href="/cerez-politikasi" className={legalLinkClass}>
            Çerez Politikası
          </Link>{" "}
          sayfalarını inceleyebilirsiniz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>10. Değişiklikler, uygulanacak hukuk ve iletişim</h2>
        <p>
          Dernek bu koşulları mevzuat veya hizmetlerdeki değişikliklere göre güncelleyebilir. Güncel
          koşullar yayımlandığı tarihte yürürlüğe girer. Koşullara Türk hukuku uygulanır ve uyuşmazlıklarda
          kanunen yetkili Türk mahkemeleri ve icra daireleri yetkilidir.
        </p>
        <p>
          Sorularınız için <strong>kaaflmezunder@gmail.com</strong> veya{" "}
          <strong>{legalAddress}</strong> üzerinden Dernek
          ile iletişim kurabilirsiniz.
        </p>
      </section>
    </LegalPage>
  );
}
