type PageHeroProps = { eyebrow?: string; title: string; description?: string };

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-[#143d2b] py-16 text-white md:py-24">
      <div className="container-site">
        {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#e2c780]">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-bold md:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{description}</p>}
      </div>
    </section>
  );
}
