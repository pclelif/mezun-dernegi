import type { ReactNode } from "react";
import { PageHero } from "@/components/shared/page-hero";

export const legalSectionClass = "space-y-3";
export const legalHeadingClass = "text-lg font-bold text-zinc-950 mt-6 mb-2.5";
export const legalSubheadingClass = "text-base font-semibold text-zinc-950 mt-5 mb-2";
export const legalListClass = "list-disc list-inside space-y-1.5 ml-3";
export const legalLinkClass =
  "touch-manipulation font-semibold text-[#ec1c24] underline underline-offset-4 hover:text-red-700 active:text-red-700";

type LegalPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPage({ title, description, children }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow="YASAL"
        title={title}
        description={description}
        titleClassName="about-page__title"
        descriptionClassName="panel-copy--compact"
      />

      <main className="container-site py-10 md:py-14">
        <article className="max-w-3xl space-y-4 text-sm leading-6 text-zinc-600 sm:text-[0.9375rem] sm:leading-7 [&_strong]:font-semibold [&_strong]:text-zinc-950">
          {children}
        </article>
      </main>
    </>
  );
}
