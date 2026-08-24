import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration=readFileSync("supabase/STUDENT_SURVEYS_V2_BUILDER.sql","utf8");
const dashboard=readFileSync("src/components/student/StudentDashboard.tsx","utf8");
const builder=readFileSync("src/components/admin/StudentSurveyBuilder.tsx","utf8");

test("generic student surveys keep identity and anonymous answers separate",()=>{
 assert.match(migration,/student_survey_assignments/);
 assert.match(migration,/student_survey_responses/);
 const responses=migration.match(/create table if not exists public\.student_survey_responses[\s\S]*?\n\);/)?.[0]||"";
 assert.doesNotMatch(responses,/access_code_id|participant_name|student_identifier|assignment_id/);
 assert.match(migration,/revoke all on function public\.student_generic_surveys\(text\) from public,anon,authenticated/);
});

test("survey builder and student account are multilingual",()=>{
 for(const source of [builder,dashboard]) for(const locale of ["ru","uz","en"]) assert.match(source,new RegExp(`${locale}:\\s*\\{`));
 assert.match(builder,/minimum|5 ответов|5 tadan|fewer than 5/);
 assert.match(dashboard,/anonymousDone/);
});
