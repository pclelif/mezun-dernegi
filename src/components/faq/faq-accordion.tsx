type FAQItem = { id: string; question: string; answer: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return <div className="divide-y rounded-2xl border border-black/10">{items.map((item) => <details className="group p-5" key={item.id}><summary className="cursor-pointer list-none font-bold">{item.question}</summary><p className="mt-4 leading-7 text-[#647068]">{item.answer}</p></details>)}</div>;
}
