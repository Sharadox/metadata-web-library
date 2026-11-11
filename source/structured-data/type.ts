/** A schema.org JSON-LD object, for example `{ "@context": "https://schema.org", "@type": "Restaurant", … }`. */
export type JsonLinkedData = Readonly<Record<string, unknown>>;

export interface StructuredDataProperties {
  data: JsonLinkedData;
}
