-- Admin alanlarını gerçek site içeriğiyle eşleştir ve bilinen iletişim bilgilerini doldur.
update public.site_content
set content = content || jsonb_build_object(
  'email', 'kaaflmezunder@gmail.com',
  'instagram_url', 'https://www.instagram.com/kaaflmezunder',
  'linkedin_url', 'https://www.linkedin.com/company/ke%C3%A7i%C3%B6ren-vatansever-%C5%9Fehit-t%C3%BCmgeneral-aydo%C4%9Fan-ayd%C4%B1n-fen-lisesi-mezunlar-derne%C4%9Fi/'
), updated_at = now()
where section = 'iletisim';

-- Tüzük tek yerde, Hakkımızda altında yönetilsin. Önceden Logo alanına
-- yüklenmiş bir PDF varsa kaybetmeden Hakkımızda kaydına taşı.
update public.site_content as about
set content = about.content || jsonb_build_object('charter_url', brand.content->>'charter_url'),
    updated_at = now()
from public.site_content as brand
where about.section = 'hakkimizda'
  and brand.section = 'marka'
  and coalesce(about.content->>'charter_url', '') = ''
  and coalesce(brand.content->>'charter_url', '') <> '';

update public.site_content
set content = content - 'charter_url', updated_at = now()
where section = 'marka';

