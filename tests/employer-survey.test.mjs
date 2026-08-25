import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("employer survey is linked, validated and stored server-side", async () => {
  const [header, form, route, sql] = await Promise.all([
    read("src/components/layout/Header.tsx"),
    read("src/components/surveys/EmployerSurveyForm.tsx"),
    read("src/app/api/employer-survey/submit/route.ts"),
    read("supabase/employer-survey.sql"),
  ]);

  assert.match(header, /href: "\/surveys\/employers"/);
  assert.match(header, /Опрос работодателей/);
  assert.match(header, /Ish beruvchilar so‘rovi/);
  assert.match(header, /Employer survey/);
  assert.match(form, /\/api\/employer-survey\/submit/);
  assert.match(route, /createAdminClient/);
  assert.match(route, /body\.consent !== true/);
  assert.match(sql, /enable row level security/);
  assert.match(sql, /revoke all .* from public, anon, authenticated/);
  assert.match(sql, /drop column if exists suggested_subjects/);
});
