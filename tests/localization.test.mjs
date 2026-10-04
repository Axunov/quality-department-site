import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const root = path.resolve('src');
let language = 'ru';
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const compiled = {exports:{}}; cache.set(file,compiled);
  const source = ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText;
  const localRequire = id => {
    if (id === 'next-intl') return {useLocale:()=>language};
    if (id === '@/i18n/routing') return {Link:({children,href,...props})=>React.createElement('a',{href,...props},children)};
    if (id === 'next/script') return {__esModule:true,default:()=>null};
    if (id === '@/lib/supabase/client') return {createClient:()=>({})};
    if (id.startsWith('@/')) {
      const base = path.join(root,id.slice(2));
      return load(fs.existsSync(base+'.ts')?base+'.ts':base+'.tsx');
    }
    if (id.startsWith('.')) { const base=path.resolve(path.dirname(file),id); return load(fs.existsSync(base+'.ts')?base+'.ts':base+'.tsx'); }
    return require(id);
  };
  vm.runInThisContext('(function(require,module,exports){'+source+'\n})',{filename:file})(localRequire,compiled,compiled.exports);
  return compiled.exports;
}
const {surveyText} = load('src/lib/surveyI18n.ts');
function render(file, props, overrides={}) {
  language = props.locale;
  const original = React.useState;
  let cursor = 0;
  React.useState = initial => {
    const state = original(initial); const index = cursor++;
    return index in overrides ? [overrides[index],state[1]] : state;
  };
  try { return renderToStaticMarkup(React.createElement(load(file).default,props)); }
  finally { React.useState = original; }
}
function assertLocalized(html) {
  const visible = html.replace(/<[^>]+>/g,' ');
  assert.doesNotMatch(visible,/[А-Яа-яЁё]/,'Russian text leaked into the translated interface');
  for (const attr of html.matchAll(/(?:placeholder|aria-label)="([^"]*)"/g)) assert.doesNotMatch(attr[1],/[А-Яа-яЁё]/);
}

test('every standard programme, rating and choice has Uzbek and English labels',()=>{
  const quality = load('src/data/qualitySurveys.ts');
  const employer = load('src/data/employerSurvey.ts');
  const hemis = load('src/data/hemisQuiz.ts');
  const phrases = [...quality.graduateProgrammes,...quality.graduateRatingItems,...quality.doctoralRatingItems,...employer.programmeOptions,...employer.ratingItems,...employer.graduateQualities,...employer.cooperationOptions,...employer.improvementOptions,...hemis.hemisQuizQuestions.flatMap(q=>[q.text,...q.options,q.explanation])];
  for(const locale of ['uz','en']) for(const phrase of phrases) assert.doesNotMatch(surveyText(locale,phrase),/[А-Яа-яЁё]/,`${locale}: ${phrase}`);
  assert.equal(surveyText('ru','1. Наименование организации'),'1. Наименование организации');
  assert.equal(surveyText('en','1. Наименование организации'),'1. Organisation name');
  assert.equal(surveyText('en','Новости'),'News');
  assert.equal(surveyText('uz','Документы'),'Hujjatlar');
  assert.equal(surveyText('en','Аккредитация'),'Accreditation');
});

test('all steps of graduate, doctoral and employer forms are fully localized',()=>{
  for (const locale of ['uz','en']) {
    for (const kind of ['graduates','doctoral']) for(let step=0;step<4;step++) {
      const html=render('src/components/surveys/QualitySurveyForm.tsx',{locale,kind},{0:step}); assertLocalized(html);
      if(kind==='doctoral'&&step===0) assert.match(html,/<option value="1-й курс">(?:1-bosqich|Year 1)<\/option>/);
      if(kind==='graduates'&&step===2) assert.match(html,/<option value="Да">(?:Ha|Yes)<\/option>/);
    }
    for(let step=0;step<5;step++) assertLocalized(render('src/components/surveys/EmployerSurveyForm.tsx',{locale},{0:step}));
    assertLocalized(render('src/components/surveys/QualitySurveyForm.tsx',{locale,kind:'graduates'},{2:true}));
  }
});

test('appeal form, receipt and tracking status use the chosen language',()=>{
  for(const locale of ['uz','en']) {
    assertLocalized(render('src/components/student/PublicAppealForm.tsx',{locale}));
    assertLocalized(render('src/components/student/PublicAppealForm.tsx',{locale},{1:true}));
    assertLocalized(render('src/components/student/PublicAppealForm.tsx',{locale},{3:{number:'APL-001',trackingCode:'test-code'}}));
    const html=render('src/components/student/PublicAppealForm.tsx',{locale},{7:{appeal_number:'APL-001',status:'in_review',subject:'Example',messages:[{body:'Example reply'}]}});
    assertLocalized(html); assert.match(html,locale==='en'?/Under review/:/Ko‘rib chiqilmoqda/);
  }
});

test('analytics translate stored canonical choices but preserve written comments',()=>{
  const comment='Student’s original comment';
  const row={id:'sample',created_at:'2026-09-30T00:00:00Z',locale:'ru',profile:{programme:'Биомедицинская инженерия',graduationYear:'2025'},ratings:Array(9).fill(4),choices:['Практические профессиональные навыки'],answers:{recommendation:'Да',firstJobTiming:'До окончания обучения',suggestions:comment}};
  for(const locale of ['uz','en']) {
    const html=render('src/components/admin/QualitySurveyAdmin.tsx',{locale,kind:'graduates'},{0:[row],2:false});
    assertLocalized(html);assert.ok(html.includes(comment));assert.doesNotMatch(html,/>recommendation:/);
  }
});

test('site components contain no untranslated static labels',()=>{
  function visitDirectory(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    const file=path.join(directory,entry.name);
    if(entry.isDirectory()){visitDirectory(file);continue;}
    if(!file.endsWith('.tsx'))continue;
    const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    function visit(node){
      if(ts.isJsxText(node))assert.doesNotMatch(node.text,/[А-Яа-яЁё]/,file);
      if(ts.isStringLiteral(node)&&ts.isJsxAttribute(node.parent)&&node.parent.name.getText(source)!=='value')assert.doesNotMatch(node.text,/[А-Яа-яЁё]/,file);
      ts.forEachChild(node,visit);
    }visit(source);
  }}visitDirectory(root);
});


test('service cards, accreditation tabs and indicator dialogs stay accessible and localized',()=>{
  for(const locale of ['ru','uz','en']) {
    language=locale;
    const {ServiceHub}=load('src/components/home/ServiceHub.tsx');
    const services=renderToStaticMarkup(React.createElement(ServiceHub,{locale}));
    for(const kind of ['teacher','employers','graduates','doctoral']) assert.ok(services.includes(`/surveys/${kind}`));
    assert.ok(services.includes('/appeals')); assert.ok(services.includes('/accreditation?type=special'));
    for(const type of ['complex','special']) {
      const tabs=render('src/components/accreditation/AccreditationOverview.tsx',{locale,initialType:type});
      assert.match(tabs,new RegExp(`id="accreditation-tab-${type}"[^>]+aria-selected="true"`));
      assert.ok(tabs.includes(`aria-labelledby="accreditation-tab-${type}"`));
      if(locale!=='ru') assertLocalized(tabs);
    }
    const dialog=render('src/components/accreditation/IndicatorDrawer.tsx',{locale,code:'1.1',title:'Example indicator',status:'Review',statusKind:'review',progress:25,dueDate:null,children:React.createElement('p',null,'Evidence details')});
    assert.match(dialog,/aria-haspopup="dialog"/);assert.match(dialog,/<dialog[^>]+aria-labelledby=/);
    assert.doesNotMatch(dialog,/<dialog[^>]+\sopen(?:=|>)/);assert.match(dialog,/data-status="review"/);
    if(locale!=='ru'){assertLocalized(services);assertLocalized(dialog);}
  }
});
