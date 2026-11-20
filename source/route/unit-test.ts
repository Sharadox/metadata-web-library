import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("not found");
  },
}));
const { fileRoute, localizedShareImage, securityTextRoute, socialImageRoute, textRoute } =
  await import("@sharadox/metadata-web-library/route");

const locales = { staticParams: () => [{ locale: "en" }, { locale: "pt" }] };
const context = <Parameters>(params: Parameters) => ({ params: Promise.resolve(params) });
afterEach(() => {
  vi.restoreAllMocks();
});

test("serves text as plain text, or as the type given", async () => {
  const response = await textRoute(() => "# Site").GET();
  expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
  expect(await response.text()).toBe("# Site");
  expect((await textRoute(async () => "x", "text/markdown").GET()).headers.get("content-type")).toBe("text/markdown");
});

test("serves a file from the application's folder, as Markdown by default", async () => {
  const application = mkdtempSync(join(tmpdir(), "route-"));
  writeFileSync(join(application, "LICENSE.md"), "# License");
  vi.spyOn(process, "cwd").mockReturnValue(application);
  const response = await fileRoute("LICENSE.md").GET();
  expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
  expect(await response.text()).toBe("# License");
});

test("serves the security.txt with its own address", async () => {
  const text = await (
    await securityTextRoute({
      contact: "mailto:security@example.com",
      url: "https://example.com",
      preferredLanguages: ["en"],
    }).GET()
  ).text();
  expect(text).toContain("Contact: mailto:security@example.com");
  expect(text).toContain("Canonical: https://example.com/.well-known/security.txt");
  expect(text).toContain("Preferred-Languages: en");
});

test("draws every social image in every language, and refuses other names", async () => {
  const render = vi.fn(({ locale, name }) => new Response(`${locale}/${name}`));
  const route = socialImageRoute({ locales, render });
  const parameters = route.generateStaticParams();
  expect(parameters).toContainEqual({ locale: "pt", name: "landscape.png" });
  expect(parameters).toHaveLength(2 * parameters.filter(({ locale }) => locale === "en").length);
  expect(
    await (
      await route.GET(new Request("https://example.com"), context({ locale: "en", name: "landscape.png" }))
    ).text(),
  ).toBe("en/landscape.png");
  await expect(
    route.GET(new Request("https://example.com"), context({ locale: "en", name: "other.png" })),
  ).rejects.toThrow("not found");
});

test("gives a share image's size, type, alt text and languages, and draws it at that size", async () => {
  const render = vi.fn(({ locale, width, height }) => new Response(`${locale} ${width}×${height}`));
  const image = localizedShareImage({ locales, alt: "Site", render });
  expect(image).toMatchObject({ size: { width: 1200, height: 630 }, contentType: "image/png", alt: "Site" });
  expect(image.generateStaticParams()).toEqual([{ locale: "en" }, { locale: "pt" }]);
  expect(await (await image.image(context({ locale: "pt" }))).text()).toBe("pt 1200×630");
});
