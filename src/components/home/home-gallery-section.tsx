import { GalleryShowcase, type GalleryShowcaseItem } from "@/components/home/gallery-showcase";
import { getAllGalleryImages } from "@/lib/supabase/queries";

export async function HomeGallerySection() {
  let images: Awaited<ReturnType<typeof getAllGalleryImages>> = [];
  try {
    images = await getAllGalleryImages();
  } catch {
    return null;
  }

  if (images.length === 0) return null;

  const items: GalleryShowcaseItem[] = images.slice(0, 12).map((image) => ({
    id: image.id,
    title: "",
    href: "/galeri",
    imageUrl: image.image_url,
  }));

  if (items.length === 0) return null;
  return <GalleryShowcase items={items} displayMode="carousel" showAllLink={true} />;
}
