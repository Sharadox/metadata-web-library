/** One PNG image inside an icon file, square, `size` pixels wide (at most 256). */
export interface IcoImage {
  size: number;
  png: Uint8Array;
}

/**
 * Packs square PNG images into one Windows icon file (`favicon.ico`), the way browsers and Windows read it: a
 * header, one directory entry per image, then the images themselves.
 *
 * @example
 * writeFileSync("src/app/favicon.ico", icoFile([16, 32, 48].map((size) => ({ size, png: render(size) }))));
 */
export function icoFile(images: readonly IcoImage[]): Uint8Array {
  const header = 6;
  const entry = 16;
  const total = header + entry * images.length + images.reduce((sum, image) => sum + image.png.length, 0);
  const bytes = new Uint8Array(total);
  const view = new DataView(bytes.buffer);
  view.setUint16(2, 1, true); // type 1: icon
  view.setUint16(4, images.length, true);
  let offset = header + entry * images.length;
  images.forEach((image, index) => {
    const at = header + entry * index;
    if (image.size < 1 || image.size > 256)
      throw new RangeError(`An icon image is 1 to 256 pixels wide, not ${image.size}.`);
    // A width or height of 256 is written as 0.
    view.setUint8(at, image.size % 256);
    view.setUint8(at + 1, image.size % 256);
    view.setUint16(at + 4, 1, true); // color planes
    view.setUint16(at + 6, 32, true); // bits per pixel
    view.setUint32(at + 8, image.png.length, true);
    view.setUint32(at + 12, offset, true);
    bytes.set(image.png, offset);
    offset += image.png.length;
  });
  return bytes;
}
