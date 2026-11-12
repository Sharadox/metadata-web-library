import type { LlmsTextOptions } from "@sharadox/metadata-web-library/llms-text/type";

/**
 * An `llms.txt` (llmstxt.org): a site described in plain Markdown for AI assistants — a title, a one-sentence
 * summary, details, then sections of lists, steps or paragraphs. Serve it at `/llms.txt`.
 *
 * @example
 * llmsText({ title: "Example", summary: "A bakery in Faro.", sections: [{ title: "Contact", lines: ["Email: hi@example.com"] }] });
 */
export function llmsText({ title, summary, details, sections }: LlmsTextOptions): string {
  const blocks = [`# ${title}`, `> ${summary}`, ...(details ? [details] : [])];
  for (const { title: heading, lines, style = "list" } of sections) {
    const body =
      style === "plain"
        ? lines.join("\n\n")
        : lines.map((line, index) => `${style === "numbered" ? `${index + 1}.` : "-"} ${line}`).join("\n");
    blocks.push(`## ${heading}`, body);
  }
  return `${blocks.join("\n\n")}\n`;
}
