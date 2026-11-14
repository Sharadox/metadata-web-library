#!/usr/bin/env node
// The app-icons command: `app-icons [master]`, run from the application's folder.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { appIconFiles, MASTER_PATH } from "@sharadox/metadata-web-library/app-icons";
import { renderSvg } from "@sharadox/metadata-web-library/render-svg";

try {
  for (const file of appIconFiles(readFileSync(process.argv[2] ?? MASTER_PATH, "utf8"), renderSvg)) {
    mkdirSync(dirname(file.path), { recursive: true });
    writeFileSync(file.path, file.contents);
    console.log(file.path);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
