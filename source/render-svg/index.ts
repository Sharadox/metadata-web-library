import { Resvg } from "@resvg/resvg-js";
import type { RenderedImage } from "@sharadox/metadata-web-library/render-svg/type";

/**
 * Renders an SVG `size` pixels wide with resvg (the optional `@resvg/resvg-js` peer dependency), without system
 * fonts, so the same file gives the same pixels on every machine.
 *
 * @example
 * writeFileSync("public/icon-192.png", renderSvg(readFileSync("src/app/icon.svg", "utf8"), 192).png);
 */
export function renderSvg(svg: string, size: number): RenderedImage {
  const image = new Resvg(svg, { fitTo: { mode: "width", value: size }, font: { loadSystemFonts: false } }).render();
  return { size: image.width, png: new Uint8Array(image.asPng()), pixels: new Uint8Array(image.pixels) };
}
