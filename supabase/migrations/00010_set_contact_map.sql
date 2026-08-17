-- Kullanıcının paylaştığı doğrulanmış Google Maps konumu
insert into public.site_content (section, content, updated_at)
values (
  'iletisim',
  jsonb_build_object(
    'address', 'Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420 Çankaya/Ankara',
    'map_location', 'Kızılay, Fevzi Çakmak-2 Sk. No:33, 06420 Çankaya/Ankara',
    'map_url', 'https://maps.app.goo.gl/b2RhUhPjf4n1rsdF9?g_st=ic'
  ),
  now()
)
on conflict (section) do update
set content = public.site_content.content || excluded.content,
    updated_at = now();

