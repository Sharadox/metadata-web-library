import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { StructuredData } from "@sharadox/metadata-web-library/structured-data";
import { structuredDataGraph } from "@sharadox/metadata-web-library/structured-data-graph";

test("renders JSON-LD that can't close its script tag early", () => {
  const html = renderToStaticMarkup(<StructuredData data={{ "@type": "Thing", name: "</script><b>" }} />);
  expect(html).toBe('<script type="application/ld+json">{"@type":"Thing","name":"\\u003c/script>\\u003cb>"}</script>');
});

test("structuredDataGraph links several nodes in one document", () => {
  expect(structuredDataGraph({ "@type": "Organization" }, { "@type": "WebSite" })).toEqual({
    "@context": "https://schema.org",
    "@graph": [{ "@type": "Organization" }, { "@type": "WebSite" }],
  });
});
