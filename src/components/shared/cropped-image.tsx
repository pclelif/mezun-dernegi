import type { CSSProperties } from "react";
import type { ImageCrop } from "@/lib/supabase/client";

type CroppedImageProps = {
  src: string;
  alt: string;
  crop?: ImageCrop | null;
  className?: string;
};

/**
 * Displays an original image through the selected crop window. No derivative
 * image is created: the same source can therefore always be opened in full.
 */
export function CroppedImage({ src, alt, crop, className = "" }: CroppedImageProps) {
  const isValidCrop = crop && crop.width > 0 && crop.height > 0 && crop.x >= 0 && crop.y >= 0;
  const style: CSSProperties | undefined = isValidCrop
    ? {
        width: `${100 / crop.width}%`,
        height: "auto",
        maxWidth: "none",
        left: `${(-crop.x / crop.width) * 100}%`,
        top: `${(-crop.y / crop.height) * 100}%`,
      }
    : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={isValidCrop ? `absolute block max-w-none ${className}` : className}
      style={style}
    />
  );
}
