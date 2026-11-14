# @sharadox/metadata-web-library

Everything search engines, share cards and installation need from a Next.js site, built from a few facts about it.

- **Page metadata:** title and template, description, canonical address, hreflang alternates, Open Graph with locales, a large Twitter card, robots rules.
- **Search engine routes:** a localized sitemap with alternates, and robots rules.
- **Installation:** a web app manifest for an installable, online-only site (stable id, standalone window, icons including maskable).
- **App icons:** every icon a site needs (favicon, home screen, manifest, maskable, profile picture) made from one master.
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
    title: "Sharadox · Technologies that simplify the world",
    description: "…",
    titleTemplate: "%s · Sharadox",
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

## App icons

One master makes every icon. It is `src/app/icon.svg`, which Next.js also serves as the SVG favicon:

- a square `viewBox`
- a full-bleed background (no rounded corners; each platform applies its own mask)
- the mark centered, its larger side **half** of the icon's side

With the mark in the middle half, it stays clear of every mask (circles, rounded squares, and the maskable safe zone, a circle 80% wide), so the same picture serves as the favicon, the home screen icon, the maskable icon and the social profile picture.

```sh
pnpm add -D @resvg/resvg-js
pnpm exec app-icons            # or: app-icons path/to/master.svg
```

The command checks the master (square, mark at 50% ± 2%) and writes:

| File                           | Size             | Used for                                              |
| ------------------------------ | ---------------- | ----------------------------------------------------- |
| `src/app/favicon.ico`          | 16, 32 and 48 px | Browser tabs, bookmarks, Windows                      |
| `src/app/apple-icon.png`       | 180 px           | iPhone and iPad home screens                          |
| `public/icon-192.png`          | 192 px           | Web app manifest (`DEFAULT_ICONS`)                    |
| `public/icon-512.png`          | 512 px           | Web app manifest, install dialogs                     |
| `public/icon-maskable-512.png` | 512 px           | Android adaptive icons (the mark is in the safe zone) |
| `public/profile-picture.png`   | 1080 px          | Social profiles, so the same image shows everywhere   |

Commit the files; builds don't run the command. Run it again whenever the master changes.

## API

| Import                    | Export                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `…/page-metadata`         | `pageMetadata({ name, url, locales, locale, title, description, path?, titleTemplate?, keywords?, indexable?, image? })` → Next.js `Metadata`                                                     |
| `…/sitemap`               | `localizedSitemap({ url, locales, paths?, priority?, otherPriority?, changeFrequency?, lastModified? })`                                                                                          |
| `…/robots`                | `robots({ url, indexable })`                                                                                                                                                                      |
| `…/manifest`              | `webManifest({ name, shortName?, description?, id?, startUrl?, backgroundColor, themeColor, icons? })`, `DEFAULT_ICONS` (`/icon.svg`, `/icon-192.png`, `/icon-512.png`, `/icon-maskable-512.png`) |
| `…/structured-data`       | `<StructuredData data>` (escapes `<`)                                                                                                                                                             |
| `…/structured-data-graph` | `structuredDataGraph(...nodes)` → `{ "@context", "@graph" }`                                                                                                                                      |
| `…/share-image`           | `shareImage(element, { width?, height?, fonts? })`, `SHARE_IMAGE_SIZE` (1200×630)                                                                                                                 |
| `…/llms-text`             | `llmsText({ title, summary, details?, sections: [{ title, lines, style? }] })` → the site's `llms.txt` (llmstxt.org) for AI assistants                                                            |
| `…/app-icons`             | `appIconFiles(svg, render, { tolerance? })` → `[{ path, contents }]`, `markShare(pixels, size)`, `MARK_SHARE` (0.5), `MASTER_PATH`, `AppIconError`; the `app-icons` command                       |
| `…/render-svg`            | `renderSvg(svg, size)` → `{ size, png, pixels }` (resvg, the optional `@resvg/resvg-js` peer dependency)                                                                                          |
| `…/ico`                   | `icoFile([{ size, png }])` → a Windows icon file (`favicon.ico`) holding PNG images                                                                                                               |
| `…/security-text`         | `securityText({ contact, canonical, expires?, preferredLanguages?, policy? })` → `/.well-known/security.txt` (RFC 9116), valid a year from the build                                              |

## Develop

`pnpm verify` runs formatting, lint, type-check, tests with 100% coverage and the build. Branches follow `<feature>.development` → `development` → `index`, and releases are `v<version>` tags on `index`.

## License

Licença Sharadox de Código Aberto, versão 0.1.0. See [português](LICENCA.md) (the binding text) and the [English translation](LICENSE.md).
