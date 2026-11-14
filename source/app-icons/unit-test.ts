import { expect, test } from "vitest";
import { AppIconError, appIconFiles, MARK_SHARE, markShare } from "@sharadox/metadata-web-library/app-icons";
import { renderSvg } from "@sharadox/metadata-web-library/render-svg";

/** A black square with a white mark `share` of its side wide (and half as tall), centered. */
const master = (share: number, viewBox = "0 0 100 100") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><rect width="100" height="100" fill="#000"/>` +
  `<rect x="${50 - share * 50}" y="${50 - share * 25}" width="${share * 100}" height="${share * 50}" fill="#fff"/></svg>`;

test("makes every icon from a master whose mark is half its side", () => {
  const files = appIconFiles(master(MARK_SHARE), renderSvg);
  expect(files.map((file) => file.path)).toEqual([
    "src/app/favicon.ico",
    "src/app/apple-icon.png",
    "public/icon-192.png",
    "public/icon-512.png",
    "public/icon-maskable-512.png",
    "public/profile-picture.png",
  ]);
  const ico = new DataView(files[0]!.contents.buffer);
  expect([ico.getUint16(4, true), ico.getUint8(6), ico.getUint8(22), ico.getUint8(38)]).toEqual([3, 16, 32, 48]);
  const width = (png: Uint8Array) => new DataView(png.buffer).getUint32(16);
  expect(files.slice(1).map((file) => width(file.contents))).toEqual([180, 192, 512, 512, 1080]);
});

test("refuses a mark that isn't half the side, or a master that isn't square", () => {
  expect(() => appIconFiles(master(0.7), renderSvg)).toThrow("takes 70% of the icon's side; it must take 50%");
  expect(() => appIconFiles(master(0.3), renderSvg)).toThrow(AppIconError);
  expect(appIconFiles(master(0.53), renderSvg, { tolerance: 0.05 })).toHaveLength(6);
  expect(() => appIconFiles(master(0.5, "0 0 100 80"), renderSvg)).toThrow("must be a square SVG");
  expect(() => appIconFiles(master(0.5).replace(/ viewBox="[^"]*"/, ""), renderSvg)).toThrow("square SVG");
});

test("measures the mark against the background, and finds none on a plain image", () => {
  const plain = renderSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4"><rect width="4" height="4"/></svg>',
    8,
  );
  expect(markShare(plain.pixels, plain.size)).toBe(0);
  const marked = renderSvg(master(0.5), 200);
  expect(markShare(marked.pixels, marked.size)).toBeCloseTo(0.5, 2);
});
