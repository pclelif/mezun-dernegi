import { ContentPage } from "@/components/shared/content-page";

export default function Page() {
  return (
    <ContentPage title="Vizyon ve Misyon" description="Bizi geleceğe taşıyan amaçlarımız ve ortak değerlerimiz.">
      <div className="grid max-w-5xl gap-8 md:grid-cols-2">
        <section className="border-l-2 border-red-600 pl-5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Vizyonumuz</h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Mezunlarımız arasındaki iletişimi ve dayanışmayı güçlendiren, okulumuza ve mezun topluluğumuza değer katan sürdürülebilir bir dernek olmak.
          </p>
        </section>
        <section className="border-l-2 border-red-600 pl-5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Misyonumuz</h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Mezunlarımızı ortak bir platformda buluşturmak, sosyal ve mesleki iletişimi desteklemek ve okulumuzla olan bağı güçlendirmek.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
