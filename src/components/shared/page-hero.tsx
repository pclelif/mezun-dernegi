import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  icon?: ReactNode;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function PageHero({ eyebrow, title, description, icon, eyebrowClassName, titleClassName, descriptionClassName }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container-site">
        <div className={icon ? "flex items-start gap-3" : undefined}>
          {icon ? <span className="grid h-12 w-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">{icon}</span> : null}
          <div>
            {eyebrow && <p className={`eyebrow ${eyebrowClassName ?? ""}`.trim()}>{eyebrow}</p>}
            <h1 className={`page-hero__title ${titleClassName ?? ""}`.trim()}>{title}</h1>
            {description && (
              <p className={`page-hero__description ${descriptionClassName ?? ""}`.trim()}>{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
