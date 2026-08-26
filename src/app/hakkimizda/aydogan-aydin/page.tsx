import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { associationName } from "@/config/site";

export const metadata: Metadata = {
  title: "Vatansever Şehit Tümgeneral Aydoğan Aydın Kimdir?",
  description:
    "Vatansever Şehit Tümgeneral Aydoğan Aydın’ın hayatı, askerî hizmeti ve adının okulumuzda yaşatılan aziz hatırası.",
  alternates: {
    canonical: "/hakkimizda/aydogan-aydin",
  },
  openGraph: {
    title: `Vatansever Şehit Tümgeneral Aydoğan Aydın Kimdir? | ${associationName}`,
    description:
      "Vatansever Şehit Tümgeneral Aydoğan Aydın’ın hayatı, askerî hizmeti ve adının okulumuzda yaşatılan aziz hatırası.",
    url: "/hakkimizda/aydogan-aydin",
    images: ["/images/aydogan-aydin.jpg"],
  },
};

const biographySections = [
  {
    number: "01",
    title: "Hayatından",
    paragraphs: [
      "Vatansever Şehit Tümgeneral Aydoğan Aydın, Türk Silahlı Kuvvetleri bünyesinde uzun yıllar görev yapmış; meslek hayatı boyunca vatan hizmetini, sorumluluk bilincini ve silah arkadaşlarıyla dayanışmayı öncelemiş bir komutandır.",
      "Üstlendiği görevlerde edindiği tecrübe, sahadaki liderliği ve personeliyle kurduğu güçlü bağ sayesinde saygıyla anılan bir isim olmuştur.",
    ],
  },
  {
    number: "02",
    title: "Hatırasından",
    paragraphs: [
      "Vatansever Tümgeneral Aydoğan Aydın, 31 Mayıs 2017 tarihinde Şırnak’ın Uludere ilçesine bağlı Şenoba bölgesinde görev uçuşu yapan askerî helikopterin düşmesi sonucu silah arkadaşlarıyla birlikte şehit olmuştur.",
      "Aziz hatırası; ailesi, silah arkadaşları ve milletimiz tarafından minnet ve saygıyla yaşatılmaktadır.",
    ],
  },
  {
    number: "03",
    title: "Adı okulumuzda yaşıyor.",
    paragraphs: [
      "Vatansever Şehit Tümgeneral Aydoğan Aydın’ın adı okulumuzda yaşatılırken; vatan sevgisi, görev bilinci, cesaret ve fedakârlık gibi temsil ettiği değerler öğrencilerimize ve mezun topluluğumuza ilham vermeye devam etmektedir.",
      "Kendisini ve vatan uğruna şehit olan tüm kahramanlarımızı rahmet, minnet ve saygıyla anıyoruz.",
    ],
  },
];

export default function AydoganAydinPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hakkımızda", href: "/hakkimizda/dernek-hakkinda" },
          { name: "Aydoğan Aydın Kimdir?", href: "/hakkimizda/aydogan-aydin" },
        ]}
      />
      <article className="bg-white text-zinc-950">
        <div className="container-site py-10 md:py-14 lg:py-16">
          <div className="grid items-stretch gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-10">
            <div className="flex flex-col gap-7">
              <header>
                <p className="text-[0.8125rem] font-semibold uppercase leading-tight tracking-[0.02em] text-zinc-500">Hatırasına saygıyla</p>
                <h1 className="mt-1.5 text-2xl font-bold leading-tight tracking-tight text-zinc-950">Vatansever Şehit Tümgeneral Aydoğan Aydın Kimdir?</h1>
                <p className="mt-3 text-base leading-7 text-zinc-600">
                  Vatan hizmetine adanmış bir ömür ve gelecek nesillere emanet edilen kıymetli bir hatıra.
                </p>
                <div className="mt-5 h-px w-16 bg-zinc-950" aria-hidden="true" />
                <p className="mt-3 text-xs font-medium tracking-[0.14em] text-zinc-500">1966–2017</p>
              </header>

              <figure className="mt-auto w-full overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 p-2 shadow-xl shadow-black/20">
                <Image
                  src="/images/aydogan-aydin.jpg"
                  alt="Vatansever Şehit Tümgeneral Aydoğan Aydın askerî üniformasıyla selam verirken"
                  width={548}
                  height={446}
                  className="aspect-[548/446] h-auto w-full object-cover grayscale"
                  sizes="(max-width: 1024px) 100vw, 22rem"
                  priority
                />
              </figure>
            </div>

            <div className="grid gap-4 lg:grid-rows-2">
              {biographySections.slice(0, 2).map((section) => (
                <section key={section.number} className="flex flex-col justify-center rounded-sm border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-zinc-950/10 md:p-6">
                  <h2 className="text-xl font-semibold leading-7 tracking-tight text-white">{section.title}</h2>
                  <div className="mt-4 space-y-3 text-base leading-7 text-zinc-300">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <section className="mt-10 border-t border-zinc-200 pt-9 md:mt-12 md:pt-11">
            <h2 className="text-xl font-semibold leading-7 tracking-tight text-zinc-950">{biographySections[2].title}</h2>
            <div className="mt-4 space-y-3 text-base leading-7 text-zinc-700">
              <p>{biographySections[2].paragraphs[0]}</p>
              <p className="font-medium text-zinc-950">{biographySections[2].paragraphs[1]}</p>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
