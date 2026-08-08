import { ContentPage } from "@/components/shared/content-page";

export default function Page() {
  return (
    <ContentPage title="Başkanın Mesajı" description="Dernek başkanımızdan mezunlarımıza mesaj.">
      <article className="max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
          Başkanımızdan mezunlarımıza mesaj
        </h2>
        <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
          Dernek Başkanımızın mezunlarımıza yönelik mesajını okuyabilirsiniz.
        </p>
      </article>
    </ContentPage>
  );
}
