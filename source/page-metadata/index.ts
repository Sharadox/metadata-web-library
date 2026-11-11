import type { Metadata } from "next";
import type { PageMetadataOptions } from "@sharadox/metadata-web-library/page-metadata/type";

/**
 * Everything search engines and share cards need for a localized page, as a Next.js `Metadata` object: title and
 * template, description, canonical address and hreflang alternates, Open Graph (with the locale and its
 * alternatives), a large-image Twitter card and robots rules.
 *
 * @example
 * export async function generateMetadata({ params }) {
 *   const { locale } = await params;
 *   return pageMetadata({ name: "Sharadox", url: "https://sharadox.com", locales: LOCALES, locale,
 *     title: "Sharadox • Technologies that simplify the world", description: "…" });
 * }
 */
export function pageMetadata<Locale extends string>({
  name,
  url,
  locales,
  locale,
  title,
  description,
  path = "",
  titleTemplate = `%s | ${name}`,
  keywords,
  indexable = true,
}: PageMetadataOptions<Locale>): Metadata {
  const address = locales.localePath(locale, path);
  return {
    metadataBase: new URL(url),
    title: { default: title, template: titleTemplate },
    description,
    applicationName: name,
    authors: [{ name, url }],
    creator: name,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: { canonical: address, languages: locales.alternates(path) },
    openGraph: {
      type: "website",
      url: address,
      siteName: name,
      title,
      description,
      locale: locales.openGraphLocale(locale),
      alternateLocale: locales.locales
        .filter((other) => other !== locale)
        .map((other) => locales.openGraphLocale(other)),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: indexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
      : { index: false, follow: false },
    formatDetection: { telephone: false },
  };
}
