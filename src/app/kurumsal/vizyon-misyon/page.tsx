import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { getSiteContent } from "@/lib/supabase/queries";
export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getSiteContent("hakkimizda", contentSections.hakkimizda.defaults);
  const visionText = content.vision || contentSections.hakkimizda.defaults.vision;
  const missionText = content.mission || contentSections.hakkimizda.defaults.mission;

  return (
    <ContentPage
      eyebrow="YOL HARİTAMIZ"
      title="Vizyonumuz ve Misyonumuz"
      description="Vizyonumuz geleceğe bakışımızı, misyonumuz ise bu doğrultuda üstlendiğimiz sorumlulukları ifade eder."
      titleClassName="panel-title--compact"
      descriptionClassName="panel-copy--compact"
    >
      <div className="grid max-w-5xl gap-6 md:grid-cols-2">
        <section className="border-l-2 border-red-600 pl-5">
          <h2 className="text-xl font-semibold leading-7 tracking-tight text-zinc-950">Vizyonumuz</h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            {visionText}
          </p>
        </section>
        <section className="border-l-2 border-red-600 pl-5">
          <h2 className="text-xl font-semibold leading-7 tracking-tight text-zinc-950">Misyonumuz</h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            {missionText}
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
