# Keçiören Fen Lisesi Mezunları Derneği

Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği'nin resmi web sitesi ve yönetim paneli.

## Özellikler

- **Duyurular ve Etkinlikler:** Güncel duyuru ve etkinlikler, detay kartları ve arşiv yönetimi.
- **Galeri:** Sürükle-bırak sıralama destekli fotoğraf galerisi ve tam ekran önizleme.
- **Üyelik ve Aidat:** Başvuru adımları, üyelik formu indirme ve aidat bilgilendirmesi.
- **Yönetim Paneli (Admin):** Supabase korumalı yönetim panelinden mesaj takibi, içerik güncellemeleri ve medya yükleme.
- **Duyarlı Tasarım:** Mobil ve masaüstü cihazlar için tam uyumlu arayüz.

## Teknolojiler

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase (PostgreSQL, Auth, Storage)

## Kurulum

1. Repoyu klonlayın ve bağımlılıkları yükleyin:
   ```bash
   git clone https://github.com/pclelif/mezun-dernegi.git
   cd mezun-dernegi
   npm install
   ```

2. `.env.local` dosyasını oluşturup Supabase anahtarlarınızı ekleyin:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Geliştirme sunucusunu çalıştırın:
   ```bash
   npm run dev
   ```

## Telif Hakkı ve İletişim

Bu yazılım Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği adına geliştirilmiştir. Tüm hakları saklıdır.

- **İletişim:** kaaflmezunder@gmail.com