import Image from "next/image";

type OptimizedLightboxImageProps = {
  src: string;
  alt: string;
};

/**
 * Full-screen lightbox preview via next/image (cached on Vercel Edge).
 */
export function OptimizedLightboxImage({ src, alt }: OptimizedLightboxImageProps) {
  return (
    <div className="relative h-[min(80vh,900px)] w-[min(85vw,1200px)] max-w-[85vw]">
      <Image
        src={src}
        alt={alt}
        fill
        quality={75}
        sizes="85vw"
        priority
        className="rounded-xl object-contain"
      />
    </div>
  );
}
