type FAQItem = { id: string; question: string; answer: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return <div className="divide-y divide-[#6C757D]/20 rounded-2xl border border-[#6C757D]/20">{items.map((item) => <details className="group p-5 open:border-l-4 open:border-[#EC1C24]" key={item.id}><summary className="cursor-pointer list-none font-bold">{item.question}</summary><p className="mt-4 leading-7 text-black">{item.answer}</p></details>)}</div>;
}
