import { describe, expect, test } from "vitest";
import { defineLocales } from "@sharadox/internationalization-web-library/locale";
import { pageMetadata } from "@sharadox/metadata-web-library/page-metadata";

const LOCALES = defineLocales({ locales: ["en", "pt"], defaultLocale: "en", languageTags: { pt: "pt-PT" } });
const base = {
  name: "Sharadox",
  url: "https://sharadox.com",
  locales: LOCALES,
  title: "Sharadox · Simple",
  description: "Studio.",
};

describe("pageMetadata", () => {
  test("describes a localized home page completely", () => {
    const metadata = pageMetadata({ ...base, locale: "pt", keywords: ["brand"] });
    expect(metadata.metadataBase).toEqual(new URL("https://sharadox.com"));
    expect(metadata).toMatchObject({
      title: { default: "Sharadox · Simple", template: "%s · Sharadox" },
      description: "Studio.",
      applicationName: "Sharadox",
      publisher: "Sharadox",
      appleWebApp: { title: "Sharadox", statusBarStyle: "black-translucent" },
      keywords: ["brand"],
      alternates: { canonical: "/pt", languages: { en: "/en", pt: "/pt", "x-default": "/en" } },
      openGraph: { type: "website", url: "/pt", locale: "pt_PT", alternateLocale: ["en_GB"], siteName: "Sharadox" },
      twitter: { card: "summary_large_image", title: "Sharadox · Simple" },
      robots: { index: true, follow: true },
      formatDetection: { telephone: false },
    });
  });

  test("handles sub-pages, a brand title template and pages kept out of search engines", () => {
    const metadata = pageMetadata({
      ...base,
      locale: "en",
      path: "/contact",
      titleTemplate: "%s · Sharadox",
      indexable: false,
    });
    expect(metadata.alternates).toEqual({
      canonical: "/en/contact",
      languages: { en: "/en/contact", pt: "/pt/contact", "x-default": "/en/contact" },
    });
    expect(metadata.title).toEqual({ default: "Sharadox · Simple", template: "%s · Sharadox" });
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata).not.toHaveProperty("keywords");
  });

  test("gives sub-pages the share card they would otherwise lose", () => {
    const metadata = pageMetadata({
      ...base,
      locale: "en",
      path: "/privacy",
      image: { path: "/en/opengraph-image", alt: "Sharadox" },
    });
    expect(metadata.openGraph).toMatchObject({
      images: [{ url: "/en/opengraph-image", width: 1200, height: 630, alt: "Sharadox" }],
    });
    expect(metadata.twitter).toMatchObject({ images: [{ url: "/en/opengraph-image", alt: "Sharadox" }] });
  });
});
