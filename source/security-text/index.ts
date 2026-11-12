import type { SecurityTextOptions } from "@sharadox/metadata-web-library/security-text/type";

const YEAR = 365 * 24 * 60 * 60 * 1000;

/**
 * A `security.txt` (RFC 9116): how to report a vulnerability in the site, served at `/.well-known/security.txt`. It
 * expires a year after it is built unless told otherwise, so a site rebuilt at least once a year stays valid.
 *
 * @example
 * // src/app/.well-known/security.txt/route.ts
 * export const GET = () => new Response(securityText({ contact: "mailto:security@example.com",
 *   canonical: "https://example.com/.well-known/security.txt" }), { headers: { "content-type": "text/plain" } });
 */
export function securityText({
  contact,
  canonical,
  now = new Date(),
  expires = new Date(now.getTime() + YEAR),
  preferredLanguages,
  policy,
}: SecurityTextOptions): string {
  return [
    ...[contact].flat().map((address) => `Contact: ${address}`),
    `Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, "Z")}`,
    ...(preferredLanguages?.length ? [`Preferred-Languages: ${preferredLanguages.join(", ")}`] : []),
    `Canonical: ${canonical}`,
    ...(policy ? [`Policy: ${policy}`] : []),
    "",
  ].join("\n");
}
