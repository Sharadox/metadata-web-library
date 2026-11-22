/**
 * The images a brand posts on social media (banners, stories, profile covers), beside the profile picture the app
 * icon tool makes: the same background and mark, landscape (16:9) and portrait (9:16), each also with the site's
 * headline; the background alone, landscape, portrait and square; and the landscape headline as a small rounded card
 * for emails. Each says whether
 * it carries the `mark` and the `headline`, and its corners' `radius` (the rest is transparent). Sites draw the
 * smaller ones in proportion (`socialImageScale`). The mark takes half of the image's shorter side, as on the profile picture (`MARK_SHARE`).
 *
 * Each site draws them in its own library (with `shareImage`) and serves them at `/<locale>/social/<name>`, so they
 * are always in step with the brand and ready to download.
 */
export const SOCIAL_IMAGES = {
  "landscape.png": { width: 1920, height: 1080, mark: true, headline: false, radius: 0 },
  "portrait.png": { width: 1080, height: 1920, mark: true, headline: false, radius: 0 },
  "landscape-headline.png": { width: 1920, height: 1080, mark: true, headline: true, radius: 0 },
  "portrait-headline.png": { width: 1080, height: 1920, mark: true, headline: true, radius: 0 },
  /** The background alone, with nothing on it, to build other images on: landscape, portrait and square. */
  "background-landscape.png": { width: 1920, height: 1080, mark: false, headline: false, radius: 0 },
  "background-portrait.png": { width: 1080, height: 1920, mark: false, headline: false, radius: 0 },
  "background-square.png": { width: 1080, height: 1080, mark: false, headline: false, radius: 0 },
  /**
   * The landscape headline as a card to put in emails (an email signature), with slightly rounded corners: drawn at
   * three times the size it is shown at (`display`, 256 by 144), so it stays sharp on phones and high-density screens.
   */
  "email-card.png": {
    width: 768,
    height: 432,
    mark: true,
    headline: true,
    radius: 36,
    display: { width: 256, height: 144 },
  },
} as const;

/** How much smaller than the full-size images one is drawn (1 for those, 2/5 for the email card). */
export function socialImageScale({ width, height }: { width: number; height: number }) {
  return Math.min(width, height) / 1080;
}

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
