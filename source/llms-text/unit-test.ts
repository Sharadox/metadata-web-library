import { expect, test } from "vitest";
import { llmsText } from "@sharadox/metadata-web-library/llms-text";

test("writes the title, summary, details and each kind of section", () => {
  expect(
    llmsText({
      title: "Example",
      summary: "A bakery in Faro.",
      details: "Since 1990.",
      sections: [
        { title: "What we bake", lines: ["Bread", "Cakes"] },
        { title: "How to order", lines: ["Call", "Collect"], style: "numbered" },
        { title: "About", lines: ["First.", "Second."], style: "plain" },
      ],
    }),
  ).toBe(
    "# Example\n\n> A bakery in Faro.\n\nSince 1990.\n\n## What we bake\n\n- Bread\n- Cakes\n\n## How to order\n\n1. Call\n2. Collect\n\n## About\n\nFirst.\n\nSecond.\n",
  );
});

test("works without details", () => {
  expect(llmsText({ title: "A", summary: "B.", sections: [] })).toBe("# A\n\n> B.\n");
});
