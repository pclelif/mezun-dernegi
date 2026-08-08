type PageHeroProps = { eyebrow?: string; title: string; description?: string };

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-[#6C757D]/20 bg-[#F1F3F5] py-12 text-black md:py-16">
      <div className="container-site">
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#EC1C24]">{eyebrow}</p>}
        <h1 className="max-w-4xl text-3xl font-bold md:text-4xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6C757D]">{description}</p>}
      </div>
    </section>
  );
}
