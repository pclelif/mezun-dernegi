type PageHeroProps = { eyebrow?: string; title: string; description?: string };

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b-4 border-[#EC1C24] bg-[#6C757D] py-12 text-white md:py-16">
      <div className="container-site">
        {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white">{eyebrow}</p>}
        <h1 className="max-w-4xl text-3xl font-bold md:text-4xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{description}</p>}
      </div>
    </section>
  );
}
