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

test("teacher survey opens publicly by group without a student account", async () => {
  const [migration,start,submit,form] = await Promise.all([
    readFile(new URL("../supabase/20260825_PUBLIC_TEACHER_SURVEY_LINK.sql",import.meta.url),"utf8"),
    readFile(new URL("../src/app/api/student/survey/start/route.ts",import.meta.url),"utf8"),
    readFile(new URL("../src/app/api/student/survey/submit/route.ts",import.meta.url),"utf8"),
    readFile(new URL("../src/components/surveys/TeacherSurveyForm.tsx",import.meta.url),"utf8"),
  ]);
  assert.doesNotMatch(start,/STUDENT_PORTAL_COOKIE|begin_teacher_survey_from_portal/);
  assert.match(start,/survey_groups/);assert.match(start,/groupId/);
  assert.match(submit,/submit_public_teacher_survey/);assert.match(submit,/hashPublicSurveyParticipant/);
  assert.match(form,/Выберите свою учебную группу/);assert.match(form,/O‘quv guruhingizni tanlang/);assert.match(form,/Select your study group/);
  assert.match(migration,/teacher_survey_public_participation/);assert.match(migration,/enable row level security/);
  assert.match(migration,/revoke all[\s\S]*from public,anon,authenticated/);
});

test("admin teacher survey dashboard uses anonymous public statistics",async()=>{const[admin,api]=await Promise.all([readFile(new URL("../src/components/admin/TeacherSurveyAdmin.tsx",import.meta.url),"utf8"),readFile(new URL("../src/app/api/admin/teacher-survey-stats/route.ts",import.meta.url),"utf8")]);assert.doesNotMatch(admin,/studentNames|participant_name|student_identifier|addParticipants/);assert.match(admin,/groupStats/);assert.match(admin,/teacherStats/);assert.match(admin,/Письменные ответы и сигналы/);for(const locale of ["ru","uz","en"])assert.match(admin,new RegExp(`${locale}:\\{`));assert.match(api,/requireAdminMfa/);assert.match(api,/teacher_survey_public_participation/);assert.doesNotMatch(api,/participant_hash/)});
