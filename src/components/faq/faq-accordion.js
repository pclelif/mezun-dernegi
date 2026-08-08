export function FAQAccordion({ items }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq__item" key={item.id}>
          <summary className="faq__question">{item.question}</summary>
          <p className="faq__answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
