import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";
const req=createRequire(import.meta.url),ts=req("typescript"),X=req("xlsx");
const cache=new Map();
function load(file){
 if(cache.has(file))return cache.get(file).exports;
 const mod={exports:{}};cache.set(file,mod);
 const out=ts.transpileModule(fs.readFileSync(file,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function("require","module","exports",out)(n=>n.startsWith("./")?load(path.join(path.dirname(file),n+".ts")):n.startsWith("@/")?load("src/"+n.slice(2)+".ts"):req(n),mod,mod.exports);
 return mod.exports;
}
const {aggregateWorkbook}=load("src/lib/institute/import.ts");
function workbook(rows){const b=X.utils.book_new();X.utils.book_append_sheet(b,X.utils.aoa_to_sheet(rows),"HEMIS");return X.write(b,{type:"buffer",bookType:"xlsx"});}
test("HEMIS student import reconciles gender, age, modes and programmes without releasing identifying columns",()=>{
 const headers=["Talaba ID","To‘liq ismi","Jins","Tug‘ilgan sana","O‘quv yili","Mutaxassislik","Ta’lim turi","Ta’lim shakli"];
 const rows=[[101,"Private Name","Ayol","2006-11-23","2026-2027","6-05-0716-01","Bakalavr","Kunduzgi"],[102,"Other Name","Erkak","2006-11-22","2026-2027","6-05-0716-01","Bakalavr","Masofaviy"],[103,"Old","Erkak","2005-01-01","2025-2026","6-05-0716-01","Bakalavr","Sirtqi"]];
 const a=aggregateWorkbook(workbook([headers,...rows]),"students","2026-11-22","2026-2027");
 assert.equal(a.total,2);assert.equal(a.excluded,1);assert.equal(a.gender.female,1);assert.equal(a.programmes.length,1);assert.equal(a.age.under20.full,1);assert.equal(a.age["20to24"].remote,1);
 assert.doesNotMatch(JSON.stringify(a),/Private Name|2006-11-23/);
 assert.throws(()=>aggregateWorkbook(workbook([headers,...rows,rows[0]]),"students","2026-11-22","2026-2027"),/duplicates/);
});
test("HEMIS staff import uses distinct people for qualifications and age and distinct memberships per department",()=>{
 const h=["Xodim ID","Ismi","Kafedra / Bo'lim","Lavozim","Ilmiy daraja","Tug‘ilgan sana"];
 const p=[["X101","Secret","Metrologiya","Dotsent","Fan nomzodi, PhD","22.11.1976"],["X101","Secret","Intellektual tizimlar","Dotsent","","22.11.1976"],["X102","Name","Intellektual tizimlar","Professor","Fan doktori, DSc","23.11.1985"],["X103","Other","Intellektual tizimlar","Secretary","","22.11.1992"]];
 const a=aggregateWorkbook(workbook([h,...p]),"staff","2026-11-22","");
 assert.equal(a.total,2);assert.equal(a.positions,3);assert.equal(a.doctoral,1);assert.equal(a.candidates,1);assert.equal(a.averageAge,45);
 assert.equal(a.departments.find(d=>d.key==="intelligence").total,2);
 assert.doesNotMatch(JSON.stringify(a),/X101|Secret|1976/);
});
test("monitoring PDF embeds a Unicode font and paginates populated questions",()=>{
 const {jsPDF}=req("jspdf"), {layOutReport}=load("src/lib/monitoringPdf.ts");
 const question={id:"x",label:"Ўзбекистон: качество образования, ta’lim sifati",total:10,average:3,values:[{label:"Согласен",value:10}]};
 const report={key:"teacher",title:"Преподаватель глазами студента",total:10,teacherEvaluations:17,average:3,byPeriod:[],byCategory:[],distributions:[],questions:Array.from({length:20},(_,i)=>({...question,id:String(i)}))};
 const doc=layOutReport(new jsPDF({unit:"mm",format:"a4"}),fs.readFileSync("public/DejaVuSans.ttf").toString("base64"),report,"2026-11-22T06:00:00Z","ru");
 assert.ok(doc.getNumberOfPages()>1);
 assert.match(doc.output(),/DejaVuSans/);
});
