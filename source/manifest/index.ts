import type { MetadataRoute } from "next";
import type { WebManifestOptions } from "@sharadox/metadata-web-library/manifest/type";

/** The icon files every installable Sharadox site ships in `public/`. */
export const DEFAULT_ICONS: NonNullable<WebManifestOptions["icons"]> = [
  { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
  { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
  { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
  { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
];

/**
 * The web app manifest of an installable, online-only site: it opens in its own window (`standalone`), with a
 * stable id, its colours and icons. No service worker or offline support is involved.
 *
 * @example
 * // src/app/manifest.ts
 * export default () => webManifest({ name: "Sharadox", backgroundColor: "#000000", themeColor: "#000000" });
 */
export function webManifest({
  name,
  shortName = name,
  description,
  id = "/",
  startUrl = "/",
  backgroundColor,
  themeColor,
  icons = DEFAULT_ICONS,
}: WebManifestOptions): MetadataRoute.Manifest {
  return {
    id,
    name,
    short_name: shortName,
    ...(description ? { description } : {}),
    start_url: startUrl,
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: icons.map((icon) => ({ ...icon })),
  };
}
