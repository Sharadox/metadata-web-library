import { icoFile } from "@sharadox/metadata-web-library/ico";
import type { AppIconFile, AppIconOptions } from "@sharadox/metadata-web-library/app-icons/type";
import type { RenderSvg } from "@sharadox/metadata-web-library/render-svg/type";

/**
 * The mark's share of the icon's side. With the mark inside the middle half, it stays clear of every mask: circles,
 * rounded squares and the maskable icon's safe zone (a circle 80% wide). So one master works everywhere.
 */
export const MARK_SHARE = 0.5;

/** Where the master lives: `src/app/icon.svg`, which Next.js also serves as the SVG favicon. */
export const MASTER_PATH = "src/app/icon.svg";

/** Sizes measured: the mark is found at this size. */
const MEASURE_SIZE = 512;

/** Why a master can't make an app icon set. */
export class AppIconError extends Error {
  override name = "AppIconError";
}

/** The width and height of an SVG's `viewBox`, or undefined when it has none. */
function viewBox(svg: string): [number, number] | undefined {
  const match = /<svg\b[^>]*\bviewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/.exec(svg);
  return match ? [Number(match[1]), Number(match[2])] : undefined;
}

/**
 * The mark's share of a square image's side: the larger side of the box around every pixel that differs from the
 * top-left one (the background), over the image's side. 0 when the image is only background.
 */
export function markShare(pixels: Uint8Array, size: number): number {
  const distance = (at: number) =>
    Math.abs(pixels[at]! - pixels[0]!) +
    Math.abs(pixels[at + 1]! - pixels[1]!) +
    Math.abs(pixels[at + 2]! - pixels[2]!) +
    Math.abs(pixels[at + 3]! - pixels[3]!);
  let [left, top, right, bottom] = [size, size, -1, -1];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Antialiased edges barely differ from the background; they don't count.
      if (distance((y * size + x) * 4) <= 24) continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }
  return right < 0 ? 0 : Math.max(right - left + 1, bottom - top + 1) / size;
}

/**
 * Every app icon a site needs, made from one master: a square SVG with a full-bleed background and the mark taking
 * half of its side, centered (`MARK_SHARE`). The master stays `src/app/icon.svg`; from it come
 *
 * - `src/app/favicon.ico` (16, 32 and 48 pixels)
 * - `src/app/apple-icon.png` (180 pixels, the home screen icon on iPhone and iPad)
 * - `public/icon-192.png`, `public/icon-512.png` and `public/icon-maskable-512.png` (the web app manifest's icons)
 * - `public/profile-picture.png` (1080 pixels, for social profiles, so the same image shows everywhere)
 *
 * Throws an `AppIconError` when the master isn't square or the mark isn't half of its side.
 *
 * @example
 * for (const file of appIconFiles(readFileSync(MASTER_PATH, "utf8"), renderSvg)) writeFileSync(file.path, file.contents);
 */
export function appIconFiles(svg: string, render: RenderSvg, { tolerance = 0.02 }: AppIconOptions = {}): AppIconFile[] {
  const box = viewBox(svg);
  if (!box || box[0] !== box[1])
    throw new AppIconError("The master must be a square SVG, with a viewBox as wide as it is tall.");
  const measured = render(svg, MEASURE_SIZE);
  const share = markShare(measured.pixels, measured.size);
  if (Math.abs(share - MARK_SHARE) > tolerance)
    throw new AppIconError(
      `The mark takes ${Math.round(share * 100)}% of the icon's side; it must take ${MARK_SHARE * 100}%, centered on a full-bleed background.`,
    );
  const png = (size: number) => render(svg, size).png;
  return [
    { path: "src/app/favicon.ico", contents: icoFile([16, 32, 48].map((size) => ({ size, png: png(size) }))) },
    { path: "src/app/apple-icon.png", contents: png(180) },
    { path: "public/icon-192.png", contents: png(192) },
    { path: "public/icon-512.png", contents: png(512) },
    // The mark already sits inside the maskable safe zone, so the maskable icon is the same picture.
    { path: "public/icon-maskable-512.png", contents: png(512) },
    { path: "public/profile-picture.png", contents: png(1080) },
  ];
}
