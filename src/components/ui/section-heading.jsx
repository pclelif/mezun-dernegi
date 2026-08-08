export function SectionHeading({ eyebrow, title, centered = false }) {
  return (
    <div className={`section-heading${centered ? " section-heading--center" : ""}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title">{title}</h2>
    </div>
  );
}
