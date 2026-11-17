import { expect, test } from "vitest";
import { isSocialImageName, SOCIAL_IMAGES, socialMarkSize } from "@sharadox/metadata-web-library/social-image";

test("has a landscape and a portrait image, each with and without the headline", () => {
  expect(Object.keys(SOCIAL_IMAGES)).toEqual([
    "landscape.png",
    "portrait.png",
    "landscape-headline.png",
    "portrait-headline.png",
  ]);
  for (const image of Object.values(SOCIAL_IMAGES)) expect(image.width * image.height).toBe(1920 * 1080);
});

test("draws the mark at half the shorter side: the height of a landscape image, the width of a portrait one", () => {
  expect(socialMarkSize(SOCIAL_IMAGES["landscape.png"])).toBe(540);
  expect(socialMarkSize(SOCIAL_IMAGES["portrait-headline.png"])).toBe(540);
});

test("knows its names", () => {
  expect(isSocialImageName("portrait.png")).toBe(true);
  expect(isSocialImageName("toString")).toBe(false);
});
