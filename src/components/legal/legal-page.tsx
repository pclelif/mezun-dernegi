import type { ReactNode } from "react";
import { PageHero } from "@/components/shared/page-hero";

export const legalSectionClass = "space-y-4";
export const legalHeadingClass = "text-xl font-semibold text-gray-900 mt-8 mb-4";
export const legalSubheadingClass = "text-lg font-semibold text-gray-900 mt-6 mb-2";
export const legalListClass = "list-disc list-inside space-y-2 ml-4";
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
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />

      <main className="mx-auto w-[min(100%-2rem,56rem)] py-12 md:w-[min(100%-4rem,56rem)] md:py-16">
        <article className="mx-auto max-w-3xl space-y-6 text-base leading-7 text-gray-600 [&_strong]:font-semibold [&_strong]:text-gray-900">
          {children}
        </article>
      </main>
    </>
  );
}
