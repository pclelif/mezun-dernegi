# Güvenlik düzeltmelerini canlıya alma

Görsel düzenlemeler `1ea6646`, güvenlik ve Analytics kaldırma değişiklikleri `7f93207` ile pushlandı.

## Tamamlanan canlı veritabanı işlemleri

- Session pooler üzerinden Supabase CA sertifikası doğrulanarak bağlantı kuruldu.
- Mevcut politika ve fonksiyon tanımları değişiklik öncesinde yerel olarak yedeklendi.
- Mevcut yönetici hesabının `app_metadata.role = admin` olduğu doğrulandı; kullanıcı rolü değiştirilmedi.
- `00022_enforce_trusted_admin_roles` ve `00023_protect_legacy_membership_applications` tek transaction içinde uygulandı ve `supabase_migrations.schema_migrations` tablosuna kaydedildi.
- Dokuz içerik/başvuru tablosunun kayıt sayıları ve içerik parmak izleri işlem öncesi/sonrası aynı kaldı.
- Anonim ve sahte app_metadata/user_metadata rollerinin admin sayılmadığı; mevcut adminin yetkili olduğu doğrulandı. İletişim mesajları, eski üyelik başvuruları ve yayınlanmamış içerikler yetkisiz rollere kapalı.
- Eski migration geçmişi yalnızca `00001`–`00012` kayıtlarını içeriyordu; gerçekte uygulanıp uygulanmadığı kesin olmayan diğer dosyalar uygulanmış olarak işaretlenmedi.

**Aşağıdaki adımlar referans içindir; mevcut canlı ortamda rol atamasını veya 00022/00023 dosyalarını yeniden çalıştırman gerekmiyor.**

## 1. Gerçek yönetici hesabını belirle

Supabase SQL Editor'da aşağıdaki salt okunur sorguyla hesabın UUID'sini doğrula:

```sql
select id, email, raw_app_meta_data ->> 'role' as app_role
from auth.users
order by created_at;
```

Yalnızca gerçekten yönetici olması gereken hesabın UUID'sini aşağıya yaz. Bu işlem diğer metadata alanlarını korur. `user_metadata` ve `ADMIN_EMAILS` artık yönetici erişimi sağlamaz.

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where id = 'YONETICI_HESABININ_UUID_DEGERI'::uuid
returning id, email, raw_app_meta_data ->> 'role' as app_role;
```

Tam olarak hedeflenen hesabın döndüğünü doğrula. Rol atamasından sonra çıkış yapıp yeniden giriş yap.

## 2. Veritabanı politikasını uygula

Yedek/snapshot al. Önce staging üzerinde doğrula. Mevcut tabloların 00020 düzeyine kadar olan şeması mevcutsa, `supabase/migrations/00022_enforce_trusted_admin_roles.sql` dosyasının tamamını SQL Editor'da çalıştır. Dosya transaction içerir; içerik silmez. 00021 daha önce uygulanmış olsa da yeni migration gereklidir. 00022, gerekli 00021 yazma politikalarını da kurar.

Migration numarasını kullandığınız deployment sürecinde uygulanmış olarak kaydet; SQL Editor kullanımı CLI migration geçmişini kendiliğinden güncellemez. Önce remote migration geçmişiyle yerel dosyaları karşılaştır. Tüm bekleyen migration'ları incelemeden `supabase db push` çalıştırma: geçmişte test veri ekleyen migration'lar ve iki ayrı `00011` dosyası bulunuyor.

`00017` artık işlem yapmıyor. Daha önce uygulanarak veri silmişse bunu geri getirmez; kurtarma ancak yedekten yapılabilir. `00021` de yeni kurulumlarda güvensiz user_metadata kontrolünü kurmayacak şekilde düzeltildi.

00022, bu projenin yalnızca `media` bucket'ına yazmasına izin verir. Aynı Supabase projesini başka uygulamalar/bucket'lar da kullanıyorsa ilgili Storage politikalarını staging'de ayrıca değerlendir.

Kontrol sorguları:

```sql
select pg_get_functiondef('public.is_admin()'::regprocedure);
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies
where schemaname in ('public', 'storage')
order by schemaname, tablename, policyname;
```

`is_admin()` mevcut `auth.users.raw_app_meta_data` rolüne bakmalı; kullanıcı tarafından değiştirilebilen metadata veya yalnızca JWT'de kalan eski admin rolüne güvenmemeli.

## 3. Uygulama sürümü ve ortam

Güvenlik kodu `7f93207` ile pushlandı; mevcut canlı veritabanında yönetici rolü ile 00022/00023 politikaları doğrulandı. Yeni bir ortam kurulurken uygulama yayınlanmadan önce bu rol ve politikalar hazırlanmalı.

- `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` korunur.
- `ADMIN_EMAILS` artık kullanılmaz; kaldırılabilir.
- Uygulamanın service-role istemcisi kaldırıldı; bu web uygulaması `SUPABASE_SERVICE_ROLE_KEY` gerektirmiyor. Ayrı operasyon araçları kullanıyorsa onların ihtiyacını ayrıca değerlendir.
- `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` bulunmamalı. Daha önce istemciye/git geçmişine sızmış bir yüksek yetkili anahtar varsa Supabase üzerinden yenile; yalnızca ortamdan silmek eski anahtarı geçersiz kılmaz.

## 4. Canlıya çıkış kontrolü

- Oturumsuz ve sahte `admin_session` çerezli kullanıcı: panel giriş ekranına yönlenmeli, yönetim API'si 401 dönmeli.
- Normal kullanıcı ve kendi user_metadata'sına admin yazmış kullanıcı: panel/API/veritabanı/Storage yönetim işlemleri reddedilmeli.
- Gerçek admin: etkinlik, duyuru, galeri, kurul, SSS, içerik ve mesaj işlemleri; görsel/PDF yükleme/silme çalışmalı.
- Normal kullanıcı iletişim mesajlarını ve yayınlanmamış içerikleri okuyamamalı. Herkese açık iletişim formu mesaj göndermeye devam etmeli.
- Admin rolünü kaldırma: eldeki token ile doğrudan veritabanı/Storage yazma da reddedilmeli.
- Google Analytics tamamen kaldırıldı. Önceden kabul edilmiş tercih olsa bile gtag/collect isteği oluşmamalı. Analytics için eklenen kabul/red bildirimi ve tercih düğmesi de kaldırıldı. Google Maps ayrı bir bileşen olarak kalıyor.
- Deployment ortamında `NEXT_PUBLIC_GA_MEASUREMENT_ID` varsa kaldırılabilir; uygulama artık okumuyor. Eski tarayıcı çerezleri ve `cookieConsent` kaydı Analytics’i yeniden başlatmaz; kullanıcı isterse tarayıcı ayarlarından silebilir.

## Yerel doğrulamalar

- `npm run build`
- 6 Eylül 2026 son kontrolünde genel `npm run lint` hatasız geçti; dört mevcut img performans uyarısı kaldı. Önceki üç hata sonraki revizyonda düzeltildi.
- Node 24+: `node --test tests/security.test.mjs`
- Geçici PGlite kurulumu ile: `PGLITE_MODULE=/.../@electric-sql/pglite/dist/index.js node tests/database-security.mjs`
- Yerel production sunucusunda: `PLAYWRIGHT_MODULE=/.../playwright/index.mjs CHROME_PATH='/.../Google Chrome' node tests/browser-security.mjs`

Veritabanı testi izole bir PostgreSQL uyumlu test veritabanında çalışır; canlı Supabase'in migration geçmişini veya kullanıcı ayarlarını doğrulamaz. Tarayıcı testi, eski kabul/red tercihleri dahil Analytics ağ isteği ve script bulunmadığını kontrol eder; olası Analytics isteklerini yakalayarak gerçek ölçüme gönderilmesini önler.
