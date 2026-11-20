import { expect, test } from "vitest";
import * as renamed from "@sharadox/metadata-web-library/application-icons";
import * as deprecated from "@sharadox/metadata-web-library/app-icons";

test("the old path still gives the renamed functions for one version", () => {
  expect(deprecated.appIconFiles).toBe(renamed.applicationIconFiles);
  expect(deprecated.AppIconError).toBe(renamed.ApplicationIconError);
  expect(deprecated.MASTER_PATH).toBe(renamed.MASTER_PATH);
});
