import type { ReactElement } from "react";

/** A font for the share image: its family name, file contents and weight. */
export interface ShareImageFont {
  name: string;
  data: ArrayBuffer | Buffer;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style?: "normal" | "italic";
}

export interface ShareImageOptions {
  /** 1200×630 by default, the size Open Graph and Twitter cards expect. */
  width?: number;
  height?: number;
  /** Next.js's built-in default font when none are given. */
  fonts?: ShareImageFont[];
}

export type ShareImageElement = ReactElement;
