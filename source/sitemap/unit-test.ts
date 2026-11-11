import { expect, test } from "vitest";
import { defineLocales } from "@sharadox/internationalization-web-library/locale";
import { localizedSitemap } from "@sharadox/metadata-web-library/sitemap";

const LOCALES = defineLocales({ locales: ["en", "pt"], defaultLocale: "en" });
const lastModified = new Date("2026-11-11T00:00:00Z");

test("lists every page in every locale with hreflang alternates", () => {
  const entries = localizedSitemap({
    url: "https://sharadox.com",
    locales: LOCALES,
    paths: ["", "/contact"],
    otherPriority: 0.9,
    lastModified,
  });
  expect(entries.map((entry) => [entry.url, entry.priority])).toEqual([
    ["https://sharadox.com/en", 1],
    ["https://sharadox.com/pt", 0.9],
    ["https://sharadox.com/en/contact", 1],
    ["https://sharadox.com/pt/contact", 0.9],
  ]);
  expect(entries[3]).toMatchObject({
    lastModified,
    changeFrequency: "monthly",
    alternates: { languages: { en: "https://sharadox.com/en/contact", pt: "https://sharadox.com/pt/contact" } },
  });
});

test("defaults to the home page, equal priorities and now", () => {
  const [entry, other] = localizedSitemap({ url: "https://example.com", locales: LOCALES, changeFrequency: "weekly" });
  expect(entry!.url).toBe("https://example.com/en");
  expect(other!.priority).toBe(1);
  expect(entry!.changeFrequency).toBe("weekly");
  expect(entry!.lastModified).toBeInstanceOf(Date);
});
