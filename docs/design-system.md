# Tasarım sistemi başlangıç kararları

## Renkler

- Gri `#6C757D`: Footer, ince sınırlar, nötr kart yüzeyleri ve ikincil metinlerde kullanılan yardımcı renk.
- Beyaz `#FFFFFF`: Ana sayfa zemini ve temiz, profesyonel yüzeyler.
- Kırmızı `#EC1C24`: Logodan gelen kontrollü vurgu rengi; buton, aktif menü öğesi ve kritik odak noktalarında kullanılır.
- Açık gri `#F1F3F5`: Bölüm arka planları, kartlar ve hafif ton farklılıkları için dengeleyici baz.
- Siyah `#000000`: Başlıklar ve ana gövde metinlerinde temel yazı rengi.

Sayfa zemini beyaz veya açık gri tutulur. Gri ve kırmızı, sayfayı bölen büyük bloklar ya da kalın şeritler halinde kullanılmaz. Kırmızı yalnızca kontrollü vurgu ve önemli aksiyon alanlarında yer alır. Yeni bir renk eklenmeden önce proje sahibinden onay alınmalıdır.

## Responsive yaklaşım

- Mobile-first CSS
- Temel mobil genişlik: 320–767 px
- Tablet: 768–1023 px
- Masaüstü: 1024 px ve üzeri
- İçerik maksimum genişliği: 1200 px
- Dokunma hedefleri minimum 44×44 px
- Mobil ve masaüstünde içerik sırası aynı; yalnızca yerleşim değişir

Uygulama Tailwind CSS ile mobile-first geliştirilir. Görünürlük ve yerleşim değişimleri
`hidden md:flex`, `md:hidden`, `grid md:grid-cols-2` gibi breakpoint yardımcılarıyla
bileşenin içinde açıkça tanımlanır. Sabit genişlik yerine akışkan genişlik ve ortak
`75rem` içerik sınırı kullanılır.

## Bileşen yaklaşımı

- `Card`, kart yüzeyi ve sınır davranışını paylaşan temel bileşendir.
- Duyuru, etkinlik ve yönetim kurulu kartları içerik türüne özel hiyerarşiyi korur.
- Ortak kart yüzeyi `0.5rem` radius, mobilde `1.25rem`, tablet ve üzerinde `1.5rem`
  iç boşluk kullanır. Görselin kenara oturduğu kartlar yalnızca `padding="none"` seçeneğini kullanır.
- Kartlar grid hücresinin yüksekliğini doldurur; içerik bileşenleri `min-width: 0` ve güvenli
  kelime kırma davranışıyla 320 px genişlikte yatay taşma oluşturmaz.
- Hover yalnızca border ve gölgeyi hafifçe güçlendirir. Kart içinde klavye odağı olduğunda
  ortak `focus-within` halkası, bağlantının kendisinde de `focus-visible` outline gösterilir.
- Ortak `Card` kendi başına tıklanabilir değildir. Etkileşim semantik `Link` veya `button`
  üzerinden sağlanır; böylece görsel tıklanabilirlik ile klavye davranışı ayrışmaz.
- Form alanları `FormInput`, `FormSelect` ve `FormTextarea` olarak tekrar kullanılır.
- Header mobil menüsü React state ile yönetilir; menü açıldığında sayfa kaydırması durur.

## Tasarım ilkeleri

- Görünüm resmi, kurumsal, profesyonel ve güven verici olmalıdır.
- Tipografi ölçülü tutulmalı; aşırı büyük başlık ve gereksiz dikey boşluk kullanılmamalıdır.
- Buton ve kartlarda küçük/orta köşe yarıçapı tercih edilmeli; kapsül butonlardan kaçınılmalıdır.
- Gradient, glow, gereksiz animasyon, ikon ve dekoratif efekt kullanılmamalıdır.
- Her içerik karta dönüştürülmemeli; içerik türüne göre liste, metin, tablo ve klasik bölüm düzeni seçilmelidir.
- Menü yapısı sade, anlaşılır ve klavye ile kullanılabilir olmalıdır.
- Responsive davranış mobile-first kurulmalı; mobil ve masaüstünde doğal içerik akışı korunmalıdır.
- Kullanılabilirlik, erişilebilirlik ve içerik hiyerarşisi görsel gösterişten önce gelmelidir.
- Her tasarım kararında gereklilik ve gerçek bir kurum sitesine uygunluk sorgulanmalıdır.
