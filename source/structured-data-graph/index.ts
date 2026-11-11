import type { JsonLinkedData } from "@sharadox/metadata-web-library/structured-data/type";

/**
 * Wraps schema.org nodes in one JSON-LD document (`@context` and `@graph`), so a page can describe several linked
 * things (the business, the website, its services).
 *
 * @example
 * structuredDataGraph({ "@type": "Organization", name: "Sharadox" }, { "@type": "WebSite", url: "https://sharadox.com" });
 */
export function structuredDataGraph(...nodes: JsonLinkedData[]): JsonLinkedData {
  return { "@context": "https://schema.org", "@graph": nodes };
}
