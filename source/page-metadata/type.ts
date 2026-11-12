import type { Locales } from "@sharadox/internationalization-web-library/locale/type";

export interface PageMetadataOptions<Locale extends string> {
  /** The site's name, for example "Sharadox". */
  name: string;
  /** The public address without a trailing slash, for example "https://sharadox.com". */
  url: string;
  /** The site's locales (from `defineLocales`). */
  locales: Locales<Locale>;
  /** The locale of this page. */
  locale: Locale;
  /** The page title, as shown in search results and share cards. */
  title: string;
  /** The page description (about 150 characters). */
  description: string;
  /** The path after the locale, for example "/contact"; the home page by default. */
  path?: string;
  /** How sub-pages build their titles from this one; `%s` is the sub-page's title. Default: "%s · <name>", with the shared separator. */
  titleTemplate?: string;
  keywords?: readonly string[];
  /** False keeps the page out of search engines (previews, demos). True by default. */
  indexable?: boolean;
}
