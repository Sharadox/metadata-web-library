/** A square image rendered from SVG. */
export interface RenderedImage {
  /** Its width and height in pixels. */
  size: number;
  /** The image as a PNG file. */
  png: Uint8Array;
  /** Its pixels, four bytes each (red, green, blue, alpha), row by row. */
  pixels: Uint8Array;
}

/** Renders an SVG `size` pixels wide. */
export type RenderSvg = (svg: string, size: number) => RenderedImage;
