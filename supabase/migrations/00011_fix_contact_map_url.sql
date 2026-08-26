-- Fix Google Maps URL to use official destination-only directions API so visitors get directions from their own current location
update public.site_content
set content = (content - 'map_url') || jsonb_build_object(
  'map_location', 'Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420 Çankaya/Ankara',
  'map_url', 'https://www.google.com/maps/dir/?api=1&destination=K%C4%B1z%C4%B1lay+Mahallesi%2C+Fevzi+%C3%87akmak-2+Sokak+No%3A33%2C+06420+%C3%87ankaya%2FAnkara'
),
updated_at = now()
where section = 'iletisim';
