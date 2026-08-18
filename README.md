# Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği

Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği'nin resmi web uygulaması ve içerik yönetim paneli.

---

## Proje Hakkında

Bu proje, mezunlar arasındaki iletişimi ve dayanışmayı artırmak, dernek faaliyetlerini kamuoyuna duyurmak, üyelik ve aidat süreçlerini bilgilendirmek ve yönetim kurulu tarafından web sitesi içeriklerinin dinamik olarak yönetilebilmesini sağlamak amacıyla geliştirilmiştir.

---

## Modüller ve İşlevler

### Web Portalı (Kamuya Açık Arayüz)

- **Ana Sayfa**
  - Manşet alanı ve kurumsal giriş metinleri.
  - Öne çıkan son duyurular ve yaklaşan etkinlik kartları.
  - Fotoğraf galerisi seçkisi ve carousel bileşeni.
  - Sıkça sorulan sorular (SSS) akordeon menüsü.

- **Duyurular ve Etkinlikler**
  - Tüm duyuru ve etkinliklerin listelendiği arşiv sayfaları.
  - Geçmiş ve yaklaşan etkinlik ayrımı.
  - Detay görünümleri için odaklanmış modal kart yapısı ve kaynak takipli dinamik geri dönüş yönlendirmesi.

- **Galeri**
  - Sürükleme ve tıklama destekli görsel galerisi.
  - Tam ekran fotoğraf inceleme (Lightbox) desteği.

- **Kurumsal Sayfalar**
  - Başkanın Mesajı, Hakkımızda, Tüzük, Vizyon & Misyon bölümleri.
  - Şehit Tümgeneral Aydoğan Aydın anısına özel sayfa.
  - Yönetim Kurulu ve Denetim Kurulu üye listeleri.

- **Üyelik ve Aidat**
  - Adım adım üyelik başvuru rehberi.
  - Resmi üyelik başvuru formu indirme bağlantısı (PDF).
  - Banka hesap bilgileri ve tek tıkla IBAN kopyalama butonları.
  - Dönem aidatları bilgilendirmesi.

- **İletişim ve Yasal Bağlantılar**
  - İletişim formu ve Google Maps harita entegrasyonu.
  - Doğrudan e-posta gönderimi (Gmail) ve telefon arama yönlendirmeleri.
  - KVKK Aydınlatma Metni, Gizlilik Politikası, Çerez Politikası ve Kullanım Koşulları sayfaları.

---

### Yönetim Paneli (Admin CMS)

- **Erişim ve Güvenlik**
  - Supabase Auth tabanlı admin oturum yönetimi.
  - Middleware (`proxy.ts`) ile korunan `/admin` rotaları.

- **İletişim Mesajları Paneli**
  - Gelen iletilerin toplam, okunmuş ve okunmamış sayılarını gösteren özet kartlar.
  - Arama çubuğu ve duruma göre sekme filtreleri (Tümü / Okunmamış / Okunmuş).
  - Tek tıkla tümünü okundu işaretleme aksiyonu.
  - Mesaj detay modalları ve hızlı e-posta / telefon başlatma butonları.

- **İçerik Yönetimi**
  - **Duyuru Yönetimi:** Yeni duyuru ekleme, içerik düzenleme, görsel yükleme ve silme.
  - **Etkinlik Yönetimi:** Tarih, saat, konum, açıklama ve durum (yaklaşan/geçmiş) güncelleme.
  - **Kurul Yönetimi:** Üye ekleme, unvan/görev ve profil fotoğrafı güncelleme.
  - **Galeri Yönetimi:** Çoklu fotoğraf yükleme, sürükle-bırak (Drag & Drop) ile sıralama değiştirme ve silme.
  - **SSS Yönetimi:** Soru ve cevapların dinamik yönetimi.

- **Arayüz ve Kullanılabilirlik**
  - Mobil cihazlar için özel çekmece menü ve dokunmatik kart tasarımları.
  - Markaya özel onay modalları.
  - Sıralama tercihlerinin yerel hafızada (`localStorage`) saklanması.

---

## Teknolojiler ve Bağımlılıklar

- **Framework:** Next.js 16 (App Router)
- **Kütüphane:** React 19
- **Dil:** TypeScript (Strict Mode)
- **Stil:** Tailwind CSS v4, Custom CSS Tokens, Lucide React İkon Seti
- **Veritabanı ve Auth:** Supabase PostgreSQL, Supabase Auth, Supabase Storage

---

## Proje Dizini

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

---

## Kurulum ve Çalıştırma

### 1. Projeyi İndirin ve Bağımlılıkları Yükleyin

```bash
git clone https://github.com/pclelif/mezun-dernegi.git
cd mezun-dernegi
npm install
```

### 2. Çevre Değişkenlerini Oluşturun

Kök dizinde `.env.local` dosyası oluşturarak Supabase bağlantı bilgilerinizi ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır. Yönetim paneline `http://localhost:3000/admin` adresinden erişilebilir.

### 4. Derleme ve Canlıya Alma (Production Build)

```bash
npm run build
npm start
```

---

## Telif Hakkı ve İletişim

Bu yazılım Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği adına geliştirilmiştir. Tüm hakları saklıdır.

- **İletişim:** kaaflmezunder@gmail.com