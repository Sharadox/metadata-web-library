export interface WebManifestOptions {
  name: string;
  /** Shown under the home screen icon (about 12 characters); `name` by default. */
  shortName?: string;
  description?: string;
  /** A stable identity, so browsers treat the app as the same one if `startUrl` changes; "/" by default. */
  id?: string;
  /** "/" by default. */
  startUrl?: string;
  /** Splash and window colours. */
  backgroundColor: string;
  themeColor: string;
  /**
   * Icons; by default `/icon.svg` (any size), `/icon-192.png`, `/icon-512.png` and `/icon-maskable-512.png`
   * (purpose "maskable", with safe padding for round launchers).
   */
  icons?: { src: string; sizes: string; type: string; purpose?: "any" | "maskable" | "monochrome" }[];
}
