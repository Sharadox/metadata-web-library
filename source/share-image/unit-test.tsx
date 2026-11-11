import { describe, expect, test, vi } from "vitest";

const ImageResponse = vi.fn();
vi.mock("next/og", () => ({ ImageResponse }));
const { SHARE_IMAGE_SIZE, shareImage } = await import("@sharadox/metadata-web-library/share-image");

describe("shareImage", () => {
  test("renders at the share-card size by default", () => {
    const element = <div>Sharadox</div>;
    shareImage(element);
    expect(ImageResponse).toHaveBeenLastCalledWith(element, { width: 1200, height: 630, fonts: [] });
    expect(SHARE_IMAGE_SIZE).toEqual({ width: 1200, height: 630 });
  });

  test("takes another size and fonts", () => {
    const font = { name: "Geist", data: new ArrayBuffer(1), weight: 600 as const };
    shareImage(<div />, { width: 800, height: 418, fonts: [font] });
    expect(ImageResponse).toHaveBeenLastCalledWith(expect.anything(), { width: 800, height: 418, fonts: [font] });
  });
});
