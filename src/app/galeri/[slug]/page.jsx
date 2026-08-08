import { ContentPage } from "@/components/shared/content-page";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ContentPage title="Etkinlik galerisi" description={`Galeri: ${slug}`} />; }
