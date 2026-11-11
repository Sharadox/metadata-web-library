import type { LocalizedSitemapOptions, SitemapEntry } from "@sharadox/metadata-web-library/sitemap/type";

/**
 * A sitemap with one entry per page and locale, each listing every language version (hreflang) as an alternate.
 *
 * @example
 * // src/app/sitemap.ts
 * export default () => localizedSitemap({ url: "https://sharadox.com", locales: LOCALES, otherPriority: 0.9 });
 */
export function localizedSitemap<Locale extends string>({
  url,
  locales,
  paths = [""],
  priority = 1,
  otherPriority = priority,
  changeFrequency = "monthly",
  lastModified = new Date(),
}: LocalizedSitemapOptions<Locale>): SitemapEntry[] {
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.locales.map((locale) => [locale, `${url}${locales.localePath(locale, path)}`]),
    );
    return locales.locales.map((locale) => ({
      url: `${url}${locales.localePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority: locale === locales.defaultLocale ? priority : otherPriority,
      alternates: { languages },
    }));
  });
}
