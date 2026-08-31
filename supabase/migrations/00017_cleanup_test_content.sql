-- 00017_cleanup_test_content.sql
-- Temizleme: Test duyuruları, etkinlikleri ve SSS kayıtlarını siler; galeride tek bir logo fotoğrafı bırakır.

-- 1. Etkinlikleri temizle
DELETE FROM events;

-- 2. Duyuruları temizle
DELETE FROM announcements;

-- 3. SSS (Sıkça Sorulan Sorular) kayıtlarını temizle
DELETE FROM faqs;

-- 4. Galeride sadece 1 adet logo görseli bırak
DELETE FROM gallery_images;

DO $$
DECLARE
  v_gallery_id UUID;
BEGIN
  SELECT id INTO v_gallery_id FROM galleries ORDER BY created_at ASC LIMIT 1;
  
  IF v_gallery_id IS NULL THEN
    INSERT INTO galleries (title, slug, date, cover_image_url)
    VALUES ('Ana Galeri', 'ana-galeri', CURRENT_DATE, '/logo-dernek.jpg')
    RETURNING id INTO v_gallery_id;
  END IF;

  INSERT INTO gallery_images (gallery_id, image_url, display_order)
  VALUES (v_gallery_id, '/logo-dernek.jpg', 1);
END $$;
