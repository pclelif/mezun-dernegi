import { DataRecipients, RetentionDetails } from "@/components/legal/data-processing-details";
import { legalAddress } from "@/config/legal";
import type { Metadata } from "next";
import {
  LegalPage,
  legalHeadingClass,
  legalListClass,
  legalSectionClass,
} from "@/components/legal/legal-page";
import { associationName } from "@/config/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${associationName} kişisel verilerin işlenmesine ilişkin aydınlatma metni.`,
  alternates: {
    canonical: "/kvkk",
  },
};

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      description="Kişisel verilerinizin hangi amaçlarla ve hukuki sebeplerle işlendiğine ilişkin bilgilendirme."
    >
      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>1. Veri sorumlusu</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu,{" "}
          <strong>{associationName}</strong>’dir (“Dernek”).
        </p>
        <ul className={legalListClass}>
          <li>Adres: <strong>{legalAddress}</strong></li>
          <li>E-posta: <strong>kaaflmezunder@gmail.com</strong></li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>2. İşlenen kişisel veriler</h2>
        <p>Dernek ile ilişkinize bağlı olarak aşağıdaki veri kategorileri işlenebilir:</p>
        <ul className={legalListClass}>
          <li>Kimlik bilgileri: ad, soyad, T.C. kimlik numarası, doğum tarihi ve imza.</li>
          <li>İletişim bilgileri: telefon numarası, e-posta adresi, adres ile iletişim formu üzerinden iletilen konu ve mesaj içerikleri.</li>
          <li>Üyelik bilgileri: mezuniyet yılı, üyelik başvurusu, üyelik durumu ve kurul görevi.</li>
          <li>Finansal bilgiler: aidat veya bağış ödemelerine ilişkin dekont ve işlem bilgileri.</li>
          <li>Görsel ve işitsel kayıtlar: etkinlik fotoğrafları ile açık rızaya tabi tanıtım içerikleri.</li>
          <li>İşlem güvenliği bilgileri: internet sitesi erişim, oturum ve güvenlik kayıtları.</li>
        </ul>
        <p>
          Dernek üyeliğini ortaya koyan bilgiler KVKK’nın 6’ncı maddesi kapsamında özel nitelikli
          kişisel veridir. Adli sicil belgesindeki ceza mahkûmiyeti ve güvenlik tedbiri bilgileri de
          özel niteliklidir. Bu veriler bakımından yalnızca genel nitelikli verilere ilişkin
          “meşru menfaat” veya “sözleşme” gerekçesine dayanılması yeterli değildir.
        </p>
        <p>
          Site üzerinde adli sicil belgesi yükleme alanı yoktur. Üyelik başvuru sayfası belgeyi,
          diğer başvuru ekleriyle birlikte kaaflmezunderuyelik@gmail.com adresine e-postayla
          iletmenizi istemektedir. E-postayla alınması, belgenin Dernek tarafından işlenmediği
          anlamına gelmez.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>3. İşleme amaçları ve hukuki sebepler</h2>
        <ul className={legalListClass}>
          <li><strong>İletişim talepleri:</strong> Ad soyad, e-posta, konu ve mesaj, talebi değerlendirmek ve yanıtlamak için işlenir. Genel iletişim taleplerinde KVKK m.5/2-f kapsamındaki, temel hakları zedelemeyen meşru menfaat; bir hakkın kullanılması veya uyuşmazlık takibinde m.5/2-e esas alınır.</li>
          <li><strong>Üyelik başvurusu ve kayıt:</strong> Kimlik, iletişim, mezuniyet, başvuru ve üyelik durumu bilgileri, başvuruyu değerlendirmek ve kanuni üye kayıt ve bildirimlerini yürütmek için işlenir. Kanunun zorunlu kıldığı genel veri işlemlerinde m.5/2-a ve ç; üyeliği gösteren özel nitelikli kayıtların kanunda açıkça öngörülen işlemlerinde m.6/3-b, 5253 sayılı Dernekler Kanunu’nun ilgili kayıt ve bildirim hükümleriyle birlikte değerlendirilir. Bu dayanak bütün başvuru eklerini sınırsız işlemeye izin vermez.</li>
          <li><strong>Aidat ve bağış:</strong> Ödeyenin kimliği, tutar, tarih, dekont ve işlem bilgileri, ödemenin kaydı ve kanuni mali belgelendirme için m.5/2-ç; somut bir hak veya uyuşmazlığın korunması için m.5/2-e kapsamında işlenir. Sitede kartla ödeme alanı bulunmaz; banka işlemi ilgili bankanın kanalı üzerinden gerçekleşir.</li>
          <li><strong>Yönetici erişimi ve güvenlik:</strong> Yönetici hesap/oturum bilgileri ve teknik erişim kayıtları, yetkili erişimi sağlamak, kötüye kullanımı tespit etmek ve sistemi korumak için m.5/2-f kapsamında işlenir. Sitede yönetici işlemleri sunucu tarafında oturum ve admin rolü kontrolüne tabidir.</li>
          <li><strong>Etkinlik görselleri:</strong> Tanıtım amacıyla yayımlanan fotoğraf/video için uygun başka bir işleme şartı bulunmuyorsa, belirli yayın ve kullanım amaçlarını kapsayan ayrı açık rıza gerekir. Etkinliğe katılım veya bu metni okuma kendiliğinden yayın izni sayılmaz.</li>
        </ul>
        <p>
          Üyelik başvurusunda istenen belgeler, Dernek tüzüğünün 7’nci maddesi çerçevesinde
          yönetim kurulunca belirlenen başvuru listesinde yer alır. Adli sicil belgesi,
          bu listede üyelik değerlendirmesi için istenen belgeler arasındadır; site üzerinden
          yüklenmez, üyelik e-posta adresine iletilir. Bu metni okumak veya e-posta göndermek,
          özel nitelikli verilerin işlenmesine kendiliğinden açık rıza oluşturmaz.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>4. Toplama yöntemi</h2>
        <p>
          Kişisel veriler; üyelik ve iletişim formları, e-posta, telefon, elden teslim edilen belgeler,
          banka kayıtları, etkinlik katılımı ve internet sitesi üzerinden otomatik veya otomatik olmayan
          yöntemlerle toplanabilir.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>5. Kişisel verilerin aktarılması</h2>
        <DataRecipients />
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>6. Saklama süresi ve güvenlik</h2>
        <RetentionDetails />
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>7. KVKK’nın 11’inci maddesi kapsamındaki haklarınız</h2>
        <p>Derneğe başvurarak kişisel verileriniz hakkında aşağıdaki hakları kullanabilirsiniz:</p>
        <ul className={legalListClass}>
          <li>İşlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme.</li>
          <li>İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme.</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.</li>
          <li>Eksik ya da yanlış işlenmiş verilerin düzeltilmesini isteme.</li>
          <li>KVKK’nın 7’nci maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme.</li>
          <li>Düzeltme, silme veya yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme.</li>
          <li>İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucunda aleyhinize bir sonucun ortaya çıkmasına itiraz etme.</li>
          <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme.</li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>8. Başvuru yöntemi</h2>
        <p>
          Taleplerinizi kimliğinizi doğrulayan bilgiler ve talebinizin açıklamasıyla birlikte{" "}
          <strong>{legalAddress}</strong> adresine yazılı
          olarak veya <strong>kaaflmezunder@gmail.com</strong> adresine iletebilirsiniz.
          Başvurular, niteliğine göre en kısa sürede ve en geç 30 gün içinde sonuçlandırılır.
        </p>
      </section>
    </LegalPage>
  );
}
