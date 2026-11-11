import { ImageResponse } from "next/og";
import type { ShareImageElement, ShareImageOptions } from "@sharadox/metadata-web-library/share-image/type";

/** The size Open Graph and Twitter cards expect. */
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * Renders a share card (Open Graph and Twitter image) from JSX as a PNG response, with the given fonts or, without
 * any, Next.js's built-in default font. Use it in
 * `opengraph-image.tsx` and `twitter-image.tsx`; the design stays in the site's own library.
 *
 * @example
 * export default async function Image() {
 *   return shareImage(<div style={{ display: "flex" }}>Sharadox</div>, { fonts: [{ name: "Geist", data: font }] });
 * }
 */
export function shareImage(
  element: ShareImageElement,
  { width = SHARE_IMAGE_SIZE.width, height = SHARE_IMAGE_SIZE.height, fonts }: ShareImageOptions = {},
): ImageResponse {
  // An empty font list would replace the default font and leave nothing to lay text out with.
  return new ImageResponse(element, fonts?.length ? { width, height, fonts } : { width, height });
}
