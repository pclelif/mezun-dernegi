import type { ReactNode } from "react";

export const legalSectionClass = "space-y-4";
export const legalHeadingClass = "text-xl font-semibold text-gray-900 mt-8 mb-4";
export const legalSubheadingClass = "text-lg font-semibold text-gray-900 mt-6 mb-2";
export const legalListClass = "list-disc list-inside space-y-2 ml-4";
export const legalLinkClass =
  "font-semibold text-[#ec1c24] underline underline-offset-4 hover:text-red-700";

type LegalPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPage({ title, description, children }: LegalPageProps) {
  return (
    <>
      <header className="border-b border-zinc-200 bg-slate-50">
        <div className="mx-auto w-[min(100%-2rem,56rem)] py-10 md:w-[min(100%-4rem,56rem)] md:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">Yasal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
            {description}
          </p>
        </div>
      </header>

      <main className="mx-auto w-[min(100%-2rem,56rem)] py-12 md:w-[min(100%-4rem,56rem)] md:py-16">
        <article className="mx-auto max-w-3xl space-y-6 text-base leading-7 text-gray-600 [&_strong]:font-semibold [&_strong]:text-gray-900">
          {children}
        </article>
      </main>
    </>
  );
}
