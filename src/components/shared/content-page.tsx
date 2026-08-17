import type { ReactNode } from "react";
import { PageHero } from "./page-hero";

type ContentPageProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  showContent?: boolean;
  children?: ReactNode;
};

export function ContentPage({ eyebrow, title, description, eyebrowClassName, titleClassName, descriptionClassName, showContent = true, children }: ContentPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} eyebrowClassName={eyebrowClassName} titleClassName={titleClassName} descriptionClassName={descriptionClassName} />
      {showContent && (
        <section className="container-site section-space">
          {children ?? <p className="body-copy">Bu sayfanın metin ve görselleri içerik çalışması sırasında eklenecek.</p>}
        </section>
      )}
    </>
  );
}
