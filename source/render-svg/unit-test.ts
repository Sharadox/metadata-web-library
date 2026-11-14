import { expect, test } from "vitest";
import { renderSvg } from "@sharadox/metadata-web-library/render-svg";

test("renders an SVG at the size asked, as a PNG and as pixels", () => {
  const image = renderSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#f00"/></svg>',
    16,
  );
  expect(image.size).toBe(16);
  expect([...image.png.slice(1, 4)].map((code) => String.fromCharCode(code)).join("")).toBe("PNG");
  expect(image.pixels.length).toBe(16 * 16 * 4);
  expect([...image.pixels.slice(0, 4)]).toEqual([255, 0, 0, 255]);
});
