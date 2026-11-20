import { expect, test } from "vitest";
import {
  ApplicationIconError,
  applicationIconFiles,
  MARK_SHARE,
  markShare,
  withoutBackground,
} from "@sharadox/metadata-web-library/application-icons";
import { renderSvg } from "@sharadox/metadata-web-library/render-svg";

/** A black square with a white mark `share` of its side wide (and half as tall), centered. */
const master = (share: number, viewBox = "0 0 100 100") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><rect width="100" height="100" fill="#000"/>` +
  `<rect x="${50 - share * 50}" y="${50 - share * 25}" width="${share * 100}" height="${share * 50}" fill="#fff"/></svg>`;

test("makes every icon from a master whose mark is half its side", () => {
  const files = applicationIconFiles(master(MARK_SHARE), renderSvg);
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
  expect(() => applicationIconFiles(master(0.7), renderSvg)).toThrow("takes 70% of the icon's side; it must take 50%");
  expect(() => applicationIconFiles(master(0.3), renderSvg)).toThrow(ApplicationIconError);
  expect(applicationIconFiles(master(0.53), renderSvg, { tolerance: 0.05 })).toHaveLength(6);
  expect(() => applicationIconFiles(master(0.5, "0 0 100 80"), renderSvg)).toThrow("must be a square SVG");
  expect(() => applicationIconFiles(master(0.5).replace(/ viewBox="[^"]*"/, ""), renderSvg)).toThrow("square SVG");
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

test("measures the mark without a textured background, when the background is marked", () => {
  // A background that changes from corner to corner: a gradient, and a darker sheet over it.
  const textured = (marked: boolean) =>
    master(MARK_SHARE).replace(
      '<rect width="100" height="100" fill="#000"/>',
      `<g${marked ? ' id="background"' : ""}><defs><linearGradient id="g"><stop offset="0" stop-color="#222"/>` +
        '<stop offset="1" stop-color="#a80"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/>' +
        '<rect width="100" height="100" fill="#000" fill-opacity="0.3"/></g>',
    );
  expect(applicationIconFiles(textured(true), renderSvg)).toHaveLength(6);
  expect(() => applicationIconFiles(textured(false), renderSvg)).toThrow(ApplicationIconError);
  expect(withoutBackground('<svg><image id="background" href="x.jpg"/><path d="M0 0"/></svg>')).toBe(
    '<svg><path d="M0 0"/></svg>',
  );
  expect(withoutBackground(master(MARK_SHARE))).toBe(master(MARK_SHARE));
});
