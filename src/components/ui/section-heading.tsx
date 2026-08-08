type Props = { eyebrow?: string; title: string; centered?: boolean };

export function SectionHeading({ eyebrow, title, centered = false }: Props) {
  return <div className={`mb-6 ${centered ? "text-center" : ""}`}>{eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#EC1C24]">{eyebrow}</p>}<h2 className="text-2xl font-bold md:text-4xl">{title}</h2></div>;
}
