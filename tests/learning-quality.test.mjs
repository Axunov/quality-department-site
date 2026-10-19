import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
const survey=JSON.parse(fs.readFileSync('src/data/learningQualitySurvey.json','utf8'));
const source=fs.readFileSync('src/lib/learningQuality.ts','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
const module={exports:{}};
vm.runInNewContext(compiled,{exports:module.exports,module,require:()=>survey});
const {validLearningAnswers,learningStats,safeCsvCell}=module.exports;
const answers=Object.fromEntries(survey.questions.slice(0,11).map(q=>[q.id,0]));
test('all 12 questions and answer options are translated; only the final comment is optional',()=>{
 assert.equal(survey.questions.length,12);
 for(const l of ['ru','uz','en']) {
  assert.ok(survey.title[l].includes('2026/2027'));
  for(const q of survey.questions){assert.ok(q.prompt[l]); for(const o of q.options) assert.ok(o[l]);}
 }
 assert.equal(survey.questions.filter(q=>q.required).length,11);
 assert.equal(survey.questions[10].options.length,3);
 assert.equal(survey.questions[11].required,false);
});
test('validates choice indices including zero, optional comments and malformed payloads',()=>{
 assert.equal(validLearningAnswers(answers),true);
 assert.equal(validLearningAnswers({...answers,[survey.questions[11].id]:'Предложение'}),true);
 for(const value of [null,[],{}, {...answers,unknown:1}, {...answers,[survey.questions[0].id]:5}, {...answers,[survey.questions[0].id]:'0'}, {...answers,[survey.questions[10].id]:3}, {...answers,[survey.questions[11].id]:'x'.repeat(3001)}]) assert.equal(validLearningAnswers(value),false);
});
test('uncertain answers are a separate category, not positive responses',()=>{
 const result=learningStats([{answers},{answers:{...answers,[survey.questions[0].id]:4}}]);
 assert.equal(result[0].total,2);
 assert.equal(result[0].counts[0],1);
 assert.equal(result[0].counts[4],1);
 assert.equal(result[10].counts[0],2);
});
test('CSV escapes quotes and neutralizes spreadsheet formulas',()=>{
 assert.equal(safeCsvCell('=1+1'),'"\'=1+1"');
 assert.equal(safeCsvCell(' @SUM(A1)'),'"\' @SUM(A1)"');
 assert.equal(safeCsvCell('a"b'),'"a""b"');
});
