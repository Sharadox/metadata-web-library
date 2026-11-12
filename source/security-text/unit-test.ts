import { expect, test } from "vitest";
import { securityText } from "@sharadox/metadata-web-library/security-text";

test("writes the fields the standard asks for, expiring a year later by default", () => {
  expect(
    securityText({
      contact: "mailto:security@sharadox.com",
      canonical: "https://sharadox.com/.well-known/security.txt",
      now: new Date("2026-11-12T10:20:30.456Z"),
    }),
  ).toBe(
    "Contact: mailto:security@sharadox.com\nExpires: 2027-11-12T10:20:30Z\nCanonical: https://sharadox.com/.well-known/security.txt\n",
  );
});

test("adds several contacts, languages and a policy when given", () => {
  const text = securityText({
    contact: ["mailto:a@example.com", "https://example.com/report"],
    canonical: "https://example.com/.well-known/security.txt",
    expires: new Date("2027-01-01T00:00:00Z"),
    preferredLanguages: ["en", "pt"],
    policy: "https://example.com/security",
  });
  expect(text).toContain("Contact: mailto:a@example.com\nContact: https://example.com/report\n");
  expect(text).toContain("Expires: 2027-01-01T00:00:00Z\nPreferred-Languages: en, pt\n");
  expect(text).toContain("Policy: https://example.com/security\n");
});
