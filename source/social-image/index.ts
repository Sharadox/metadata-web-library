/**
 * The images a brand posts on social media (banners, stories, profile covers), beside the profile picture the app
 * icon tool makes: the same background and mark, landscape (16:9) and portrait (9:16), each also with the site's
 * headline. The mark takes half of the image's shorter side, as on the profile picture (`MARK_SHARE`).
 *
 * Each site draws them in its own library (with `shareImage`) and serves them at `/<locale>/social/<name>`, so they
 * are always in step with the brand and ready to download.
 */
export const SOCIAL_IMAGES = {
  "landscape.png": { width: 1920, height: 1080, headline: false },
  "portrait.png": { width: 1080, height: 1920, headline: false },
  "landscape-headline.png": { width: 1920, height: 1080, headline: true },
  "portrait-headline.png": { width: 1080, height: 1920, headline: true },
} as const;

/** A social image's file name, such as `landscape.png`. */
export type SocialImageName = keyof typeof SOCIAL_IMAGES;

/** The mark's share of the image's shorter side: half, as on the profile picture. */
export const SOCIAL_MARK_SHARE = 0.5;

/**
 * How big the mark is drawn on a social image: half its shorter side (the height of a landscape image, the width of
 * a portrait one).
 *
 * @example
 * socialMarkSize(SOCIAL_IMAGES["landscape.png"]); // 540
 */
export function socialMarkSize({ width, height }: { width: number; height: number }) {
  return Math.round(Math.min(width, height) * SOCIAL_MARK_SHARE);
}

/** Whether a name is one of the social images, for routes that take it from the address. */
export function isSocialImageName(name: string): name is SocialImageName {
  return Object.hasOwn(SOCIAL_IMAGES, name);
}
