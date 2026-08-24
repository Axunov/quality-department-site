import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = [
  "supabase/teacher-survey-student-id-login.sql",
  "supabase/TEACHER_SURVEY_RECEIPT_CASE_FIX.sql",
];

test("anonymous survey receipt keeps its original case", async () => {
  for (const file of files) {
    const sql = await readFile(new URL(`../${file}`, import.meta.url), "utf8");

    assert.match(sql, /digest\(trim\(p_completion_receipt\), 'sha256'\)/);
    assert.doesNotMatch(sql, /digest\(upper\(trim\(p_completion_receipt\)\)/);
    assert.doesNotMatch(sql, /'receipt', upper\(trim\(p_completion_receipt\)\)/);
  }
});
