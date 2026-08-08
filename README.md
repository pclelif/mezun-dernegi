# KAAFL Mezunlar Derneği Web Sitesi

Next.js, React, JavaScript, normal CSS ve Supabase tabanlı mezunlar derneği web projesi.

## İlk kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Klasör yapısı

- `src/app`: JSX sayfaları, route'lar, layout ve global CSS
- `src/components/layout`: Navbar, footer gibi ana yerleşim bileşenleri
- `src/components/ui`: Buton, kart, başlık, form gibi tekrar kullanılabilir parçalar
- `src/config`: Menü ve site ayarları
- `src/content`: Geçici/statik içerikler
- `src/lib`: Supabase ve yardımcı fonksiyonlar
- `public`: Logo, fotoğraf, ikon ve PDF gibi statik dosyalar
- `supabase`: Migration ve seed dosyaları (backend sprintinde)
- `docs`: Sitemap, içerik planı ve tasarım kararları

## İsimlendirme kuralları

- Dosya ve klasör: `kebab-case` (`board-member-card.jsx`)
- React bileşeni: `PascalCase` (`BoardMemberCard`)
- Fonksiyon/değişken: `camelCase` (`getAnnouncements`)
- Sabit: `UPPER_SNAKE_CASE` (`MAX_FILE_SIZE`)
- URL: Türkçe ama ASCII ve kebab-case (`/yonetim-kurulu`)
- Database tablo/kolon: `snake_case` (`board_members`, `published_at`)

Mobil ve masaüstü için ayrı bileşen kopyaları oluşturmayın. Ortak içerik ve davranışı aynı React bileşeninde tutup normal CSS içindeki `@media` kurallarıyla yerleşimi uyarlayın.
