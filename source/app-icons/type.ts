/** A file the app icon set writes, relative to the application's folder. */
export interface AppIconFile {
  path: string;
  contents: Uint8Array;
}

export interface AppIconOptions {
  /** How far the mark's share of the side may be from one half; 0.02 by default (48% to 52%). */
  tolerance?: number;
}
