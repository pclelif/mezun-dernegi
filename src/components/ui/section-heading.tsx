type Props = { eyebrow?: string; title: string; centered?: boolean };

export function SectionHeading({ eyebrow, title, centered = false }: Props) {
  return <div className={`mb-8 ${centered ? "text-center" : ""}`}>{eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#1f5a40]">{eyebrow}</p>}<h2 className="text-3xl font-bold md:text-5xl">{title}</h2></div>;
}
