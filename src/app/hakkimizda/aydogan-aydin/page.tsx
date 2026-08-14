import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Aydoğan Aydın Kimdir?",
  description:
    "Şehit Tümgeneral Aydoğan Aydın’ın hayatı, askerî hizmeti ve adının okulumuzda yaşatılan hatırası.",
};

export default function AydoganAydinPage() {
  return (
    <>
      <PageHero
        eyebrow="Hatırasına Saygıyla"
        title="Aydoğan Aydın Kimdir?"
        description="Vatan hizmetine adanmış bir ömür ve gelecek nesillere emanet edilen kıymetli bir hatıra."
      />

      <main className="container-site section-space">
        <article className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-zinc-700 md:text-lg">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Görev ve sorumluluk bilinci</h2>
            <p>
              Şehit Tümgeneral Aydoğan Aydın, Türk Silahlı Kuvvetleri bünyesinde uzun yıllar görev
              yapmış; meslek hayatı boyunca vatan hizmetini, sorumluluk bilincini ve silah
              arkadaşlarıyla dayanışmayı öncelemiş bir komutandır.
            </p>
            <p>
              Üstlendiği görevlerde edindiği tecrübe, sahadaki liderliği ve personeliyle kurduğu güçlü
              bağ sayesinde saygıyla anılan bir isim olmuştur.
            </p>
          </section>

          <section className="space-y-4 border-l-2 border-red-600 pl-5 md:pl-7">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Şehadeti</h2>
            <p>
              Tümgeneral Aydoğan Aydın, 31 Mayıs 2017 tarihinde Şırnak’ın Uludere ilçesine bağlı Şenoba
              bölgesinde görev uçuşu yapan askerî helikopterin düşmesi sonucu silah arkadaşlarıyla
              birlikte şehit olmuştur.
            </p>
            <p>
              Aziz hatırası; ailesi, silah arkadaşları ve milletimiz tarafından minnet ve saygıyla
              yaşatılmaktadır.
            </p>
          </section>

          <section className="rounded-xl border border-zinc-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Adı okulumuzda yaşıyor</h2>
            <p className="mt-4">
              Şehit Tümgeneral Aydoğan Aydın’ın adı okulumuzda yaşatılırken; vatan sevgisi, görev
              bilinci, cesaret ve fedakârlık gibi temsil ettiği değerler öğrencilerimize ve mezun
              topluluğumuza ilham vermeye devam etmektedir.
            </p>
            <p className="mt-4 font-semibold text-zinc-900">
              Kendisini ve vatan uğruna şehit olan tüm kahramanlarımızı rahmet, minnet ve saygıyla
              anıyoruz.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
