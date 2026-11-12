/** One part of an `llms.txt`: a heading and its lines (each becomes a list item unless `numbered` or `plain`). */
export interface LlmsSection {
  title: string;
  lines: readonly string[];
  /** "list" (the default), "numbered" for steps, or "plain" for paragraphs. */
  style?: "list" | "numbered" | "plain";
}

export interface LlmsTextOptions {
  /** The site's or business's name: the file's title. */
  title: string;
  /** One sentence on what it is, shown as the summary quote. */
  summary: string;
  /** A paragraph of detail after the summary. */
  details?: string;
  sections: readonly LlmsSection[];
}
