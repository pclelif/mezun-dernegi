# Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3FCF8E?style=for-the-badge&logo=supabase)

Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği resmi web sitesi ve dinamik içerik yönetim paneli (CMS Dashboard). 

Bu proje; okul mezunları arasındaki bağı ve dayanışmayı güçlendirmek, dernek faaliyetlerini duyurmak, etkinlik ve üyelik süreçlerini dijitalleştirmek amacıyla modern web standartlarına (Next.js App Router, Tailwind CSS v4, Supabase) uygun olarak geliştirilmiştir.

---

## 🌟 Öne Çıkan Özellikler

### 🏛️ Kamuya Açık Web Portalı (Public Web App)
- **Dinamik Ana Sayfa**: Öne çıkan duyurular, yaklaşan etkinlikler, fotoğraf galerisi atlıkarıncası (carousel) ve sıkça sorulan sorular.
- **Odaklanmış Kart Vitrini (Detail Card Dialogs)**: Duyuru ve etkinlik detaylarında boş sayfalar yerine şık, odaklanmış ve akıllı yönlendirmeli (*"Ana Sayfaya Dön"* / *"Liste Sayfasına Dön"*) kart vitrinleri.
- **Interaktif Galeri**: Tam ekran büyütme (Lightbox) destekli, duyarlı (responsive) grid ve carousel fotoğraf galerisi.
- **Kurumsal Sayfalar**: Başkanın Mesajı, Hakkımızda, Şehit Aydoğan Aydın Özel Sayfası, Tüzük, Vizyon & Misyon ve Yönetim/Denetim Kurulları listesi.
- **Üyelik & Aidat İşlemleri**: Üyelik başvuru adımları, PDF kayıt formu indirme, kopyalanabilir tek tık IBAN butonları ve aidat bilgilendirmesi.
- **İletişim & Canlı Entegrasyon**: Harita konum entegrasyonu, doğrudan Gmail Web/Mobil uygulamasına yönlendiren e-posta bağlantıları ve tek tıkla arama sağlayan akıllı telefon bağlantıları (`tel:`).
- **Yasal ve Bilgilendirme Sayfaları**: KVKK Aydınlatma Metni, Gizlilik Politikası, Çerez Politikası ve Kullanım Koşulları.

---

### 🛡️ Yönetim Paneli (Admin CMS Dashboard)
- **Güvenli Kimlik Doğrulama**: Supabase Auth tabanlı oturum yönetimi ve `proxy.ts` middleware koruması ile yetkisiz erişimlerin engellenmesi.
- **Gelişmiş İletişim Yönetim Paneli**:
  - Toplam, Okunmuş ve Okunmamış mesaj istatistik kartları.
  - Canlı arama ve sekmeli filtreleme (Tüm Mesajlar / Okunmamış / Okunmuş).
  - Tek tıkla toplu okundu işaretleme (*"Tümünü Okundu İşaretle"*).
  - Kurumsal kırmızı temalı silme onay modalı ve `localStorage` tabanlı sıralama tercihi hatırlama.
  - E-posta üstüne tıklandığında doğrudan Gmail compose penceresi açma.
- **Dinamik İçerik İçerik Yönetimi (CRUD)**:
  - **Duyurular**: Yeni duyuru ekleme, içerik/görsel güncelleme, yayın tarihi ve silme.
  - **Etkinlikler**: Etkinlik adı, tarih, saat, konum, durum (Yaklaşan/Geçmiş) ve görsel yönetimi.
  - **Kurul Üyeleri**: Yönetim ve Denetim Kurulu üyelerinin görev, unvan ve profil fotoğrafı yönetimi.
  - **Galeri**: Çoklu fotoğraf yükleme (Supabase Storage), sürükle-bırak (Drag & Drop) ile manuel sıralama değiştirme ve silme.
  - **SSS**: Sıkça sorulan soru ve yanıtların kategoriye göre eklenmesi/düzenlenmesi.
- **%100 Mobil Uyumluluk (Mobile First Admin)**:
  - Mobilde özel başlık, dairesel logo ve açılır çekmece menü (drawer navigation).
  - Tüm liste sayfalarında mobilde dokunmatik kartlar (`sm:hidden`), masaüstünde detaylı tablolar (`hidden sm:block`).

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Frontend Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Kütüphanesi**: [React 19](https://react.dev/)
- **Stil & Tasarım**: [Tailwind CSS v4](https://tailwindcss.com/), Custom CSS Tokens, Glassmorphism & Lucide Icons
- **Tip Güvenliği**: Strict [TypeScript](https://www.typescriptlang.org/)
- **Backend & Veritabanı**: [Supabase](https://supabase.com/)
  - **PostgreSQL**: İlişkisel veri modeli ve Row Level Security (RLS) politikaları.
  - **Supabase Auth**: Admin kullanıcı kimlik doğrulaması.
  - **Supabase Storage**: Medya ve görsel dosya barındırma.

---

## 📁 Proje Dizin Yapısı

```text
mezun-dernegi/
├── public/                     # Statik dosyalar (Logo, SVG, PDF vb.)
│   ├── logo-dernek.jpg         # Kurumsal dernek logosu
│   ├── logo-dernek.svg         # Favicon ve sekme simgesi
│   └── UYE_KAYIT_FORMU.pdf     # İndirilebilir üyelik kayıt formu
├── src/
│   ├── app/                    # Next.js App Router (Sayfalar ve API Rotaları)
│   │   ├── (public)/           # Kamuya açık sayfalar (Ana Sayfa, Duyurular, Etkinlikler vb.)
│   │   ├── admin/              # Yönetim Paneli ve alt içerik yönetim sayfaları
│   │   ├── layout.tsx          # Ana site düzeni ve metadata
│   │   ├── globals.css         # Global stiller ve Tailwind CSS v4 kuralları
│   │   └── proxy.ts            # Admin koruması sağlayan Next.js Middleware
│   ├── components/             # Reusable UI Bileşenleri
│   │   ├── admin/              # Yönetim paneline özel formlar ve yükleyiciler
│   │   ├── cards/              # Kart bileşenleri (Duyuru, Etkinlik, Kurul)
│   │   ├── forms/              # İletişim formu ve girdi bileşenleri
│   │   ├── home/               # Ana sayfa bölümleri ve Galeri vitrini
│   │   ├── layout/             # Header, Footer, SiteShell
│   │   └── shared/             # Ortak kullanılan buton ve kahraman (Hero) alanları
│   ├── config/                 # Site yapılandırması, navigasyon ve içerik şemaları
│   ├── lib/                    # Supabase istemcisi ve sorgu fonksiyonları
│   └── styles/                 # Tasarım token'ları ve özel CSS tanımları
├── supabase/                   # Veritabanı SQL migration dosyaları
└── next.config.mjs             # Next.js yapılandırma dosyası
```

---

## ⚡ Hızlı Kurulum ve Çalıştırma

### Gereksinimler
- Node.js `v18.0.0` veya üzeri
- npm veya yarn paket yöneticisi

### 1. Repoyu Klonlayın
```bash
git clone https://github.com/pclelif/mezun-dernegi.git
cd mezun-dernegi
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini (Environment Variables) Ayarlayın
Kök dizinde `.env.local` adında bir dosya oluşturun ve Supabase bilgilerinizi ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açarak siteyi inceleyebilirsiniz. Yönetim paneline erişmek için `http://localhost:3000/admin` adresini ziyaret edebilirsiniz.

### 5. Üretim Sürümü Oluşturma (Production Build)
```bash
npm run build
npm start
```

---

## 📄 Lisans ve İletişim

Bu proje **Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği** için özel olarak geliştirilmiştir. Tüm hakları saklıdır.

- **E-posta**: [kaaflmezunder@gmail.com](mailto:kaaflmezunder@gmail.com)
- **Instagram**: [@kaaflmezunder](https://www.instagram.com/kaaflmezunder)
- **Adres**: Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420 Çankaya / Ankara