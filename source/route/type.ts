import type { SecurityTextOptions } from "@sharadox/metadata-web-library/security-text/type";
import type { SocialImageName } from "@sharadox/metadata-web-library/social-image";

/** A site's languages, as `defineLocales` gives them. */
export interface RouteLocales {
  staticParams(): { locale: string }[];
}

/** A route's parameters, as Next.js passes them. */
export type RouteContext<Parameters> = { params: Promise<Parameters> };

export interface SecurityTextRouteOptions extends Omit<SecurityTextOptions, "canonical"> {
  /** The site's address, for example "https://example.com": the file's own address is built from it. */
  url: string;
}

export interface SocialImageRouteOptions<Locale extends string> {
  locales: RouteLocales;
  /** Draws one social image in one language. */
  render(options: { locale: Locale; name: SocialImageName }): Response | Promise<Response>;
}

export interface LocalizedShareImageOptions<Locale extends string> {
  locales: RouteLocales;
  /** What the image shows, for those who can't see it. */
  alt: string;
  /** Draws the share image in one language at the given size. */
  render(options: { locale: Locale; width: number; height: number }): Response | Promise<Response>;
}
