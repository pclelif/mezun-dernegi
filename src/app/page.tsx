import Link from "next/link";
import { HomeEventsSection } from "@/components/home/home-events-section";
import { associationName } from "@/config/site";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <section className="bg-slate-50 px-4 py-20 md:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            {associationName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Bir okul. Binlerce hikâye. Tek bir aile. Geçmişimizin değerlerini koruyor, geleceğe yönelik yeni adımlar atıyoruz.
          </p>
          <Link
            href="/uyelik"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-[#ec1c24] px-8 font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            Derneğimize Üye Ol!
          </Link>
        </div>
      </section>

      <HomeEventsSection />
    </>
  );
}
