import { expect, test } from "vitest";
import {
  isSocialImageName,
  SOCIAL_IMAGES,
  socialImageScale,
  socialMarkSize,
} from "@sharadox/metadata-web-library/social-image";

test("has a landscape and a portrait image, each with and without the headline, the background alone in three shapes, and a card", () => {
  expect(Object.keys(SOCIAL_IMAGES)).toEqual([
    "landscape.png",
    "portrait.png",
    "landscape-headline.png",
    "portrait-headline.png",
    "background-landscape.png",
    "background-portrait.png",
    "background-square.png",
    "email-card.png",
  ]);
  const { "email-card.png": card, ...full } = SOCIAL_IMAGES;
  for (const image of Object.values(full)) expect(Math.min(image.width, image.height)).toBe(1080);
  expect(SOCIAL_IMAGES["background-landscape.png"]).toMatchObject({ mark: false, headline: false });
  expect(SOCIAL_IMAGES["background-square.png"]).toMatchObject({ width: 1080, height: 1080, mark: false });
  expect(card).toEqual({ width: 256, height: 144, mark: true, headline: true, radius: 12 });
});

test("draws the smaller images in proportion", () => {
  expect(socialImageScale(SOCIAL_IMAGES["portrait.png"])).toBe(1);
  expect(socialImageScale(SOCIAL_IMAGES["email-card.png"])).toBeCloseTo(2 / 15);
});

test("draws the mark at half the shorter side: the height of a landscape image, the width of a portrait one", () => {
  expect(socialMarkSize(SOCIAL_IMAGES["landscape.png"])).toBe(540);
  expect(socialMarkSize(SOCIAL_IMAGES["portrait-headline.png"])).toBe(540);
});

test("knows its names", () => {
  expect(isSocialImageName("portrait.png")).toBe(true);
  expect(isSocialImageName("toString")).toBe(false);
});
