-- Admin ile sitede aynı değerler görünsün. Eski CMS anahtarları veri kaybı
-- olmaması için veritabanında korunur; arayüz artık bunları kullanmaz.

update public.site_content
set content = jsonb_build_object(
  'annual_dues', 'Üyelik aidatı her dönem 300 TL olmak üzere yılda 4 dönem üzerinden ödenmektedir.',
  'donation', 'Derneğimize destek olmak için aynı IBAN numarasına “Bağış” açıklaması ile dilediğiniz tutarda katkıda bulunabilirsiniz.',
  'bank_name', 'Ziraat Bankası',
  'account_name', 'Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği',
  'iban', 'TR91 0001 0016 8398 3927 3550 01',
  'payment_note', ''
) || content,
updated_at = now()
where section = 'aidat-bagis';

