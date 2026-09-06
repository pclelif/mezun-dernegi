import { legalListClass } from "./legal-page";

export function DataRecipients() {
  return <>
    <ul className={legalListClass}>
      <li><strong>Vercel — site barındırma:</strong> Siteye erişirken kullanılan IP adresi, istek zamanı, URL, tarayıcı ve istek bilgileri, sayfaların sunulması ve teknik güvenlik amacıyla işlenir.</li>
      <li><strong>Supabase — veritabanı, yönetici oturumu ve dosyalar:</strong> İletişim formu kayıtları, yönetici hesap/oturum verileri ve yayımlanan görseller, kayıt saklama, yetkilendirme ve içerik sunumu amacıyla işlenir. Projenin veritabanı bölgesi Frankfurt, Almanya’dır. Bu bölge seçimi destek, yedekleme ve alt hizmet sağlayıcı işlemlerinin yalnızca Almanya’da gerçekleştiği anlamına gelmez.</li>
      <li><strong>Google / Gmail — e-posta:</strong> Dernek adreslerine gönderilen e-postalar, gönderen ve alıcı bilgileri ile ekler, yazışma ve üyelik başvurusunun iletilmesi amacıyla işlenir. Adli sicil belgesi e-postayla gönderildiğinde bu aktarımın kapsamına girer.</li>
      <li><strong>Google Maps — harita:</strong> İletişim sayfasındaki gömülü harita yüklendiğinde IP adresi, tarayıcı ve istek bilgileri Google’a iletilebilir. Harita hizmeti Google Analytics’ten ayrıdır.</li>
      <li><strong>Bankalar ve yetkili kamu kurumları:</strong> Ödeme işlemleri ve kanuni bildirimler için gerekli kimlik, üyelik ve işlem bilgileri, ilgili işlemin ve kanuni yükümlülüğün sınırları içinde aktarılır.</li>
    </ul>
    <p>Vercel ve Supabase altyapısı ile Google hizmetleri üzerinden yapılan işlemler yurt dışına veri aktarımı içerebilir. Bu aktarımlar, kişisel verinin işlenmesine ilişkin hukuki sebepten ayrı olarak KVKK’nın 9’uncu maddesine tabidir. Verilerinizin aktarıldığı alıcıları ve aktarımın hukuki dayanağını Derneğe başvurarak öğrenebilirsiniz.</p>
  </>;
}

export function RetentionDetails() {
  return <>
    <ul className={legalListClass}>
      <li><strong>İletişim talepleri:</strong> Talebin yanıtlanması ve takibi için gerekli süre esas alınır. Sonuçlanmış bir talep yalnızca belirli bir hukuki yükümlülük veya somut uyuşmazlığın gerektirdiği ölçüde tutulabilir; sırf ileride yararlı olabilir düşüncesiyle süresiz saklanamaz.</li>
      <li><strong>Üyelik kayıtları:</strong> Üyelik ilişkisinin yürütülmesi, kanuni kayıt ve bildirimler ile üyeliğin sona ermesinden sonra devam eden somut yükümlülükler esas alınır. Başvurunun kabulü, reddi veya geri çekilmesi ayrı değerlendirilir; başvuru ekleri ile üye kayıt defteri aynı saklama kategorisi değildir.</li>
      <li><strong>Mali belgeler:</strong> Dernekler Yönetmeliği’nin 39’uncu maddesi kapsamındaki alındı, harcama ve diğer belgelerde, özel kanunlardaki süreler saklı olmak üzere beş yıllık saklama kuralı uygulanır. Bu süre defterler veya bütün kişisel veriler için genel bir süre değildir.</li>
      <li><strong>Adli sicil belgeleri:</strong> Üyelik kaydı ile belgenin kendisi ayrı veri gruplarıdır. Üyelik kaydının tutulması, adli sicil belgesinin tamamının aynı süreyle saklanmasını kendiliğinden gerektirmez. Belgeye ilişkin saklama ve silme taleplerinizi üyelik birimine veya Derneğin KVKK başvuru adresine iletebilirsiniz.</li>
      <li><strong>Görseller ve teknik kayıtlar:</strong> İlgili yayın amacı, geçerli işleme şartı, güvenlik olayının takibi ve hizmet sağlayıcının kayıt/yedek döngüsü ayrı ayrı dikkate alınır. Yayının sona ermesi ve hukuki sebebin ortadan kalkması saklama ihtiyacının yeniden değerlendirilmesini gerektirir.</li>
    </ul>
    <p>İşleme şartları ortadan kalktığında KVKK’nın 7’nci maddesi uyarınca silme, yok etme veya anonimleştirme gerekir. Değerlendirme yalnızca ana kaydı değil; e-posta eklerini, indirilmiş dosyaları, fiziksel kopyaları ve yedekleri de kapsar. Bir uyuşmazlık nedeniyle tutulması gereken kayıtlar, bu amaç için gerekli olanlarla sınırlı olmalıdır. Verileriniz için uygulanan süreyi ve imha işlemlerini Derneğe sorabilir, silme veya düzeltme talebinde bulunabilirsiniz.</p>
  </>;
}
