import { FAQAccordion } from "@/components/faq/faq-accordion";
import { ContentPage } from "@/components/shared/content-page";
const items = [{ id: "1", question: "Kimler üye olabilir?", answer: "Üyelik kapsamı ve koşulları dernek tüzüğüne göre burada açıklanacak." }, { id: "2", question: "Nasıl başvuru yapabilirim?", answer: "Üyelik başvuru formunu doldurarak süreci başlatabilirsiniz." }];
export default function Page() { return <ContentPage title="Sıkça Sorulan Sorular" description="Üyelik ve dernek çalışmaları hakkında merak edilenler."><FAQAccordion items={items} /></ContentPage>; }
