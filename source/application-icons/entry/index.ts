#!/usr/bin/env node
// The application-icons command: `application-icons [master]`, run from the application's folder.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { applicationIconFiles, MASTER_PATH } from "@sharadox/metadata-web-library/application-icons";
import { renderSvg } from "@sharadox/metadata-web-library/render-svg";

try {
  for (const file of applicationIconFiles(readFileSync(process.argv[2] ?? MASTER_PATH, "utf8"), renderSvg)) {
    mkdirSync(dirname(file.path), { recursive: true });
    writeFileSync(file.path, file.contents);
    console.log(file.path);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
