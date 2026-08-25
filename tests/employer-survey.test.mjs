import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("employer survey is linked, protected, visible to admins and stored server-side", async () => {
  const [header, adminLayout, form, route, adminRoute, sql, securitySql] = await Promise.all([
    read("src/components/layout/Header.tsx"),
    read("src/app/[locale]/admin/layout.tsx"),
    read("src/components/surveys/EmployerSurveyForm.tsx"),
    read("src/app/api/employer-survey/submit/route.ts"),
    read("src/app/api/admin/employer-surveys/route.ts"),
    read("supabase/employer-survey.sql"),
    read("supabase/SITE_SECURITY_V1.sql"),
  ]);

  assert.match(header, /href: "\/surveys\/employers"/);
  assert.match(header, /Опрос работодателей/);
  assert.match(header, /Ish beruvchilar so‘rovi/);
  assert.match(header, /Employer survey/);
  assert.match(form, /\/api\/employer-survey\/submit/);
  assert.match(form, /data-action="employer_survey"/);
  assert.match(route, /createAdminClient/);
  assert.match(route, /body\.consent !== true/);
  assert.match(route, /rate_limited/);
  assert.match(route, /verifyTurnstile/);
  assert.match(adminLayout, /\/admin\/surveys\/employers/);
  assert.match(adminRoute, /user\.app_metadata\?\.role !== "admin"/);
  assert.match(adminRoute, /Cache-Control": "private, no-store"/);
  assert.match(sql, /enable row level security/);
  assert.match(sql, /revoke all .* from public, anon, authenticated/);
  assert.match(sql, /drop column if exists suggested_subjects/);
  assert.match(securitySql, /ip_hash text not null/);
  assert.match(securitySql, /revoke all .* from public, anon, authenticated/);
});
