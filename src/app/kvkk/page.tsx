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
          <li>Adres: [DERNEK ADRESİ]</li>
          <li>E-posta: [DERNEK İLETİŞİM E-POSTASI]</li>
          <li>Telefon: [DERNEK TELEFON NUMARASI]</li>
        </ul>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>2. İşlenen kişisel veriler</h2>
        <p>Dernek ile ilişkinize bağlı olarak aşağıdaki veri kategorileri işlenebilir:</p>
        <ul className={legalListClass}>
          <li>Kimlik bilgileri: ad, soyad, T.C. kimlik numarası, doğum tarihi ve imza.</li>
          <li>İletişim bilgileri: telefon numarası, e-posta adresi ve adres.</li>
          <li>Üyelik bilgileri: mezuniyet, üyelik başvurusu, üyelik durumu ve kurul görevi.</li>
          <li>Finansal bilgiler: aidat veya bağış ödemelerine ilişkin dekont ve işlem bilgileri.</li>
          <li>Görsel ve işitsel kayıtlar: etkinlik fotoğrafları ile açık rızaya tabi tanıtım içerikleri.</li>
          <li>İşlem güvenliği bilgileri: internet sitesi erişim, oturum ve güvenlik kayıtları.</li>
        </ul>
        <p>
          Özel nitelikli kişisel veriler yalnızca mevzuatın izin verdiği veya açık rızanızın bulunduğu
          hâllerde, amaçla sınırlı olarak işlenir.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>3. İşleme amaçları ve hukuki sebepler</h2>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:</p>
        <ul className={legalListClass}>
          <li>Üyelik başvurularının alınması, değerlendirilmesi ve üyelik kayıtlarının tutulması.</li>
          <li>Dernek faaliyetleri, genel kurul, etkinlik ve duyurular hakkında iletişim kurulması.</li>
          <li>Aidat ve bağış süreçlerinin yürütülmesi, muhasebe ve yasal kayıtların tutulması.</li>
          <li>Dernek tüzüğü ve ilgili mevzuattan doğan yükümlülüklerin yerine getirilmesi.</li>
          <li>Bilgi ve sistem güvenliğinin sağlanması ile taleplerin cevaplandırılması.</li>
        </ul>
        <p>
          Veriler; KVKK’nın 5 ve 6’ncı maddelerinde yer alan kanunlarda açıkça öngörülme, hukuki
          yükümlülüğün yerine getirilmesi, bir hakkın tesisi veya korunması, sözleşmenin kurulması ya
          da ifası ve temel haklara zarar vermemek kaydıyla meşru menfaat hukuki sebeplerine dayanılarak
          işlenir. Bu sebeplerin bulunmadığı işlemlerde açık rızanız alınır.
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
        <p>
          Verileriniz; hukuki yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurumlarına,
          bankalara, mali müşavirlere ve yalnızca gerekli olduğu ölçüde barındırma, e-posta, güvenlik ve
          bilişim hizmeti sağlayıcılarına aktarılabilir. Yurt dışına aktarım gereken hâllerde KVKK’nın
          9’uncu maddesindeki şartlar ve uygun güvenceler uygulanır.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>6. Saklama süresi ve güvenlik</h2>
        <p>
          Kişisel veriler, ilgili mevzuatta öngörülen süre veya işleme amacının gerektirdiği süre boyunca
          saklanır; sürenin sonunda silinir, yok edilir ya da anonim hâle getirilir. Dernek, verilere
          yetkisiz erişimi ve hukuka aykırı işlemeyi önlemek için uygun idari ve teknik tedbirleri alır.
        </p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>7. KVKK’nın 11’inci maddesi kapsamındaki haklarınız</h2>
        <p>Derneğe başvurarak kişisel verileriniz hakkında:</p>
        <ul className={legalListClass}>
          <li>İşlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme,</li>
          <li>İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme,</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
          <li>Eksik ya da yanlış işlenmiş verilerin düzeltilmesini isteme,</li>
          <li>Kanuni şartları oluştuğunda silinmesini veya yok edilmesini isteme,</li>
          <li>Otomatik analiz sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
          <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme</li>
        </ul>
        <p>haklarına sahipsiniz.</p>
      </section>

      <section className={legalSectionClass}>
        <h2 className={legalHeadingClass}>8. Başvuru yöntemi</h2>
        <p>
          Taleplerinizi kimliğinizi doğrulayan bilgiler ve talebinizin açıklamasıyla birlikte [DERNEK
          ADRESİ] adresine yazılı olarak veya [DERNEK İLETİŞİM E-POSTASI] adresine iletebilirsiniz.
          Başvurular, niteliğine göre en kısa sürede ve en geç 30 gün içinde sonuçlandırılır.
        </p>
      </section>
    </LegalPage>
  );
}
