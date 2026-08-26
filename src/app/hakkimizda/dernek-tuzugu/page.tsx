import type { Metadata } from "next";
import { Download } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { associationName } from "@/config/site";
import { getSiteContent } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dernek Tüzüğü",
  description: `${associationName} resmî tüzüğü, dernek amaçları, çalışma esasları ve üyelik hükümleri.`,
  alternates: {
    canonical: "/hakkimizda/dernek-tuzugu",
  },
  openGraph: {
    title: `Dernek Tüzüğü | ${associationName}`,
    description: `${associationName} resmî tüzüğü, dernek amaçları, çalışma esasları ve üyelik hükümleri.`,
    url: "/hakkimizda/dernek-tuzugu",
  },
};

export default async function DernekTuzuguPage() {
  const about = await getSiteContent("hakkimizda", contentSections.hakkimizda.defaults);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hakkımızda", href: "/hakkimizda/dernek-hakkinda" },
          { name: "Dernek Tüzüğü", href: "/hakkimizda/dernek-tuzugu" },
        ]}
      />
      <ContentPage
        eyebrow="DERNEĞİMİZİN İLKELERİ"
        title="Dernek Tüzüğü"
        description="Derneğimizin amaç, kapsam ve çalışma esasları."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      >
        <div className="-mt-4 sm:-mt-8">
          {about.charter_url ? (
            <a
              href={about.charter_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-7 text-sm font-semibold text-white transition-colors hover:bg-red-700 active:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
            >
              <Download className="size-4 shrink-0" aria-hidden="true" />
              Dernek Tüzüğünü İndir
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-7 text-sm font-semibold text-white opacity-60"
            >
              <Download className="size-4 shrink-0" aria-hidden="true" />
              Dernek Tüzüğünü İndir
            </button>
          )}
        </div>
      </ContentPage>
    </>
  );
}
