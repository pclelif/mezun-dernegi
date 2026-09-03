import type { MetadataRoute } from "next";
import { associationDescription, associationName, associationShortName } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: associationName,
    short_name: associationShortName,
    description: associationDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ec1c24",
    icons: [
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
