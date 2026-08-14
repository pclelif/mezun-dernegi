# Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği Web Sitesi

Next.js, React, JavaScript, normal CSS ve Supabase tabanlı mezunlar derneği web projesi. React bileşenleri ve sayfalar `.js` uzantısıyla tutulur.

## İlk kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Klasör yapısı

- `src/app`: React sayfaları (`page.js`), route'lar, layout ve global CSS
- `src/components/layout`: Navbar, footer gibi ana yerleşim bileşenleri
- `src/components/ui`: Buton, kart, başlık, form gibi tekrar kullanılabilir parçalar
- `src/config`: Menü ve site ayarları
- `src/content`: Geçici/statik içerikler
- `src/lib`: Supabase ve yardımcı fonksiyonlar
- `public`: Logo, fotoğraf, ikon ve PDF gibi statik dosyalar
- `supabase`: Migration ve seed dosyaları (backend sprintinde)
- `docs`: Sitemap, içerik planı ve tasarım kararları

## İsimlendirme kuralları

- Dosya ve klasör: `kebab-case` (`board-member-card.js`)
- React bileşeni: `PascalCase` (`BoardMemberCard`)
- Fonksiyon/değişken: `camelCase` (`getAnnouncements`)
- Sabit: `UPPER_SNAKE_CASE` (`MAX_FILE_SIZE`)
- URL: Türkçe ama ASCII ve kebab-case (`/yonetim-kurulu`)
- Database tablo/kolon: `snake_case` (`board_members`, `published_at`)

Mobil ve masaüstü için ayrı bileşen kopyaları oluşturmayın. Ortak içerik ve davranışı aynı React bileşeninde tutup normal CSS içindeki `@media` kurallarıyla yerleşimi uyarlayın.














********************************************
















# Geliştirici Durum Özeti — Mezun Derneği

**Proje:** Keçiören Fen Lisesi Mezunlar Derneği web sitesi  
**Stack:** Next.js (App Router) · React · TypeScript/JavaScript karışımı · Tailwind CSS v4 · Supabase (PostgreSQL + Auth + Storage)  
**Durum:** Sprint 1–5 büyük ölçüde tamam; Sprint 7 (admin + auth) içerik yönetimi için canlı; Sprint 6 (üyelik/aidat backend) henüz bağlanmadı; Sprint 8 (production) başlamadı.

Son commit mesajı `sprint 7 bitti`. `main`, `origin/main` ile senkron.

---

## 1. Tamamlanan Sprintler ve Özellikler

### Altyapı (Next.js App Router, Tailwind)

- App Router yapısı `src/app` altında. Public site `Header` + `Footer` ile `SiteShell` üzerinden sarılıyor; `/admin` bu kabuğu atlıyor.
- Yeni Next.js convention: `src/proxy.ts` (eski `middleware.ts` yerine). Matcher: `/admin/:path*`.
- Path alias: `@/*` → `src/*`.
- Tailwind v4 + CSS token’ları (`src/styles/tokens.css`): kırmızı `#EC1C24`, nötr gri/beyaz, `75rem` içerik sınırı.
- Tasarım kararları `docs/design-system.md` ve sitemap `docs/sitemap.md` içinde.
- Ortak UI: kartlar (`Card`, duyuru/etkinlik/yönetim kurulu), form alanları (`FormInput` / `FormSelect` / `FormTextarea`), SSS accordion, `PageHero` / `ContentPage`.
- Mobil header: hamburger, accordion alt menü, blur/sticky, 44px dokunma hedefi, klavye/ARIA. Masaüstü: hover/focus dropdown, Instagram/LinkedIn.
- 404 sayfası var (`src/app/not-found.js`).
- Dil: `lang="tr"`. Temel metadata `layout.tsx` içinde (title template + description).

**Önemli not:** Kod tabanı JS → TS geçişinde. Yeni özellikler `.tsx`; kurumsal/üyelik sayfalarının bir kısmı hâlâ `.js`. README hâlâ “yalnızca JavaScript” diyor; güncel değil.

### Veritabanı (Supabase)

Üç migration:

| Dosya | Ne yapıyor |
|---|---|
| `00001_initial_schema.sql` | `events`, `announcements`, `galleries`, `gallery_images`, `board_members`, `faqs` + public SELECT RLS |
| `00002_temp_admin_write_policies.sql` | Geçici anon yazma (tarihsel) |
| `00003_secure_auth_and_storage.sql` | Temp politikaları kaldırır; `announcements.image_url` ekler; yazmayı `authenticated` ile sınırlar; `media` bucket Storage politikaları |

**Public okuma:** anon + authenticated, tüm içerik tabloları.  
**Yazma:** yalnızca authenticated — `events`, `announcements`, `galleries`, `gallery_images`.  
**Storage:** `media` bucket; public read, authenticated upload/delete. Dosya yolu: `{user.id}/{timestamp}-{uuid}.ext`. JPEG/PNG/WebP, max 5 MB.

**Şema dışı (henüz yok):** `news`, `membership_applications`, aidat/ödeme tabloları, `profiles` / roller, tüzük PDF kaydı.

### Public içerik (Sprint 3–4)

| Route | Durum |
|---|---|
| `/` | Hero + son 3 etkinlik (`HomeEventsSection`) |
| `/etkinlikler`, `/etkinlikler/[slug]` | Supabase; yaklaşan/geçmiş badge; tarih, saat, konum, görsel, açıklama |
| `/duyurular`, `/duyurular/[slug]` | Supabase; başlık, içerik, tarih. `image_url` DB’de var, detay sayfasında gösterilmiyor |
| `/galeri`, `/galeri/[slug]` | Albüm listesi + fotoğraf grid |
| `/sss` | `faqs` tablosundan accordion |
| `/kurumsal/yonetim-kurulu`, `/kurumsal/denetim-kurulu` | `board_members`; denetim üyeleri `role` içinde “denetim” ile filtreleniyor |
| `/kurumsal/vizyon-misyon` | Statik metin dolu |
| `/kurumsal/hakkimizda`, `/baskanin-mesaji`, `/tuzuk`, `/iletisim` | İskelet (`ContentPage` placeholder) |
| `/uyelik`, `/uyelik/basvuru`, `/uyelik/aidat`, `/uyelik/sartlar` | UI var; backend yok (aşağıda) |

`GalleryShowcase` bileşeni yazılmış ama ana sayfada kullanılmıyor. Nav’da `/hakkimizda/aydogan-aydin` var; sayfa yok.

### Admin paneli, CRUD, Auth (Sprint 7 — vurgulanan kısım)

**Auth**
- `/admin/login`: `signInWithPassword`.
- `proxy.ts`: oturumsuz `/admin/*` → login; oturumlu login → `/admin`.
- Cookie session: `createServerSessionClient()` (`@supabase/ssr`).
- `LogoutButton` → `signOut()`.
- Yetki modeli yok: herhangi bir authenticated kullanıcı yazabilir. Admin allowlist / `role` tablosu yok.

**Dashboard** (`/admin`): etkinlik / duyuru / albüm sayıları (Supabase `count`).

**CRUD (tarayıcı client + RLS)**

| Modül | Liste | Ekle | Düzenle | Sil | Görsel |
|---|---|---|---|---|---|
| Etkinlikler | Evet | Evet | Evet | Evet | Kapak (`ImageUploader`) |
| Duyurular | Evet | Evet | Evet | Evet | Kapak |
| Galeri | Evet | Evet | **Hayır** | Evet (cascade) | Kapak + çoklu foto |
| SSS | — | — | — | — | — |
| Yönetim/Denetim Kurulu | — | — | — | — | — |
| Haberler | Modül yok | | | | |
| Üyelik başvuruları | Modül yok | | | | |
| Aidat | Modül yok | | | | |

Slug, başlıktan `slugify()` ile üretiliyor (TR karakter desteği var). Düzenlemede slug yeniden yazılıyor; URL değişebilir.

**Admin sidebar:** Dashboard, Etkinlikler, Duyurular, Galeri, Siteye Dön, Çıkış. Mobilde yatay kaydırmalı.

---

## 2. Şu An Bulunduğumuz Aşama (Sprint 6 — Üyelik ve Aidat)

Sprint 7 admin işi kodda bitmiş durumda. Sprint 6 ise **yalnızca public UI**; veritabanı ve admin tarafı henüz yok.

### `/uyelik` — bilgilendirme sayfası

`src/app/uyelik/page.js` + `page.module.css`. Statik, CSS module.

- 3 adımlı süreç; 1. adım `/uyelik/basvuru`’ya CTA.
- Üyelik hakları listesi (genel kurul, etkinlikler, katkı — tüzük referanslı, hukuki metin değil).
- Aidat paneli: tutar, banka, IBAN, açıklama **placeholder** (`[Tutar]`, `[Banka Adı]`, `[IBAN]`).
- IBAN kopyala (`IbanCopyButton`) çalışır; şu an `"[IBAN]"` kopyalanır.
- Sayfa içi SSS accordion; cevaplar da placeholder.

### `/uyelik/basvuru` — form

`MembershipForm` (`src/components/forms/membership-form.tsx`):

- Alanlar: Ad, Soyad, E-posta, Telefon, Mezuniyet yılı (select, 2026→geri 50 yıl), Okul numarası (opsiyonel), Mesaj, KVKK checkbox (`required`).
- HTML `required` + e-posta/tel tipleri. Ek client-side validation / toast / başarı ekranı yok.
- `handleSubmit` FormData’yı `MembershipFormValues`’e çeviriyor, sonra `void values` — **Supabase insert yok**.
- `schoolNumber` formda var, type’ta yok.
- KVKK metni/linki yok; yalnızca onay kutusu.

### Diğer üyelik route’ları

- `/uyelik/sartlar` — boş `ContentPage`.
- `/uyelik/aidat` — boş `ContentPage` (asıl aidat içeriği `/uyelik` üzerinde).
- Nav: “Dernek Üyeliği”, “Aidat ve Bağış”.

### Sprint 6’da henüz olmayanlar

- `membership_applications` (veya eşdeğeri) tablosu, RLS, durum alanı (`pending` / `approved` / `rejected`).
- Form → DB kaydı, e-posta bildirimi, başvuru takip.
- Aidat tutarı/IBAN’ın CMS veya config’den gelmesi.
- Online ödeme, otomatik talimat, banka entegrasyonu.
- Admin’de başvuru / aidat yönetimi.

---

## 3. Eksikler ve Yapılacaklar (Next Steps / Backlog)

Önerilen sıra: önce Sprint 6’yı kapat, admin boşluklarını doldur, sonra Sprint 8.

### A. Sprint 6 — Üyelik (öncelik)

1. `membership_applications` tablosu: ad, soyad, e-posta, telefon, mezuniyet yılı, okul no, mesaj, KVKK onayı + timestamp, `status`.
2. Public INSERT RLS (anon başvurabilsin); UPDATE/DELETE yalnızca authenticated.
3. `MembershipForm`’u insert’e bağla; başarı/hata UI.
4. Admin: başvuru listesi, onay/red, durum güncelleme.
5. Gerçek aidat tutarı, banka, IBAN; `/uyelik` placeholder’larını kaldır. `/uyelik/aidat` ile içeriği tekilleştir.
6. `/uyelik/sartlar` ve KVKK metnini doldur (PDF veya sayfa).
7. Online ödeme / otomatik talimat: araştırma notu yeterli; entegrasyon Sprint 8 sonrası olabilir.

### B. Admin ve yetkilendirme

- **Rol:** `authenticated` ≠ admin. Allowlist, `app_metadata.role` veya `profiles` + RLS (`auth.uid()` / `is_admin()`).
- SSS ve yönetim/denetim kurulu CRUD. `board_members` / `faqs` için authenticated write politikası yok; şu an yalnızca Table Editor ile dolduruluyor.
- Galeri düzenleme: albüm güncelleme, foto ekleme/silme.
- Haberler: planda var, şema/UI/nav yok. Bilinçli erteleme veya kapsam dışı kararı netleştirilmeli.
- Dashboard’a başvuru/SSS/kurul sayaçları.

### C. İçerik ve dosya (Storage)

- Tüzük PDF: `public/` veya Storage; `/kurumsal/tuzuk` görüntüle/indir.
- Hakkımızda, Başkanın Mesajı, İletişim (adres, e-posta, harita, iletişim formu).
- `/hakkimizda/aydogan-aydin` sayfası veya nav’dan kaldır.
- Duyuru detayında `image_url`.
- `GalleryShowcase`’u ana sayfaya bağla veya kaldır.
- `next.config.mjs` → `images.remotePatterns`: Board kartı `next/image` ile Supabase URL kullanıyor; pattern boşken production’da kırılır. Etkinlik/duyuru görselleri CSS `background-image` ile gidiyor (bu kısıt onları etkilemez).

### D. Teknik borç

- JS/TS karışımı; README’yi güncelle (`page.tsx`, Tailwind, Auth, migrations).
- `globals.css` içinde kullanılmayan eski header/footer class’ları.
- `createServerAnonClient` cookie’siz; public okuma için yeterli, session yazmaları admin client’tan.
- `media` bucket migration’da `insert` edilmiyor; projede elle açılmış olmalı. Yeni ortamda dokümante et.
- Migration 00002 production’da hâlâ duruyorsa 00003’ün uygulandığını doğrula (anon write kapatılmış olmalı).
- Etkinlik “Etkinliğe Katıl” → `/uyelik`; ayrı kayıt akışı yok.
- Slug, başlık değişince yeniden üretiliyor (eski URL 404).
- `src/content/sample-data.ts` silinmiş; public listeler boş DB’de empty state gösteriyor.

### E. Sprint 8 — Deployment

- Domain, hosting (Vercel vb.), production Supabase, env (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`).
- `robots.txt` / sitemap.xml yok; `metadataBase`, Open Graph yok.
- Auth sıkılaştırma, RLS audit, yedekleme.
- Responsive / tarayıcı / a11y / performance (Lighthouse).
- Formların production testi.
- Service role key uygulamada yok (doğru); admin yazmaları kullanıcı JWT + RLS ile.

---

## Yeni geliştirici için hızlı başlangıç

```bash
npm install
cp .env.example .env.local
# NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY doldur
npm run dev
```

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login` (Supabase Auth kullanıcısı)
- Migration’lar: `supabase/migrations/`
- Nav: `src/config/navigation.ts`
- Query’ler: `src/lib/supabase/queries.ts`
- Auth gate: `src/proxy.ts`

İlk iş önerisi: `membership_applications` + form insert + admin başvuru listesi; ardından tüzük PDF ve kurumsal placeholder metinler.