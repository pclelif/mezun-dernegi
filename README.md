# Mezun Derneği Web Sitesi

Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği için geliştirilmiş kurumsal web sitesi ve yönetim paneli uygulamasıdır. Proje; dernek faaliyetlerinin paylaşılması, duyuru ve etkinliklerin yayımlanması, üyelik ve aidat süreçleri hakkında bilgi sunulması, mezunlar ve ziyaretçilerle iletişim kurulması ve tüm bu içeriklerin yönetim paneli üzerinden dinamik olarak yönetilmesi amacıyla tasarlanmıştır.

## Proje Hakkında

Bu proje, mezunlar arasındaki iletişimi ve dayanışmayı artırmak, dernek faaliyetlerini kamuoyuna duyurmak, üyelik ve aidat süreçlerini bilgilendirmek ve yönetim kurulu tarafından web sitesi içeriklerinin dinamik olarak yönetilebilmesini sağlamak amacıyla geliştirilmiştir.

## Özellikler

### Kullanıcı Tarafı (Kamuya Açık Portal)

- **Ana Sayfa:** Karşılama alanı, öne çıkan duyurular, yaklaşan etkinlik kartları, fotoğraf galerisi seçkisi ve sıkça sorulan sorular.
- **Duyurular:** Tüm duyuruların listelendiği arşiv sayfası ve detay kartı görünümleri.
- **Etkinlikler:** Yaklaşan ve geçmiş etkinliklerin listelendiği sayfa, tarih/saat/konum bilgileri ve detay kartları.
- **Galeri:** Etkinlik ve dernek fotoğraflarının sergilendiği grid ve carousel görünümleri ile tam ekran resim büyütme (Lightbox) desteği.
- **Kurumsal Sayfalar:** Başkanın Mesajı, Hakkımızda, Tüzük, Vizyon & Misyon, Şehit Aydoğan Aydın Özel Sayfası, Yönetim ve Denetim Kurulları listesi.
- **Üyelik ve Aidat:** Başvuru adımları, resmi üyelik başvuru formu indirme (PDF), banka hesap bilgileri (tek tıkla IBAN kopyalama) ve aidat bilgilendirmesi.
- **İletişim:** İletişim formu, Google Maps harita entegrasyonu, doğrudan e-posta (Gmail) ve telefon arama yönlendirmeleri.
- **Yasal Bağlantılar:** KVKK Aydınlatma Metni, Gizlilik Politikası, Çerez Politikası ve Kullanım Koşulları sayfaları.

### Yönetim Paneli (Admin CMS)

- **Güvenli Giriş:** Supabase Auth ve Next.js middleware altyapısı ile korunan admin paneli.
- **İletişim Mesajları Paneli:** Gelen mesajların toplam, okunmuş ve okunmamış sayılarını gösteren özet istatistikler, canlı arama, durum filtreleme ve tek tıkla tümünü okundu işaretleme imkanı.
- **Duyuru Yönetimi:** Yeni duyuru ekleme, düzenleme, görsel yükleme ve silme.
- **Etkinlik Yönetimi:** Etkinlik ekleme, tarih/saat/konum düzenleme, etkinlik durumunu (yaklaşan/geçmiş) yönetme ve silme.
- **Kurul Üyeleri Yönetimi:** Yönetim ve denetim kurulu üyelerini ekleme, görev ve fotoğraf güncelleme.
- **Galeri Yönetimi:** Çoklu fotoğraf yükleme, sürükle-bırak (Drag & Drop) ile sıralama değiştirme ve silme.
- **SSS Yönetimi:** Sıkça sorulan soruları ekleme, düzenleme ve silme.

## Teknolojiler

### Frontend & Framework
- **Framework:** Next.js 16.3.0 (App Router)
- **UI Kütüphanesi:** React 19.0.0
- **Dil:** TypeScript (Strict Mode)

### Styling & Arayüz
- **Stil Altyapısı:** Tailwind CSS 4.0.0
- **İkon Seti:** Lucide React (`lucide-react`)
- **Tasarım:** Custom CSS Tokens & Responsive Layout

### Backend & Veritabanı
- **Backend Servisi:** Supabase (`@supabase/supabase-js`)
- **Veritabanı:** Supabase PostgreSQL (Row Level Security politikaları ile)
- **Kimlik Doğrulama:** Supabase Auth
- **Medya Depolama:** Supabase Storage (Görsel yüklemeleri için)

### Güvenlik & Yönlendirme
- **Middleware:** Next.js Proxy Middleware (`src/proxy.ts`)

## Proje Yapısı

```text
mezun-dernegi/
├── public/                     # Statik dosyalar (Logo, SVG, PDF)
├── src/
│   ├── app/                    # App Router rotaları (Kamu ve Admin)
│   ├── components/             # Bileşenler (Admin, Cards, Forms, Home, Layout, Shared)
│   ├── config/                 # Navigasyon ve içerik konfigürasyonları
│   ├── lib/                    # Supabase istemcisi ve veritabanı sorguları
│   └── styles/                 # Özel stil tanımları ve tasarım token'ları
├── supabase/                   # Veritabanı SQL migration dosyaları
└── next.config.mjs             # Next.js ayarları
```

## Kurulum

### Ön Koşullar
- Node.js 18.0.0 veya üzeri bir sürüm.
- npm paket yöneticisi.

### Adım Adım Kurulum

1. Repository'yi klonlayın:
   ```bash
   git clone https://github.com/pclelif/mezun-dernegi.git
   ```

2. Proje dizinine girin:
   ```bash
   cd mezun-dernegi
   ```

3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

4. Environment Variables dosyasını oluşturun:
   Kök dizinde `.env.local` adında bir dosya oluşturun ve gerekli Supabase anahtarlarınızı ekleyin.

5. Geliştirme sunucusunu çalıştırın:
   ```bash
   npm run dev
   ```

Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.

## Environment Variables

Projede Supabase veritabanı, kimlik doğrulama ve depolama servisleri ile iletişim kurabilmek için aşağıdaki çevre değişkenleri kullanılmaktadır:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase projenizin API URL adresi.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonim istemci erişim anahtarı (Anon Key).

Geliştirme yaparken bu değişkenleri kök dizindeki `.env.local` dosyası içerisine eklemeniz gerekmektedir. Örnek yapılandırma için `.env.example` dosyasını referans alabilirsiniz.

## Kullanım

- **Ziyaretçiler:** Ana sayfayı gezebilir, duyuruları ve etkinlikleri inceleyebilir, galerideki fotoğrafları inceleyebilir, kurumsal bilgileri okuyabilir, üyelik formunu indirebilir ve iletişim formu üzerinden dernek yönetimine mesaj gönderebilir.
- **Yöneticiler:** `/admin/login` adresi üzerinden giriş yaparak yönetim paneline erişir. Panel üzerinden gelen mesajları yönetebilir; duyuruları, etkinlikleri, kurul üyelerini, galeri fotoğraflarını ve SSS içeriklerini ekleyebilir, düzenleyebilir veya silebilir.

## Sıralama Mantığı

Uygulama genelinde içeriklerin listelenmesi ve sıralanması kullanım amacına göre özelleştirilmiştir:

- **Duyurular:** Eklenme ve yayın tarihine göre en yeniden en eskiye doğru (`created_at` / `date` azalan) sıralanır.
- **Etkinlikler:** Etkinlik tarihine göre sınıflandırılır. Yaklaşan etkinlikler en yakın tarihten ileriye doğru, geçmiş etkinlikler ise gerçekleşme tarihine göre arşivlenir.
- **Galeri:** Yönetim panelinde sürüklenebilir kartlar (Drag & Drop) ile belirlediğiniz özel sıra (`display_order`) saklanır. İstenildiğinde tarihe göre sıralama moduna da geçilebilir.

## Yönetim Paneli

Yönetim paneli (`/admin`), dernek yetkililerinin site içeriğini kod müdahalesi olmadan güncelleyebilmesini sağlar. 

- **Erişim Koruması:** `proxy.ts` middleware katmanı, oturum açmamış kullanıcıların yönetim sayfalarına erişmesini engeller ve kullanıcıyı `/admin/login` sayfasına yönlendirir. Oturum açmış yöneticiler Supabase Auth jetonu ile doğrulanır.
- **Veri Güvenliği:** Veritabanındaki güncelleme ve silme işlemleri Supabase Row Level Security (RLS) politikaları ile korunmaktadır.

## Veritabanı

Projede veri kalıcılığı ve içerik yönetimi için Supabase PostgreSQL veritabanı kullanılmaktadır.

Veritabanında yönetilen temel veri grupları şunlardır:
- `announcements`: Duyuru başlıkları, içerikleri, görselleri ve tarihleri.
- `events`: Etkinlik başlıkları, açıklamaları, tarih, saat, konum ve yayın durumları.
- `board_members`: Yönetim ve denetim kurulu üyelerinin isim, görev, unvan ve görselleri.
- `gallery_images`: Fotoğraf galerisine ait görsel URL'leri ve sıralama bilgileri.
- `faqs`: Sıkça sorulan sorular ve cevapları.
- `site_content`: Ana sayfa, kurumsal sayfalar ve genel site metinlerinin dinamik ayarları.
- `contact_messages`: İletişim formu üzerinden gönderilen mesajlar, okundu bilgileri ve gönderim tarihleri.

## Deployment

Proje Next.js standartlarında hazırlanmış olup Vercel veya Node.js destekleyen herhangi bir sunucu ortamında derlenebilir.

Üretim sürümü (Production Build) oluşturmak ve başlatmak için:

```bash
npm run build
npm start
```

## Tasarım Yaklaşımı

Tasarımda Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği'nin kurumsal kimliğini yansıtan modern, sade ve kullanıcı odaklı bir arayüz hedeflenmiştir. 

- Dernek kurumsal kırmızısı (`#EC1C24`) vurgu rengi olarak kullanılmıştır.
- Tüm içerik alanlarında okunabilirliği yüksek tipografi tercih edilmiştir.
- Mobil cihazlarda kolay kullanım için 44px dokunma hedefleri, özel çekmece (drawer) gezinme menüsü ve dokunmatik kart tasarımları uygulanmıştır.

## Geliştirme Notları

- **Strict TypeScript:** Kod tabanındaki tüm bileşenler ve veri modelleri TypeScript ile tiplendirilmiştir. Yeni sayfa ve bileşen eklerken tür tanımlarına dikkat edilmelidir.
- **Next.js Middleware:** Admin yetkilendirme mantığı `src/proxy.ts` dosyasında yer almaktadır. Rota değişikliklerinde bu dosyadaki eşleşme kuralları göz önünde bulundurulmalıdır.
- **Client/Server Ayrımı:** Supabase istemci fonksiyonları `src/lib/supabase/client.ts` ve `src/lib/supabase/server.ts` dosyaları üzerinden ayrıştırılmıştır.

## Lisans

Bu proje Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği adına özel olarak geliştirilmiştir. Tüm hakları saklıdır.

- **İletişim:** kaaflmezunder@gmail.com