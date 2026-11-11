import type { RobotsOptions, RobotsRules } from "@sharadox/metadata-web-library/robots/type";

/**
 * robots.txt rules: everything allowed, with the sitemap and host, or everything disallowed while the site isn't
 * indexable.
 *
 * @example
 * // src/app/robots.ts
 * export default () => robots({ url: "https://sharadox.com", indexable: true });
 */
export function robots({ url, indexable }: RobotsOptions): RobotsRules {
  return indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${url}/sitemap.xml`, host: url }
    : { rules: { userAgent: "*", disallow: "/" } };
}
