import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { securityText } from "@sharadox/metadata-web-library/security-text";
import { SHARE_IMAGE_SIZE } from "@sharadox/metadata-web-library/share-image";
import { isSocialImageName, SOCIAL_IMAGES } from "@sharadox/metadata-web-library/social-image";
import type {
  LocalizedShareImageOptions,
  RouteContext,
  SecurityTextRouteOptions,
  SocialImageRouteOptions,
} from "@sharadox/metadata-web-library/route/type";

const PLAIN_TEXT = "text/plain; charset=utf-8";

/*
 * Route handlers for the files every site serves. Next.js reads a route's segment settings (`dynamic`,
 * `dynamicParams`) from the route file itself, so those stay there; the handlers come from here:
 *
 *   export const dynamic = "force-static";
 *   export const { GET } = securityTextRoute({ contact: "mailto:security@example.com", url: SITE.url });
 */

/** A text file made by `text` (an llms.txt, for example). */
export function textRoute(text: () => string | Promise<string>, contentType = PLAIN_TEXT) {
  return { GET: async () => new Response(await text(), { headers: { "content-type": contentType } }) };
}

/** A file from the application's folder, as published in the repository (the LICENSE.md, for example). */
export function fileRoute(path: string, contentType = "text/markdown; charset=utf-8") {
  return textRoute(() => readFile(join(process.cwd(), path), "utf8"), contentType);
}

/** The `/.well-known/security.txt` (RFC 9116), renewed for a year with every build. */
export function securityTextRoute({ url, ...options }: SecurityTextRouteOptions) {
  return textRoute(() => securityText({ ...options, canonical: `${url}/.well-known/security.txt` }));
}

/**
 * The images to post on social media, `/[locale]/social/[name]` (`/en/social/landscape.png`…): every name in
 * `SOCIAL_IMAGES` in every language, drawn at build time. Add `dynamic = "force-static"` and `dynamicParams = false`
 * in the route file.
 */
export function socialImageRoute<Locale extends string>({ locales, render }: SocialImageRouteOptions<Locale>) {
  return {
    generateStaticParams: () =>
      locales.staticParams().flatMap(({ locale }) => Object.keys(SOCIAL_IMAGES).map((name) => ({ locale, name }))),
    async GET(_request: Request, { params }: RouteContext<{ locale: string; name: string }>) {
      const { locale, name } = await params;
      if (!isSocialImageName(name)) notFound();
      return render({ locale: locale as Locale, name });
    },
  };
}

/**
 * A `[locale]/opengraph-image` or `twitter-image`: its size, type and alt text, one per language, and the image.
 *
 * @example
 * const share = localizedShareImage({ locales: LOCALES, alt: SITE.name, render: renderShareImage });
 * export const { size, contentType, alt, generateStaticParams } = share;
 * export default share.image;
 */
export function localizedShareImage<Locale extends string>({
  locales,
  alt,
  render,
}: LocalizedShareImageOptions<Locale>) {
  return {
    size: SHARE_IMAGE_SIZE,
    contentType: "image/png",
    alt,
    generateStaticParams: () => locales.staticParams(),
    image: async ({ params }: RouteContext<{ locale: string }>) =>
      render({ locale: (await params).locale as Locale, ...SHARE_IMAGE_SIZE }),
  };
}
