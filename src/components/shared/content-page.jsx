import { PageHero } from "./page-hero";

export function ContentPage({ title, description, children }) {
  return (
    <>
      <PageHero title={title} description={description} />
      <section className="container-site section-space">
        {children ?? <p className="body-copy">Bu sayfanın metin ve görselleri içerik çalışması sırasında eklenecek.</p>}
      </section>
    </>
  );
}
