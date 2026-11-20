import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");

test("monitoring counts forms per question and keeps rating scales distinct", async () => {
  const learning = JSON.parse(fs.readFileSync("src/data/learningQualitySurvey.json", "utf8"));
  const [q1,q2] = learning.questions;
  const rows = {
    survey_submissions: [{id:"a",final_satisfaction:5},{id:"b",final_satisfaction:4}],
    survey_teacher_answers: [
      {submission_id:"a",teacher_id:"t1",ratings:[5,0]},
      {submission_id:"a",teacher_id:"t2",ratings:[3,0]},
      {submission_id:"b",teacher_id:"t1",ratings:[4,5]},
      {submission_id:"unknown",teacher_id:"t2",ratings:[1,1]},
    ],
    student_survey_responses: [
      {survey_id:learning.id,answers:{[q1.id]:0,[q2.id]:3}},
      {survey_id:"other",answers:{[q1.id]:2,[q2.id]:0}},
    ],
    employer_survey_responses: [{recommendation_score:0,practice_rating:null,ratings:[10]}],
    quality_survey_responses: [{survey_type:"graduates",ratings:[5,null,0,1,1,1,1,1,4],answers:{suggestions:"private text"}}],
  };
  const cache = {};
  function load(file) {
    if (cache[file]) return cache[file].exports;
    const mod = cache[file] = {exports:{}};
    const options = {module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022};
    const source = ts.transpileModule(fs.readFileSync(file,"utf8"),{compilerOptions:options}).outputText;
    const localRequire = name => {
      if (name === "server-only") return {};
      if (name === "@/lib/surveyI18n") return {surveyText: (_,v)=>v};
      if (name.endsWith(".json")) return learning;
      if (name === "@/lib/supabase/admin") return {createAdminClient:()=>({from(table) {
        let data = rows[table] || [];
        return {select(){return this;},order(){return this;},eq(key,v){data=data.filter(r=>r[key]===v);return this;},range(){return {data,error:null};}};
      }})};
      return load("src/" + name.slice(2) + ".ts");
    };
    new Function("require","module","exports",source)(localRequire,mod,mod.exports);
    return mod.exports;
  }
  const {reports} = await load("src/lib/surveyMonitoring.ts").buildSurveyMonitoring("en",true);
  const [teacher,student,employer,graduate] = reports;
  assert.equal(teacher.total,2);
  assert.deepEqual(teacher.questions[0].values,[{label:"4",value:2}]);
  assert.equal(teacher.questions[1].total,2);
  assert.equal(teacher.questions[1].average,5);
  assert.equal(student.total,1);
  assert.deepEqual(student.questions[0].values,[{label:"Yes",value:1}]);
  assert.deepEqual(student.questions[1].values,[{label:"No",value:1}]);
  assert.equal(employer.average,0);
  assert.equal(employer.questions.find(q=>q.id==="employer-practice").total,0);
  assert.equal(graduate.average,4);
  assert.doesNotMatch(JSON.stringify(graduate),/private text/);
  for (const report of reports) for (const q of report.questions) {
    assert.ok(q.total <= report.total);
    assert.equal(q.total,q.values.reduce((sum,item)=>sum+item.value,0));
  }
});
