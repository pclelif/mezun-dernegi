import { Download } from "lucide-react";
import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { getSiteContent } from "@/lib/supabase/queries";
export const dynamic = "force-dynamic";
export default async function Page() {
  const about = await getSiteContent("hakkimizda", contentSections.hakkimizda.defaults);
  return (
    <ContentPage
      eyebrow="Kurumsal Yapımız"
      title="Dernek Tüzüğü"
      description="Derneğimizin amaç, kapsam ve çalışma esasları."
      titleClassName="panel-title--compact"
      descriptionClassName="panel-copy--compact"
    >
      {about.charter_url ? (
        <a
          href={about.charter_url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-8 text-base font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
        >
          <Download className="size-5 shrink-0" aria-hidden="true" />
          Dernek Tüzüğünü İndir
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-8 text-base font-semibold text-white opacity-60"
        >
          <Download className="size-5 shrink-0" aria-hidden="true" />
          Dernek Tüzüğünü İndir
        </button>
      )}
    </ContentPage>
  );
}
