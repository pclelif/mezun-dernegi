type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container-site">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {description && <p className="page-hero__description">{description}</p>}
      </div>
    </section>
  );
}
