# Hukuki metin revizyonu — 6 Eylül 2026

Kullanıcı, aşağıdaki kurumsal eksikleri bilerek mevcut düzenlemelerin pushlanmasını istedi. Sitedeki yönetim talimatı niteliğindeki taslak ifadeleri kaldırıldı; aşağıdaki notlar yalnızca repo içindeki çalışma kaydıdır. Kodda doğrulanabilen akışlar düzeltildi. Aşağıdaki eksik kurumsal bilgiler tamamlanmadan özellikle adli sicil ve yurt dışı aktarım aydınlatması tamamlanmış sayılmamalı.

## Doğrulanan bilgiler ve yapılan düzenlemeler

- Dernek yetkilisinin teyit ettiği adres: Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33/4, 06420 Çankaya/Ankara. Hukuki sayfalar ve iletişim görünümü ortak adresi kullanıyor. Veritabanındaki eski adres bu revizyonda değiştirilmedi; görünen posta adresi ortak yapılandırmadan geliyor. Gelecekte adres değişikliği `src/config/legal.ts` üzerinden ve harita/SEO kayıtlarıyla birlikte yapılmalı.
- Sitede adli sicil yükleme alanı yok. Üyelik sayfası dört PDF'nin `kaaflmezunderuyelik@gmail.com` adresine gönderilmesini istiyor. Kullanıcı derneğin belgeyi üyelikte istediğini ve sitenin bu süreci anlattığını teyit etti. Yayımlanan tüzüğün 7. maddesi gerekli belgelerin yönetim kurulunca belirlenmesini, 8. maddesi başvurunun 30 gün içinde karara bağlanmasını düzenliyor. Tüzükte adli sicil belgesi adıyla zorunlu tutulmuyor; belgeye ilişkin kurul kararı, KVKK m.6 dayanağı ve saklama/erişim uygulaması henüz bilinmiyor.
- Genel iletişim formu ad soyad, e-posta, konu ve mesajı Supabase'e gönderiyor.
- Google Analytics kaldırıldı. Eski cookieConsent tercihi kullanılmıyor. Google Maps gömülü haritası hâlâ sayfa yüklenince Google'a istek oluşturuyor; Analytics'in kaldırılması bunu engellemez.
- Supabase veritabanı bölgesi eu-central-1 / Frankfurt. Depolama, yedek, destek ve alt işleyenlerin tüm coğrafyası yalnızca bu bilgiden çıkarılamaz.
- Vercel barındırma, Supabase veritabanı/oturum/dosya, Gmail e-posta ve Google Maps harita veri akışları ayrıldı. Sağlayıcıların sözleşmesel tüzel kişileri ilgili hesap sözleşmelerinden teyit edilmeli.
- KVKK m.11 hak listesi tamamlandı. Site ziyaretinin otomatik kabul/rıza sayılması kaldırıldı; banka bilgileri ve üçüncü taraf hizmetlere ilişkin sorumluluk ifadeleri dengelendi.
- Üyelik verisinin özel nitelikli olduğu açıkça belirtildi. m.5 kapsamındaki meşru menfaatin özel nitelikli veriler için tek başına yeterli olmadığı ve tüzüğün tek başına m.6 işleme şartı yaratmadığı ayrıştırıldı.

## Yayından önce gereken somut kararlar

### 1. Adli sicil belgesi

Üyelikten sorumlu yönetim kurulu ve hukuki danışman aşağıdakileri birlikte netleştirmeli:

- Belgeyle denetlenen kesin üyelik şartı nedir? İlgili kanun ve tüzük madde numarası nedir? Daha az veri içeren bir yöntem (örneğin sadece uygunluk teyidi) mümkün mü?
- KVKK m.6/3'te hangi işleme şartı bu faaliyete uygulanıyor? "Üyelikte gerekiyor" veya "tüzükte var" tek başına hukuki gerekçe değildir. m.6/3-g'deki belirli amaçlarla kurulan kuruluşlara ilişkin istisna her mezun derneğine otomatik uygulanamaz.
- Belgeleri görebilen görevler ve hesap erişimi olan kişiler kim? Ortak şifre, cihaz indirmeleri, başka adreslere yönlendirme, danışman erişimi var mı?
- Kabul edilen, reddedilen ve geri çekilen başvurular için ayrı saklama süreleri nedir? Süre hangi olayda başlar? Belgenin tam kopyası neden gerekli?
- Gmail ekleri, indirilen dosyalar, fiziksel kopyalar ve yedekler nasıl siliniyor/yok ediliyor? Kim sorumlu, hangi periyotta kontrol ediliyor, imha kaydı nasıl tutuluyor?

Bunlar doğrulanmadığı için sitede uydurma bir "yalnızca iki kişi erişir" veya "30 günde silinir" taahhüdü yazılmadı. Belgeye özgü eksiksiz aydınlatma hazırlanıp başvuru öncesinde sunulmalı. İlgili dayanak yoksa belge talebinin durdurulması veya daha az veri gerektiren bir yöntem ayrıca kararlaştırılmalı; bu revizyonda üyelik şartı tek taraflı kaldırılmadı.

### 2. Yurt dışı aktarım

Her sağlayıcı için veri kategorisi, amaç, alıcı tüzel kişi, ülke/alt işleyen zinciri ve KVKK m.9 mekanizması kayda alınmalı. Kullanıcı, yurt dışı aktarım için henüz bir güvence kurulmadığını teyit etti. Bu nedenle "uygun güvenceler sağlanmıştır" beyanı kaldırıldı; yerine gerçekleşen teknik akışlar ve ayrı aktarım şartı gereği açıklandı. Bu açıklama eksik aktarım mekanizmasını kurmaz.

- Standart sözleşme kullanılacaksa uygun taraf modeli, ekler ve imzalar tamamlanmalı; imzaların tamamlanmasından itibaren beş iş günü içinde Kuruma bildirim yükümlülüğü değerlendirilip yerine getirilmeli.
- Genel sağlayıcı DPA'sı veya AB/GDPR standart sözleşmesi, kendiliğinden KVKK standart sözleşmesi değildir.
- Sürekli bulut barındırma/e-posta kullanımını arızi aktarım istisnası veya genel bir çerez onayıyla çözümlenmiş saymayın.
- Gerekli mekanizma kurulamıyorsa Türkiye'de hizmet sunan alternatifler ve gereksiz üçüncü taraf bileşenlerin kaldırılması değerlendirilmelidir. Hesap/altyapı taşıması bu metin revizyonunda yapılmadı.

### 3. Saklama ve yürürlük

Sayfalara kategori bazında saklama kriterleri eklendi. Dernekler Yönetmeliği m.39 kapsamındaki mali belgeler için beş yıl kuralı tüm verilere ve defterlere genellenmedi. İletişim mesajları, başvuru ekleri, fotoğraflar ve teknik kayıtlar için mevcut uygulama ve gerekli süre ayrı ayrı onaylanmalı; gerçek silme/yedek prosedürüyle eşleştirilmeli. Bu revizyon veritabanında veya e-postada otomatik silme başlatmaz.

Metin güncelleme tarihi 6 Eylül 2026 olarak gösteriliyor. Yayın yapılmadığı için uydurma bir geçmiş yürürlük tarihi verilmedi; kesin yürürlük tarihi gerçek yayın günüyle belirlenmeli. Geçmiş veri işlemlerine geriye dönük rıza yaratılmaz.

## Dayanaklar

- KVKK Kurumu, özel nitelikli veriler ve güncel işleme şartları: https://www.kvkk.gov.tr/Icerik/2051/Ozel-Nitelikli-Kisisel-Veriler
- Veri kategorisi/amaç/hukuki sebep ilişkisinin somutlaştırılması: https://www.kvkk.gov.tr/Icerik/7565/2022-545
- Aydınlatma ve açık rızanın ayrı olması: https://www.kvkk.gov.tr/Icerik/6967/2021-389
- İlgili kişinin hakları: https://www.kvkk.gov.tr/Icerik/2036/Ilgili-Kisinin-Haklari
- Yurt dışı aktarım şartları: https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim
- Standart sözleşme ve bildirim: https://www.kvkk.gov.tr/Icerik/8170/Yurt-Disina-Kisisel-Veri-Aktariminda-Kullanilacak-Standart-Sozlesmelerde-Dikkat-Edilmesi-Gereken-Hususlara-Iliskin-Kamuoyu-Duyurusu
- Dernek belgelerinin saklanması: https://www.siviltoplum.gov.tr/derneklerin-defter-tutma-islemleri

## Son teknik kontrol

- “üçünçü” yazımı, kabul/ret yazımı ve başkanın mesajındaki apostrof düzeltildi.
- DetailFooterLink ve ReturnButton bileşenlerinin sorgu parametresini effect içinde state'e aktarması kaldırıldı; Next.js useSearchParams ve Suspense kullanılıyor. Genel ESLint artık hata vermiyor; dört mevcut img performans uyarısı kalıyor.
- Dört hukuki sayfada yönetim kuruluna hitap eden “belirlenmeli/açıklanmalıdır” türü taslak talimatları kaldırıldı. Bu metin temizliği, bilinmeyen hukuki dayanağı veya aktarım mekanizmasını tamamlamaz.
- Kullanıcı son talebinde mevcut değişikliklerin tamamının pushlanmasına açıkça izin verdi. Bu yayın kararı eksik hukuki mekanizmaları tamamlamaz.
- İletişim formunun telefon alanı ve gönderilen payload içindeki phone kaldırıldı. Admin mesaj sorgusu, araması ve görünümü artık telefon kullanmıyor. Mevcut veritabanındaki eski telefon kayıtları silinmedi.
- İncelenen tüzük: https://www.kaaflmezunder.org.tr/hakkimizda/dernek-tuzugu

## Son yayın kontrolü — 6 Eylül 2026

- Canlı site HTTPS üzerinden erişilebilir; sitemapteki 23 sayfa 200, olmayan sayfa 404, eski üyelik adresi 308 yanıtı verdi. Bu nedenle yukarıdaki “yayın yapılmadı” notu önceki revizyon anını anlatır; kesin deployment zamanı bu kontrolde doğrulanmadı.
- Canlı panel sahte admin çereziyle girişe yönlendirdi; yönetim API'si 401 döndü.
- Ana sayfa, iletişim, üyelik ve galeri 390/1440 piksel genişlikte kontrol edildi; yatay taşma, yüklenmiş kırık görsel veya JavaScript hatası görülmedi.
- Üretim derlemesi/TypeScript, yedi güvenlik testi, izole veritabanı güvenlik testi ve yerel tarayıcı güvenlik testi geçti. Üretim bağımlılıklarının npm audit sonucunda bildirilen açık sayısı sıfırdı.
- İletişim formunda beklenmeyen hatalarda gönderim durumunun temizlenmesi sağlandı. Bu hata yönetimi spam koruması değildir; doğrudan anonim Supabase yazma akışı için sunucu/veritabanı düzeyinde kötüye kullanım sınırı ayrıca uygulanmalıdır.
- Dokuz JSON-LD çıktısında `<` karakteri Unicode kaçışıyla yazılıyor; içerikteki script kapatma dizilerinin HTML'e dönüşmesi engellendi.
- Gerçek admin ile canlı kayıt/yükleme ve iletişim mesajı gönderme akışları bu kontrolde denenmedi; canlı veritabanı politikaları yeniden sorgulanmadı. Yukarıdaki hukuki ve kurumsal eksikler açık kalıyor.

## Görsel uyarıları düzeltmesi

Dört img uyarısının bulunduğu admin logosu ve fotoğraf büyütme alanları Next.js Image bileşenine geçirildi. Orijinal dosya kalitesi ve yükleme davranışı `unoptimized` ve `loading="eager"` ile korundu; bu değişiklik ek görsel sıkıştırma sağlamaz. Önceki kontrolün dört uyarısı giderildi; genel ESLint artık sıfır hata ve sıfır uyarıyla geçiyor.
