export interface SecurityTextOptions {
  /** Where to report a vulnerability: "mailto:security@example.com" or a web address. */
  contact: string | readonly string[];
  /** The file's own address, for example "https://example.com/.well-known/security.txt". */
  canonical: string;
  /** When the file stops being valid; a year after `now` by default (the standard asks for under a year). */
  expires?: Date;
  /** Languages reports are read in, for example ["en", "pt"]. */
  preferredLanguages?: readonly string[];
  /** A page with the security policy. */
  policy?: string;
  /** Today, for the default expiry (tests). */
  now?: Date;
}
