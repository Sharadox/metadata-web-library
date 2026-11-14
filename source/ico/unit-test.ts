import { expect, test } from "vitest";
import { icoFile } from "@sharadox/metadata-web-library/ico";

test("writes a header, one entry per image and the images after them", () => {
  const small = new Uint8Array([1, 2, 3]);
  const large = new Uint8Array([4, 5]);
  const bytes = icoFile([
    { size: 16, png: small },
    { size: 256, png: large },
  ]);
  const view = new DataView(bytes.buffer);
  expect([view.getUint16(0, true), view.getUint16(2, true), view.getUint16(4, true)]).toEqual([0, 1, 2]);
  expect([bytes[6], bytes[7], view.getUint16(10, true), view.getUint16(12, true)]).toEqual([16, 16, 1, 32]);
  expect([view.getUint32(14, true), view.getUint32(18, true)]).toEqual([3, 38]);
  expect([bytes[22], bytes[23], view.getUint32(30, true), view.getUint32(34, true)]).toEqual([0, 0, 2, 41]);
  expect([...bytes.slice(38)]).toEqual([1, 2, 3, 4, 5]);
});

test("refuses images an icon file can't hold", () => {
  expect(() => icoFile([{ size: 512, png: new Uint8Array() }])).toThrow("1 to 256 pixels wide, not 512");
  expect(() => icoFile([{ size: 0, png: new Uint8Array() }])).toThrow(RangeError);
});
