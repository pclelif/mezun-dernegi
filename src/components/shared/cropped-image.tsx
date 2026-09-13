import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageCrop } from "@/lib/supabase/client";

type CroppedImageProps = {
  src: string;
  alt: string;
  crop?: ImageCrop | null;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
};

const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

function needsUnoptimized(src: string) {
  return src.startsWith("blob:") || src.startsWith("data:");
}

/**
 * Displays an original image through the selected crop window. No derivative
 * image is created: the same source can therefore always be opened in full.
 * Routes through next/image so Vercel Edge caches optimized variants.
 */
export function CroppedImage({
  src,
  alt,
  crop,
  className = "",
  sizes = DEFAULT_SIZES,
  quality = 75,
  priority = false,
}: CroppedImageProps) {
  const unoptimized = needsUnoptimized(src);

  if (crop?.fit === "contain") {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        quality={quality}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={`object-contain p-3 ${className}`}
      />
    );
  }

  const isValidCrop = Boolean(crop && crop.width > 0 && crop.height > 0 && crop.x >= 0 && crop.y >= 0);
  if (isValidCrop && crop) {
    const style: CSSProperties = {
      width: `${100 / crop.width}%`,
      height: "auto",
      maxWidth: "none",
      left: `${(-crop.x / crop.width) * 100}%`,
      top: `${(-crop.y / crop.height) * 100}%`,
      position: "absolute",
    };

    return (
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        quality={quality}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={`block max-w-none ${className}`}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      quality={quality}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      className={className.includes("object-") ? className : `object-cover ${className}`}
    />
  );
}
