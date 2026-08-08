import type { ReactNode } from "react";
import { PageHero } from "./page-hero";

type ContentPageProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function ContentPage({ title, description, children }: ContentPageProps) {
  return (
    <>
      <PageHero title={title} description={description} />
      <section className="container-site section-space">
        {children ?? <p className="body-copy">Bu sayfanın metin ve görselleri içerik çalışması sırasında eklenecek.</p>}
      </section>
    </>
  );
}
