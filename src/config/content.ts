export type ContentField = {
  key: string;
  label: string;
  help?: string;
  type?: "text" | "textarea" | "url" | "email" | "tel" | "image";
  rows?: number;
};

export type ContentSection = {
  title: string;
  description: string;
  fields: ContentField[];
  defaults: Record<string, string>;
};

export const contentSections = {
  "ana-sayfa": {
    title: "Ana Sayfa",
    description: "Site logosunu, hero arka plan görselini ve açıklama metnini buradan yönetin.",
    fields: [
      { key: "logo_url", label: "Site logosu", type: "image", help: "Sitenin ve yönetim panelinin logosunu buradan yükleyin veya değiştirin." },
      { key: "hero_image_url", label: "Arka plan görseli", type: "image", help: "Ana sayfa hero bölümündeki arka plan görselini buradan değiştirin." },
      { key: "hero_description", label: "Açıklama metni", type: "textarea", rows: 3 },
    ],
    defaults: {
      logo_url: "/logo-dernek.jpg",
      hero_title: "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği",
      hero_description: "Bir okul. Binlerce hikâye. Tek bir aile.\n\nGeçmişimizin değerlerini koruyor, geleceğe yönelik yeni adımlar atıyoruz.",
      hero_image_url: "/hero-bg.jpg",
    },
  },
  hakkimizda: {
    title: "Hakkımızda",
    description: "Hakkımızda menüsündeki dernek bilgisi, vizyon-misyon, başkan mesajı ve tüzüğü yönetin. Aydoğan Aydın sayfası tamamlanmış sabit içeriktir.",
    fields: [
      { key: "charter_url", label: "Dernek tüzüğü", type: "url", help: "Güncel tüzük PDF’sini buradan yükleyin veya değiştirin." },
      { key: "about_title", label: "Hakkımızda başlığı" }, { key: "about_text", label: "Dernek hakkında", type: "textarea", rows: 8 },
      { key: "vision", label: "Vizyon", type: "textarea", rows: 6 }, { key: "mission", label: "Misyon", type: "textarea", rows: 6 },
      { key: "president_message", label: "Başkanın mesajı", type: "textarea", rows: 10 }, { key: "president_image_url", label: "Başkan fotoğrafı", type: "image" },
    ],
    defaults: { about_title: "GEÇMİŞİN GÜÇLÜ TEMELLERİYLE GELECEĞE UZANAN KÖPRÜ", about_text: "Mezunlarımızı bir araya getiriyor, okulumuzla olan bağımızı ve birbirimizle olan iletişimimizi canlı tutuyoruz.", vision: "Okulumuzla bağını sürdüren, mezunlarımız arasında dayanışmanın güçlendiği ve iletişimin güçlü olduğu bir mezun topluluğu oluşturmak.", mission: "Bu doğrultuda mezunlarımızı bir araya getirmek, iletişim ve dayanışmayı desteklemek.", president_message: "Değerli Mezunlarımız,\n\nOkulumuzda başlayan ortak hikâyemizi mezuniyet sonrasında da dayanışma, paylaşım ve aidiyet duygusuyla sürdürmek için bir aradayız. Derneğimizin; mezunlarımız arasında güçlü bağlar kuran, öğrencilerimize destek olan ve okulumuzun değerlerini geleceğe taşıyan canlı bir buluşma noktası olmasını amaçlıyoruz.\n\nHer mezunumuzun katkısı ve katılımı bu yapıyı daha güçlü kılacaktır. Birlikte üreteceğimiz çalışmaların mezun topluluğumuza ve okulumuza kalıcı değer katacağına inanıyor, hepinizi sevgi ve saygıyla selamlıyorum.", president_image_url: "", charter_url: "" },
  },
  uyelik: {
    title: "Üyelik Bilgileri", description: "Üyelik sayfasının giriş açıklamasını ve indirilebilir üyelik formunu yönetin. Aidat ve banka bilgileri ayrı bölümde yönetilir.",
    fields: [
      { key: "intro", label: "Sayfa açıklaması", type: "textarea", rows: 3 },
      { key: "form_url", label: "Üyelik formu bağlantısı", type: "url" },
    ],
    defaults: { intro: "Derneğimize katılmak için izlenecek adımlar.", form_url: "/UYE_KAYIT_FORMU.pdf" },
  },
  "aidat-bagis": {
    title: "Aidat ve Bağış",
    description: "Aidat, bağış ve banka hesap bilgilerini web sitesinde görüneceği biçimde yönetin.",
    fields: [
      { key: "annual_dues", label: "Yıllık aidat bilgisi", type: "textarea", rows: 4 },
      { key: "donation", label: "Bağış bilgisi", type: "textarea", rows: 4 },
      { key: "bank_name", label: "Banka adı" }, { key: "account_name", label: "Hesap sahibi" },
      { key: "iban", label: "IBAN" }, { key: "payment_note", label: "Ödeme açıklaması", type: "textarea", rows: 3 },
    ],
    defaults: { annual_dues: "Üyelik aidatı her dönem 300 TL olmak üzere yılda 4 dönem üzerinden ödenmektedir.", donation: "Derneğimize destek olmak için aynı IBAN numarasına “Bağış” açıklaması ile dilediğiniz tutarda katkıda bulunabilirsiniz.", bank_name: "Ziraat Bankası", account_name: "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği", iban: "TR91 0001 0016 8398 3927 3550 01", payment_note: "" },
  },
  iletisim: {
    title: "İletişim", description: "İletişim kartını, Google Maps konumunu ve sosyal medya hesaplarını yönetin. Boş bırakılan bilgiler sitede gösterilmez.",
    fields: [
      { key: "address", label: "Adres", type: "textarea", rows: 3 },
      { key: "phone", label: "Telefon (opsiyonel)", type: "tel", help: "Şimdilik boş bırakabilirsiniz. Numara eklenince sitede otomatik görünür." },
      { key: "email", label: "E-posta", type: "email" },
      { key: "secondary_email", label: "İkinci e-posta (opsiyonel)", type: "email" },
      { key: "map_location", label: "Google Maps konumu", help: "Haritada aranacak açık adresi veya işletme adını yazın." },
      { key: "map_url", label: "Google Maps bağlantısı (opsiyonel)", type: "url", help: "Google Maps’ten aldığınız paylaşım bağlantısını buraya yapıştırabilirsiniz." },
      { key: "instagram_url", label: "Instagram", type: "url" }, { key: "linkedin_url", label: "LinkedIn", type: "url" }, { key: "other_social_url", label: "Diğer sosyal medya bağlantısı", type: "url" },
    ], defaults: { address: "Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420 Çankaya/Ankara", phone: "", email: "kaaflmezunder@gmail.com", secondary_email: "", map_location: "Kızılay, Fevzi Çakmak-2 Sk. No:33, 06420 Çankaya/Ankara", map_url: "https://www.google.com/maps/dir/?api=1&destination=K%C4%B1z%C4%B1lay+Mahallesi%2C+Fevzi+%C3%87akmak-2+Sokak+No%3A33%2C+06420+%C3%87ankaya%2FAnkara", instagram_url: "https://www.instagram.com/kaaflmezunder", linkedin_url: "https://www.linkedin.com/company/ke%C3%A7i%C3%B6ren-vatansever-%C5%9Fehit-t%C3%BCmgeneral-aydo%C4%9Fan-ayd%C4%B1n-fen-lisesi-mezunlar-derne%C4%9Fi/", other_social_url: "" },
  },
  marka: {
    title: "Logo", description: "Header, footer, mobil menü ve yönetim panelinde kullanılan tek merkezi logoyu yönetin.",
    fields: [
      { key: "logo_url", label: "Site logosu", type: "image", help: "Bu logo sitenin ve admin panelinin tüm logo alanlarında kullanılır." },
      { key: "favicon_url", label: "Tarayıcı sekmesi simgesi", type: "image", help: "Bu küçük simge yalnızca tarayıcı sekmesinde görünür; ikinci bir site logosu değildir." },
    ], defaults: { logo_url: "/logo-dernek.jpg", favicon_url: "/logo-dernek.svg" },
  },
} satisfies Record<string, ContentSection>;

export type ContentSectionKey = keyof typeof contentSections;
export function isContentSection(value: string): value is ContentSectionKey { return value in contentSections; }
