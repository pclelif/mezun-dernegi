-- Etkinlik görselinin küçük ve koşullu yerleşimini doğrulamak için örnek kayıt.
insert into public.events (
  title,
  slug,
  description,
  date,
  time,
  location,
  status,
  image_url,
  is_published
) values (
  'Test Etkinliği: KAAFL Mezunlar Buluşması',
  'test-etkinligi-kaafl-mezunlar-bulusmasi',
  'Mezunlarımızla yeniden bir araya gelmek, fikir alışverişinde bulunmak ve gelecek dönem çalışmalarımızı konuşmak için düzenlediğimiz test etkinliğidir.',
  '2026-09-12',
  '14.00',
  'KAAFL Konferans Salonu',
  'upcoming',
  '/kaafl-logo-v2.jpg',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  date = excluded.date,
  time = excluded.time,
  location = excluded.location,
  status = excluded.status,
  image_url = excluded.image_url,
  is_published = excluded.is_published;
