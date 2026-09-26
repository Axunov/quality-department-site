import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("quality surveys expose public pages and protected admin routes", () => {
  for (const kind of ["graduates", "doctoral"]) {
    assert.match(fs.readFileSync(`src/app/[locale]/surveys/${kind}/page.tsx`, "utf8"), new RegExp(`kind="${kind}"`));
    assert.match(fs.readFileSync(`src/app/[locale]/admin/surveys/${kind}/page.tsx`, "utf8"), new RegExp(`kind="${kind}"`));
  }
  const api = fs.readFileSync("src/app/api/admin/quality-surveys/[kind]/route.ts", "utf8");
  assert.match(api, /requireAdminMfa/);
});

test("quality survey database is private and validates rating counts", () => {
  const sql = fs.readFileSync("supabase/20260926_QUALITY_SURVEYS.sql", "utf8");
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /revoke all.*anon, authenticated/i);
  assert.match(sql, /cardinality\(ratings\)=9/);
  assert.match(sql, /cardinality\(ratings\)=19/);
});
