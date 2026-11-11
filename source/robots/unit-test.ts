import { expect, test } from "vitest";
import { robots } from "@sharadox/metadata-web-library/robots";

test("allows everything with the sitemap when indexable", () => {
  expect(robots({ url: "https://sharadox.com", indexable: true })).toEqual({
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://sharadox.com/sitemap.xml",
    host: "https://sharadox.com",
  });
});

test("disallows everything otherwise", () => {
  expect(robots({ url: "https://example.com", indexable: false })).toEqual({
    rules: { userAgent: "*", disallow: "/" },
  });
});
