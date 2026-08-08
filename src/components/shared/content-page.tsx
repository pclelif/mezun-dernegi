import { PageHero } from "./page-hero";

type ContentPageProps = { title: string; description: string; children?: React.ReactNode };

export function ContentPage({ title, description, children }: ContentPageProps) {
  return <><PageHero title={title} description={description} /><section className="container-site section-space">{children ?? <p className="max-w-3xl text-lg leading-8 text-[#6C757D]">Bu sayfanın metin ve görselleri içerik çalışması sırasında eklenecek.</p>}</section></>;
}
