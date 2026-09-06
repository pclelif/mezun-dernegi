-- =============================================================================
-- DİKKAT: Bu script PRODUCTION ortamında çalıştırılmamalıdır.
-- Yalnızca geliştirme / staging veritabanlarında, başlık veya içerikte
-- "test" / "deneme" geçen kayıtları temizlemek içindir.
-- =============================================================================

-- 1. Test etkinliklerini temizle
DELETE FROM public.events
WHERE title ILIKE '%test%'
   OR title ILIKE '%deneme%'
   OR coalesce(description, '') ILIKE '%test%'
   OR coalesce(description, '') ILIKE '%deneme%'
   OR slug ILIKE '%test%'
   OR slug ILIKE '%deneme%';

-- 2. Test duyurularını temizle
DELETE FROM public.announcements
WHERE title ILIKE '%test%'
   OR title ILIKE '%deneme%'
   OR coalesce(content, '') ILIKE '%test%'
   OR coalesce(content, '') ILIKE '%deneme%'
   OR slug ILIKE '%test%'
   OR slug ILIKE '%deneme%';

-- 3. Test SSS kayıtlarını temizle
DELETE FROM public.faqs
WHERE question ILIKE '%test%'
   OR question ILIKE '%deneme%'
   OR answer ILIKE '%test%'
   OR answer ILIKE '%deneme%';

-- 4. Test galeri görsellerini temizle (yalnızca test/deneme URL veya albüm başlığı)
DELETE FROM public.gallery_images
WHERE image_url ILIKE '%test%'
   OR image_url ILIKE '%deneme%'
   OR gallery_id IN (
     SELECT id FROM public.galleries
     WHERE title ILIKE '%test%'
        OR title ILIKE '%deneme%'
        OR slug ILIKE '%test%'
        OR slug ILIKE '%deneme%'
   );

DELETE FROM public.galleries
WHERE title ILIKE '%test%'
   OR title ILIKE '%deneme%'
   OR slug ILIKE '%test%'
   OR slug ILIKE '%deneme%';
