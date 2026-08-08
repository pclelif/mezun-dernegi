# KAAFL Mezun Derneği Web Sitesi

Next.js, TypeScript, Tailwind CSS ve Supabase tabanlı mezun derneği web projesi.

## İlk kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Klasör yapısı

- `src/app`: Sayfalar, route'lar ve layout'lar
- `src/components/layout`: Navbar, footer gibi ana yerleşim bileşenleri
- `src/components/ui`: Buton, kart, başlık, form gibi tekrar kullanılabilir parçalar
- `src/config`: Menü ve site ayarları
- `src/content`: Geçici/statik içerikler
- `src/lib`: Supabase ve yardımcı fonksiyonlar
- `src/types`: Ortak TypeScript veri tipleri
- `public`: Logo, fotoğraf, ikon ve PDF gibi statik dosyalar
- `supabase`: Migration ve seed dosyaları (backend sprintinde)
- `docs`: Sitemap, içerik planı ve tasarım kararları

## İsimlendirme kuralları

- Dosya ve klasör: `kebab-case` (`board-member-card.tsx`)
- React bileşeni: `PascalCase` (`BoardMemberCard`)
- Fonksiyon/değişken: `camelCase` (`getAnnouncements`)
- Sabit: `UPPER_SNAKE_CASE` (`MAX_FILE_SIZE`)
- URL: Türkçe ama ASCII ve kebab-case (`/yonetim-kurulu`)
- Database tablo/kolon: `snake_case` (`board_members`, `published_at`)

Mobil ve masaüstü için ayrı bileşen kopyaları oluşturmayın. Ortak içerik ve davranışı aynı bileşende tutup Tailwind breakpoint'leri (`sm`, `md`, `lg`, `xl`) ile yerleşimi uyarlayın.
