-- Seed test content for LinkedIn preview and video recording

-- 1. Events
DELETE FROM events;
INSERT INTO events (title, slug, description, date, time, location, status, image_url, is_published, display_order)
VALUES
(
  'Test: Mezunlar Buluşması',
  'test-mezunlar-bulusmasi',
  'Tüm mezunlarımızı okulumuzda bir araya getirmeyi amaçladığımız buluşma etkinliğimiz. Dönem anılarının tazeleneceği ve mezunlarımızla bir araya geleceğimiz keyifli bir program gerçekleştireceğiz.',
  '2026-10-18',
  '14:00',
  'KAAFL Okul Bahçesi / Ankara',
  'upcoming',
  '/hero-bg.jpg',
  true,
  1
),
(
  'Test: Mezunlar Kahvaltısı',
  'test-mezunlar-kahvaltisi',
  'Dönem mezunlarımızla bir araya gelip sohbet edeceğimiz keyifli bir hafta sonu kahvaltı buluşması.',
  '2026-11-15',
  '10:30 - 13:00',
  'Dernek Merkezi / Ankara',
  'upcoming',
  '/hero-bg.jpg',
  true,
  2
),
(
  'Test: Tanışma Toplantısı',
  'test-tanisma-toplantisi',
  'Derneğimizin kuruluşu sonrasında mezunlarımızla gerçekleştirdiğimiz ilk tanışma toplantısı.',
  '2026-06-20',
  '14:00',
  'Dernek Merkezi / Ankara',
  'past',
  '/hero-bg.jpg',
  true,
  3
);

-- 2. Announcements
DELETE FROM announcements;
INSERT INTO announcements (title, slug, content, date, image_url, is_published, display_order)
VALUES
(
  'Test: Web Sitemiz Yayında',
  'test-web-sitemiz-yayinda',
  'Derneğimizin resmi web sitesi mezunlarımızın kullanımına açılmıştır. Tüm duyuru ve etkinliklerimizi sitemiz üzerinden takip edebilirsiniz.',
  '2026-08-25',
  NULL,
  true,
  1
),
(
  'Test: Üyelik Başvuruları Hakkında',
  'test-uyelik-basvurulari-hakkinda',
  'Derneğimize üye olmak isteyen mezunlarımız için üyelik formu ve başvuru adımları sitemizde yer almaktadır.',
  '2026-08-20',
  NULL,
  true,
  2
),
(
  'Test: İletişim Bilgileri Güncellemesi',
  'test-iletisim-bilgileri-guncellemesi',
  'Mezunlarımızla daha kolay iletişim kurabilmek adına iletişim kanallarımız güncellenmiştir. Bizlere iletişim sayfamızdan ulaşabilirsiniz.',
  '2026-08-15',
  NULL,
  true,
  3
);

-- 3. Board Members
DELETE FROM board_members;
INSERT INTO board_members (name, role, board_type, display_order)
VALUES
('Test', 'Yönetim Kurulu Başkanı', 'management', 1),
('Test', 'Yönetim Kurulu Üyesi', 'management', 2),
('Test', 'Denetim Kurulu Başkanı', 'audit', 1),
('Test', 'Denetim Kurulu Üyesi', 'audit', 2),
('Test', 'Denetim Kurulu Üyesi', 'audit', 3);

-- 4. FAQs
DELETE FROM faqs;
INSERT INTO faqs (question, answer, category, display_order)
VALUES
(
  'Test: Mezunlar Derneği''nin amacı nedir?',
  'Derneğimiz, mezunlarımız arasındaki sosyal ve mesleki bağı kuvvetlendirmek, okulumuzun değerlerini yaşatmak ve öğrencilere destek olmak amacıyla faaliyet göstermektedir.',
  'general',
  1
),
(
  'Test: Kimler derneğimize üye olabilir?',
  'Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi mezunları ve dernek tüzüğümüzde belirtilen şartları sağlayan tüm mensuplarımız üyelik başvurusunda bulunabilir.',
  'general',
  2
),
(
  'Test: Dernek tüzüğüne nereden ulaşabilirim?',
  'Dernek tüzüğümüzün güncel ve tam metnine web sitemizin Hakkımızda menüsü altında yer alan Dernek Tüzüğü sayfasından ulaşabilirsiniz.',
  'general',
  3
),
(
  'Test: Üyelik başvuru süreci nasıl işler?',
  'Web sitemizdeki üyelik formunu indirip doldurduktan sonra, adli sicil kaydı ve giriş aidatı dekontu ile birlikte derneğimize ileterek başvurunuzu başlatabilirsiniz.',
  'membership',
  1
),
(
  'Test: Üyelik başvurusu ne kadar sürede sonuçlanır?',
  'Yönetim kurulumuz tarafından yapılan inceleme sonrasında en geç 30 gün içinde tarafınıza bilgilendirme yapılır.',
  'membership',
  2
),
(
  'Test: Dernek aidatları hangi dönemlerde ödenir?',
  'Dernek aidatları yılda 4 dönem (Mart, Haziran, Eylül, Aralık) olarak belirlenen banka hesabımıza açıklama belirtilerek ödenir.',
  'dues',
  1
),
(
  'Test: Derneğe nasıl bağış yapabilirim?',
  'Resmi banka IBAN numaramıza ''Bağış'' açıklaması ve ad-soyadınızı yazarak dilediğiniz miktarda bağışta bulunabilirsiniz.',
  'dues',
  2
);
