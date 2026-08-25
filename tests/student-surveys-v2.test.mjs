import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration=readFileSync("supabase/STUDENT_SURVEYS_V2_BUILDER.sql","utf8");
const publicMigration=readFileSync("supabase/20260825_PUBLIC_STUDENT_SURVEY_LINKS.sql","utf8");
const publicList=readFileSync("src/components/surveys/PublicStudentSurveys.tsx","utf8");
const builder=readFileSync("src/components/admin/StudentSurveyBuilder.tsx","utf8");
const startApi=readFileSync("src/app/api/student/surveys/[id]/start/route.ts","utf8");
const submitApi=readFileSync("src/app/api/student/surveys/[id]/submit/route.ts","utf8");

test("generic student surveys keep identity and anonymous answers separate",()=>{
 assert.match(migration,/student_survey_assignments/);
 assert.match(migration,/student_survey_responses/);
 const responses=migration.match(/create table if not exists public\.student_survey_responses[\s\S]*?\n\);/)?.[0]||"";
 assert.doesNotMatch(responses,/access_code_id|participant_name|student_identifier|assignment_id/);
 assert.match(migration,/revoke all on function public\.student_generic_surveys\(text\) from public,anon,authenticated/);
});

test("public survey links replace the student account and remain multilingual",()=>{
 for(const source of [builder,publicList]) for(const locale of ["ru","uz","en"]) assert.match(source,new RegExp(`${locale}:\\s*\\{`));
 assert.match(builder,/minimum|5 ответов|5 tadan|fewer than 5/);
 assert.match(builder,/copyLink/);
 assert.match(publicList,/Регистрация и личный кабинет не требуются/);
 assert.doesNotMatch(startApi,/STUDENT_PORTAL_COOKIE|begin_generic_student_survey/);
 assert.match(submitApi,/hashPublicSurveyParticipant/);
 assert.match(submitApi,/rate_limited/);
 assert.match(publicMigration,/student_survey_public_participation/);
 assert.match(publicMigration,/enable row level security/);
 assert.match(publicMigration,/revoke all[\s\S]*from public, anon, authenticated/);
 const responses=publicMigration.match(/insert into public\.student_survey_responses[\s\S]*?;/)?.[0]||"";
 assert.doesNotMatch(responses,/participant_hash/);
});
