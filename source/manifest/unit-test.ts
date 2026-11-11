import { expect, test } from "vitest";
import { DEFAULT_ICONS, webManifest } from "@sharadox/metadata-web-library/manifest";

test("makes an installable, standalone app with the default icons", () => {
  expect(webManifest({ name: "Sharadox", backgroundColor: "#000000", themeColor: "#000000" })).toEqual({
    id: "/",
    name: "Sharadox",
    short_name: "Sharadox",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: DEFAULT_ICONS,
  });
  expect(DEFAULT_ICONS.some((icon) => icon.purpose === "maskable" && icon.sizes === "512x512")).toBe(true);
});

test("takes a short name, description, id, start address and icons", () => {
  const manifest = webManifest({
    name: "Luis Pires Decor",
    shortName: "LP Decor",
    description: "Upholstery and interiors.",
    id: "/pt",
    startUrl: "/pt",
    backgroundColor: "#fff",
    themeColor: "#111",
    icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml" }],
  });
  expect(manifest).toMatchObject({
    short_name: "LP Decor",
    description: "Upholstery and interiors.",
    id: "/pt",
    start_url: "/pt",
  });
  expect(manifest.icons).toEqual([{ src: "/logo.svg", sizes: "any", type: "image/svg+xml" }]);
});
