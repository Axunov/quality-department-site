import { read, utils, SSF } from "xlsx";
import { unzipSync } from "fflate";
import { ageBands, modes, type Mode, type Counts, type Programme, type AgeBand, type Students, type Staff } from "./types";

const clean = (v: unknown) => String(v ?? "").normalize("NFKC").trim();
const norm = (v: unknown) => clean(v).toLowerCase().replace(/ё/g,"е").replace(/['’‘ʻʼ`]/g,"").replace(/\s+/g," ");
const record = <K extends string,V>(keys:readonly K[], value:()=>V) => Object.fromEntries(keys.map(k=>[k,value()])) as Record<K,V>;
const counts = () => record(modes,()=>0);
const modesOf = (value:unknown):Mode => {
  const text = norm(value);
  if (/kunduz|очн|full/.test(text) && !/заоч/.test(text)) return "full";
  if (/sirtqi|заоч|part/.test(text)) return "part";
  if (/masof|дистан|distance/.test(text)) return "remote";
  return "other";
};

const degrees = (value:unknown) => {
  const text = norm(value);
  if (/\bdsc\b|доктор наук|fan doktori/.test(text)) return 3;
  if (/\bphd\b|кандидат наук|fan nomzodi/.test(text)) return 2;
  return text && !/^(-|—|нет|yoq|darajasiz|not specified|без степени)$/.test(text) ? 1 : 0;
};
const departmentKeys: [RegExp,string][] = [[/metrolog|метролог/,"metrology"],[/aniq|точн/,"science"],[/material|материал/,"materials"],[/iqtisod|эконом/,"economics"],[/mashina|машиностро/,"mechanical"],[/intellekt|интеллект/,"intelligence"]];
const band = (age:number|null):AgeBand => age===null?"unknown":age<20?"under20":age<25?"20to24":age<30?"25to29":age<40?"30to39":age<50?"40to49":age<60?"50to59":"60plus";

function date(value:unknown) {
  let y=0,m=0,d=0;
  if (typeof value==="number") { const x=SSF.parse_date_code(value);if(x)({y,m,d}=x); }
  else { const text=clean(value),iso=text.match(/^(\d{4})-(\d{2})-(\d{2})$/),dot=text.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if(iso)[y,m,d]=iso.slice(1).map(Number);else if(dot)[d,m,y]=dot.slice(1).map(Number);
  }
  const check=new Date(Date.UTC(y,m-1,d));
  if(check.getUTCFullYear()!==y||check.getUTCMonth()+1!==m||check.getUTCDate()!==d)return null;
  return {y,m,d};
}
const ageOn=(value:unknown,asOf:NonNullable<ReturnType<typeof date>>)=>{
  const dob=date(value);if(!dob)return null;
  const years=asOf.y-dob.y-Number(asOf.m*100+asOf.d<dob.m*100+dob.d);
  return years>=14&&years<=100?years:null;
};

const studentHeaders = { id:["Talaba ID","ID студента","Student ID"],gender:["Jins","Пол","Gender"],birth:["Tug‘ilgan sana","Дата рождения","Date of birth"],year:["O‘quv yili","Учебный год","Academic year"],code:["Mutaxassislik","Специальность","Код специальности","Programme code"],level:["Ta’lim turi","Вид образования","Уровень образования","Education level"],mode:["Ta’lim shakli","Форма обучения","Study mode"] };
const staffHeaders = { id:["Xodim ID","ID сотрудника","Employee ID"],dept:["Kafedra / Bo'lim","Кафедра / Отдел","Кафедра","Department"],position:["Lavozim","Должность","Position"],degree:["Ilmiy daraja","Ученая степень","Academic degree"],birth:["Tug‘ilgan sana","Дата рождения","Date of birth"] };
const teacher = /dotsent|доцент|assistent|ассистент|oqituvchi|преподавател|professor|профессор|kafedra mudiri|заведующ.*кафедр|lecturer|department head|teacher/i;

function workbookRows(bytes:Uint8Array, keys:Record<string,string[]>) {
  if(bytes.length>2_000_000 || bytes[0]!==80 || bytes[1]!==75) throw new Error("file");
  let expanded=0, entries=0;
  try {
    unzipSync(bytes,{filter:item=>{expanded+=item.originalSize; entries++; if(expanded>30_000_000||entries>500)throw new Error();return false;}});
  } catch { throw new Error("file"); }
  const b=read(bytes,{type:"array",sheetRows:20002,cellFormula:false,cellHTML:false,cellText:false});
  for(const name of b.SheetNames.slice(0,10)){
    const sheet=b.Sheets[name], range=utils.decode_range(sheet["!ref"]??"A1");
    if(range.e.c>127||range.e.r>20000)throw new Error("file");
    const rows=utils.sheet_to_json<unknown[]>(sheet,{header:1,blankrows:false,defval:null});
    if(rows.length>20000)throw new Error("file");
    for(let i=0;i<Math.min(8,rows.length);i++){
      const header=rows[i].map(norm);
      const map=Object.fromEntries(Object.entries(keys).map(([key,choices])=>[key,header.findIndex(v=>choices.map(norm).includes(v))]));
      if(Object.values(map).every(v=>v>=0))return rows.slice(i+1).map(row=>(key:string)=>row[map[key]]);
    }
  }
  throw new Error("columns");
}

export function aggregateWorkbook(bytes:Uint8Array, kind:"students"|"staff", asOf:string, year:string):Students|Staff {
  const day=date(asOf);
  if(!day||!/^\d{4}-\d{2}-\d{2}$/.test(asOf)||day.y<2000||day.y>2100)throw new Error("date");
  if(kind==="students"){
    if(!/^20\d{2}-20\d{2}$/.test(year)||Number(year.slice(5))!==1+Number(year.slice(0,4)))throw new Error("year");
    const result:Students={kind,asOf,year,total:0,excluded:0,gender:{male:0,female:0,unknown:0},modes:counts(),programmes:[],age:record(ageBands,counts)};
    const programmes=new Map<string,Programme>(),seen=new Set<string>();
    for(const get of workbookRows(bytes,studentHeaders)){
      const id=clean(get("id"));if(!id)continue;
      if(clean(get("year")).replace(/[–—/]/g,"-").replace(/\s/g,"")!==year){result.excluded++;continue;}
      if(seen.has(id))throw new Error("duplicates");
      seen.add(id);result.total++;
      const gender=norm(get("gender")),mode=modesOf(get("mode")),type=norm(get("level"));
      result.gender[/^(erkak|мужской|male|m)$/.test(gender)?"male":/^(ayol|женский|female|f)$/.test(gender)?"female":"unknown"]++;
      result.modes[mode]++;result.age[band(ageOn(get("birth"),day))][mode]++;
      const cell=clean(get("code")), code=cell.match(/^\d{1,3}(?:-\d{1,5}){1,4}(?=\s|$)/)?.[0]??cell;
      if(!/^[\d.-]{3,26}$/.test(code))throw new Error("programmes");
      const level=/bakal|бакал|bachelor/.test(type)?"bachelor":/magistr|магист|master/.test(type)?"master":"other";
      const key=level+":"+code, programme=programmes.get(key)??{code,level,counts:counts()};
      programme.counts[mode]++;programmes.set(key,programme);
    }
    if(!result.total)throw new Error("empty");
    result.programmes=[...programmes.values()].sort((a,b)=>a.level.localeCompare(b.level)||a.code.localeCompare(b.code));return result;
  }
  const result:Staff={kind,asOf,total:0,positions:0,doctoral:0,candidates:0,otherDegree:0,unknownDegree:0,averageAge:null,knownAge:0,age:record(ageBands,()=>0),departments:[]};
  const people=new Map<string,{age:number|null;degree:number}>(),depts=new Map<string,{ label:string; ids:Set<string> }>();
  for(const get of workbookRows(bytes,staffHeaders)){
    const id=clean(get("id"));if(!id||!teacher.test(norm(get("position"))))continue;
    result.positions++;
    const age=ageOn(get("birth"),day), degree=degrees(get("degree")), prev=people.get(id);
    if(prev && prev.age!==null && age!==null && prev.age!==age)throw new Error("duplicates");
    people.set(id,{degree:Math.max(prev?.degree??0,degree),age:prev?.age??age});
    const label=clean(get("dept"));
    // Only known institutional units can become public labels; new labels require mapping.
    const key=departmentKeys.find(([rx])=>rx.test(norm(label)))?.[1]??"other";
    const unit=depts.get(key)??{label:key,ids:new Set<string>()};unit.ids.add(id);depts.set(key,unit);
  }
  if(!people.size)throw new Error("empty");
  result.total=people.size;
  let ages=0;
  for(const p of people.values()){
    if(p.degree===3)result.doctoral++;else if(p.degree===2)result.candidates++; else if(p.degree===1)result.otherDegree++;else result.unknownDegree++;
    if(p.age!==null){result.knownAge++;ages+=p.age;}result.age[band(p.age)]++;
  }
  result.averageAge=result.knownAge?Math.round(ages/result.knownAge*10)/10:null;
  result.departments=[...depts].map(([key,{label,ids}])=>{
    const values=[...ids].map(id=>people.get(id)?.degree??0);
    return {key,label,total:ids.size,doctoral:values.filter(v=>v===3).length,candidates:values.filter(v=>v===2).length,otherDegree:values.filter(v=>v===1).length};
  }).sort((a,b)=>a.key.localeCompare(b.key));
  return result;
}
