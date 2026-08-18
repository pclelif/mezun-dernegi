# Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği

Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği'nin resmi web sitesi ve dinamik içerik yönetim sistemi (CMS) projesidir.

Proje, mezunlar arasındaki iletişimi güçlendirmek, dernek faaliyetlerini duyurmak, üyelik süreçlerini yürütmek ve yönetim kurulu tarafından dinamik içerik güncellemelerinin yapılabilmesini sağlamak amacıyla geliştirilmiştir.

---

## Mimarisi ve Teknoloji Yığını

### Core Stack
- **Framework:** Next.js 16 (App Router)
- **UI & View Layer:** React 19
- **Stilleme:** Tailwind CSS v4, Custom CSS Design Tokens
- **Tip Sistemi:** TypeScript (Strict Mode)

### Backend & Altyapı
- **Veritabanı:** Supabase PostgreSQL (Row Level Security politikaları ile yapılandırılmış)
- **Kimlik Doğrulama:** Supabase Auth
- **Medya & Depolama:** Supabase Storage
- **Güvenlik Middleware:** Next.js Proxy (`proxy.ts`) ile korunan yetkilendirme katmanı

---

## Modüller ve İşlevler

### 1. Kamuya Açık Web Portalı

- **Ana Sayfa:** Dinamik afiş alanı, son duyurular, yaklaşan etkinlikler, galeri seçkisi ve sıkça sorulan sorular.
- **Detay Görünümleri:** Duyuru ve etkinlik içeriklerinin görüntülendiği, kaynağa duyarlı geri dönüş yönlendirmelerine sahip kart mimarisi.
- **Galeri:** Tam ekran önizleme (lightbox) ve sürükleme destekli görsel alanı.
- **Kurumsal Sayfalar:** Başkanın mesajı, hakkımızda metni, tüzük, vizyon & misyon, Şehit Aydoğan Aydın özel bölümü, yönetim ve denetim kurulları.
- **Üyelik ve Aidat:** Başvuru adımları, indirilebilir üyelik formu (PDF), banka hesap bilgileri (IBAN kopyalama desteği) ve dönem aidat detayları.
- **İletişim:** İletişim formu, doğrudan Google Maps harita entegrasyonu, Gmail ve telefon erişim bağlantıları.
- **Yasal Bağlantılar:** KVKK aydınlatma metni, gizlilik politikası, çerez politikası ve kullanım koşulları.

### 2. Yönetim Paneli (Admin CMS)

- **Güvenli Oturum:** Admin kimlik doğrulaması ve `proxy.ts` middleware katmanı ile korunan yönlendirme kontrolü.
- **İletişim ve Mesaj Yönetimi:** 
  - Gelen mesajların istatistiksel özeti (toplam, okundu, okunmadı).
  - Canlı arama, durum bazlı filtreleme ve tek tıkla toplu okundu işaretleme.
  - Hızlı e-posta yanıtı ve arama aksiyonları.
- **İçerik Yönetim Modülleri (CRUD):**
  - **Duyurular:** Başlık, içerik, görsel ve tarih yönetimi.
  - **Etkinlikler:** Tarih, saat, konum, içerik ve yayın durumu (yaklaşan/geçmiş) ayarları.
  - **Kurul Üyeleri:** Görev unvanı ve fotoğraf yönetimi.
  - **Galeri:** Çoklu dosya yükleme, sürükle-bırak (Drag & Drop) ile sıralama düzenleme.
  - **SSS:** Kategori bazlı soru-cevap içerikleri.
- **Kullanıcı Deneyimi ve Mobil Uyum:**
  - Mobil cihazlar için özel çekmece (drawer) menü ve dokunmatik liste kartları.
  - Markaya özel onay modalları ve yerel hafıza (localStorage) sıralama tercihleri.

---

## Proje Dizin Yapısı

```text
mezun-dernegi/
├── public/                     # Statik varlıklar (Logo, SVG, PDF)
│   ├── logo-dernek.jpg         # Kurumsal dernek logosu
│   ├── logo-dernek.svg         # Favicon ve ikon varlıkları
│   └── UYE_KAYIT_FORMU.pdf     # İndirilebilir başvuru formu
├── src/
│   ├── app/                    # Next.js App Router sayfaları ve API rotaları
│   │   ├── (public)/           # Kamusal site rotaları
│   │   ├── admin/              # Yönetim paneli rotaları
│   │   ├── globals.css         # Global stil tanımlamaları
│   │   └── proxy.ts            # Yetkilendirme middleware katmanı
│   ├── components/             # Yeniden kullanılabilir React bileşenleri
│   │   ├── admin/              # Yönetim paneli form ve modülleri
│   │   ├── cards/              # Liste ve kart bileşenleri
│   │   ├── forms/              # Form elemanları
│   │   ├── home/               # Ana sayfa modülleri
│   │   ├── layout/             # Header, Footer ve genel düzen
│   │   └── shared/             # Ortak arayüz bileşenleri
│   ├── config/                 # Navigasyon ve içerik konfigürasyonu
│   ├── lib/                    # Supabase istemcisi ve yardımcı fonksiyonlar
│   └── styles/                 # CSS tasarım token'ları
├── supabase/                   # Veritabanı SQL migration dosyaları
└── next.config.mjs             # Next.js konfigürasyon dosyası
```

---

## Kurulum ve Geliştirme

### Gereksinimler
- Node.js 18.0.0 veya üzeri
- npm, yarn veya pnpm

### Geliştirme Ortamının Hazırlanması

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/pclelif/mezun-dernegi.git
   cd mezun-dernegi
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Çevre değişkenlerini yapılandırın (`.env.local`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

   Uygulamaya varsayılan olarak `http://localhost:3000` adresinden, yönetim paneline ise `http://localhost:3000/admin` adresinden erişilebilir.

### Üretim (Production) Sürümü

```bash
npm run build
npm start
```

---

## Telif Hakkı ve İletişim

Bu yazılım Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği adına geliştirilmiştir. Tüm hakları saklıdır.

- **E-posta:** kaaflmezunder@gmail.com
- **Instagram:** https://www.instagram.com/kaaflmezunder