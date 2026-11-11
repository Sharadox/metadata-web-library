export interface RobotsOptions {
  /** The site's public address without a trailing slash. */
  url: string;
  /** False keeps the whole site out of search engines (previews before a launch). */
  indexable: boolean;
}

/** The rules Next.js's `robots()` returns. */
export interface RobotsRules {
  rules: { userAgent: string; allow?: string; disallow?: string };
  sitemap?: string;
  host?: string;
}
