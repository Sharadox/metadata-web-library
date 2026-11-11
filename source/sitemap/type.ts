import type { Locales } from "@sharadox/internationalization-web-library/locale/type";

export interface LocalizedSitemapOptions<Locale extends string> {
  /** The site's public address without a trailing slash, for example "https://sharadox.com". */
  url: string;
  locales: Locales<Locale>;
  /** Paths after the locale; the home page (`""`) by default. */
  paths?: readonly string[];
  /** Priority of the default locale's pages; the others get `otherPriority`. */
  priority?: number;
  otherPriority?: number;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Now by default. */
  lastModified?: Date;
}

/** One sitemap entry, in the shape Next.js's `sitemap()` returns. */
export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: NonNullable<LocalizedSitemapOptions<string>["changeFrequency"]>;
  priority: number;
  alternates: { languages: Record<string, string> };
}
