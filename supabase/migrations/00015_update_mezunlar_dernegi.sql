-- Veritabanındaki site_content tablosunda yer alan Mezunları Derneği ifadelerini Mezunlar Derneği olarak güncelle

update public.site_content
set content = jsonb_set(
  content,
  '{hero_title}',
  to_jsonb('Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği'::text)
),
updated_at = now()
where section = 'ana-sayfa'
  and content->>'hero_title' like '%Mezunları Derneği%';

update public.site_content
set content = jsonb_set(
  content,
  '{account_name}',
  to_jsonb('Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği'::text)
),
updated_at = now()
where section = 'aidat-bagis'
  and content->>'account_name' like '%Mezunları Derneği%';
