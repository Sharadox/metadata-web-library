import type { StructuredDataProperties } from "@sharadox/metadata-web-library/structured-data/type";

/**
 * Renders JSON-LD for search engines. `<` is escaped, so the data can never close the script tag early.
 *
 * @example
 * <StructuredData data={structuredDataGraph(organization, website)} />
 */
export function StructuredData({ data }: StructuredDataProperties) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
