import { GalleryShowcase, type GalleryShowcaseItem } from "@/components/home/gallery-showcase";
import { getGalleries, getGalleryImages } from "@/lib/supabase/queries";

export async function HomeGallerySection() {
  let galleries: Awaited<ReturnType<typeof getGalleries>> = [];
  let items: GalleryShowcaseItem[] = [];
  try { galleries = await getGalleries(); } catch { return null; }
  if (galleries.length === 0) return null;

  try {
    const albumImages = await Promise.all(
      galleries.slice(0, 6).map(async (gallery) => ({
        gallery,
        images: await getGalleryImages(gallery.id),
      })),
    );

    items = albumImages
      .flatMap(({ gallery, images }) =>
        images.map((image) => ({
          id: image.id,
          title: gallery.title,
          href: `/galeri/${gallery.slug}`,
          imageUrl: image.image_url,
        })),
      )
      .slice(0, 12);

  } catch {
    return null;
  }

  if (items.length === 0) return null;
  return <GalleryShowcase items={items} displayMode="photos" />;
}
