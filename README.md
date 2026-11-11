# @sharadox/metadata-web-library

Everything search engines, share cards and installation need from a Next.js site, built from a few facts about it.

- **Page metadata:** title and template, description, canonical address, hreflang alternates, Open Graph with locales, a large Twitter card, robots rules.
- **Search engine routes:** a localized sitemap with alternates, and robots rules.
- **Installation:** a web app manifest for an installable, online-only site (stable id, standalone window, icons including maskable).
- **Structured data:** JSON-LD rendered safely, and a graph helper to link several nodes.
- **Share images:** Open Graph and Twitter cards rendered from JSX with your fonts.

## Install

```sh
pnpm add @sharadox/metadata-web-library @sharadox/internationalization-web-library
```

## Use

```ts
// src/app/[locale]/layout.tsx
import { pageMetadata } from "@sharadox/metadata-web-library/page-metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata({
    name: "Sharadox",
    url: "https://sharadox.com",
    locales: LOCALES,
    locale,
    title: "Sharadox • Technologies that simplify the world",
    description: "…",
    titleTemplate: "%s • Sharadox",
  });
}
```

```ts
// src/app/sitemap.ts, robots.ts, manifest.ts
export default () => localizedSitemap({ url: "https://sharadox.com", locales: LOCALES, otherPriority: 0.9 });
export default () => robots({ url: "https://sharadox.com", indexable: true });
export default () => webManifest({ name: "Sharadox", backgroundColor: "#000000", themeColor: "#000000" });
```

```tsx
<StructuredData data={structuredDataGraph(organization, website)} />
```

```tsx
// src/app/[locale]/opengraph-image.tsx
export const size = SHARE_IMAGE_SIZE;
export default async function Image() {
  return shareImage(<div style={{ display: "flex" }}>Sharadox</div>, {
    fonts: [{ name: "Geist", data: font, weight: 600 }],
  });
}
```

## API

| Import                    | Export                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `…/page-metadata`         | `pageMetadata({ name, url, locales, locale, title, description, path?, titleTemplate?, keywords?, indexable? })` → Next.js `Metadata`                                                             |
| `…/sitemap`               | `localizedSitemap({ url, locales, paths?, priority?, otherPriority?, changeFrequency?, lastModified? })`                                                                                          |
| `…/robots`                | `robots({ url, indexable })`                                                                                                                                                                      |
| `…/manifest`              | `webManifest({ name, shortName?, description?, id?, startUrl?, backgroundColor, themeColor, icons? })`, `DEFAULT_ICONS` (`/icon.svg`, `/icon-192.png`, `/icon-512.png`, `/icon-maskable-512.png`) |
| `…/structured-data`       | `<StructuredData data>` (escapes `<`)                                                                                                                                                             |
| `…/structured-data-graph` | `structuredDataGraph(...nodes)` → `{ "@context", "@graph" }`                                                                                                                                      |
| `…/share-image`           | `shareImage(element, { width?, height?, fonts? })`, `SHARE_IMAGE_SIZE` (1200×630)                                                                                                                 |

## Develop

`pnpm verify` runs formatting, lint, type-check, tests with 100% coverage and the build. Branches follow `<feature>.development` → `development` → `index`, and releases are `v<version>` tags on `index`.

## License

Licença Sharadox de Código Aberto, versão 0.1.0. See [português](LICENCA.md) (the binding text) and the [English translation](LICENSE.md).
