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
        src: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  };
}
