import {accreditationPositions,positionLabel,type AccreditationLocale} from "./positions";

const projects={
  complex:{ru:"Комплексная государственная аккредитация",uz:"Kompleks davlat akkreditatsiyasi",en:"Comprehensive state accreditation"},
  "special-software-engineering":{ru:"Специальная аккредитация — Программная инженерия",uz:"Maxsus akkreditatsiya — Dasturiy ta’minot muhandisligi",en:"Special accreditation — Software Engineering"},
  "special-biomedical-instrumentation":{ru:"Специальная аккредитация — Приборостроение (биомедицинская инженерия)",uz:"Maxsus akkreditatsiya — Asbobsozlik (biotibbiyot muhandisligi)",en:"Special accreditation — Instrumentation (Biomedical Engineering)"},
} as const;
const statuses={ru:{draft:"Не начато",in_progress:"В работе",review:"На проверке",revision:"На доработке",approved:"Принято"},uz:{draft:"Boshlanmagan",in_progress:"Jarayonda",review:"Tekshiruvda",revision:"Qayta ishlashda",approved:"Qabul qilindi"},en:{draft:"Not started",in_progress:"In progress",review:"Under review",revision:"For revision",approved:"Approved"}};
const priorities={ru:{low:"Низкий",normal:"Обычный",high:"Высокий",critical:"Критический"},uz:{low:"Past",normal:"Oddiy",high:"Yuqori",critical:"Kritik"},en:{low:"Low",normal:"Normal",high:"High",critical:"Critical"}};
export const projectLabel=(code:string,l:AccreditationLocale)=>projects[code as keyof typeof projects]?.[l]||code;
export const statusLabel=(value:string,l:AccreditationLocale)=>statuses[l][value as keyof typeof statuses.ru]||value;
export const priorityLabel=(value:string,l:AccreditationLocale)=>priorities[l][value as keyof typeof priorities.ru]||value;
export const positionKeyLabel=(key:string|null|undefined,fallback:string|null|undefined,l:AccreditationLocale)=>positionLabel(accreditationPositions.find(x=>x.key===key)||accreditationPositions.find(x=>x.aliases.some(a=>a.toLowerCase()===String(fallback||"").toLowerCase()))||{key:"",ru:fallback||"—",uz:fallback||"—",en:fallback||"—",aliases:[]},l);
export function responsibleLabel(value:string|null|undefined,l:AccreditationLocale){
  if(!value)return "—";let result=value;
  const aliases=accreditationPositions.flatMap(p=>[p.ru,p.uz,p.en,...p.aliases].map(a=>({a,p}))).sort((a,b)=>b.a.length-a.a.length);
  for(const {a,p} of aliases)if(a&&result.toLowerCase().includes(a.toLowerCase()))result=result.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),positionLabel(p,l));
  return result;
}
export const internalEmail=(username:string)=>`${username.trim().toLowerCase()}@users.qualitydepartment.uz`;
export const normalizeUsername=(value:string)=>value.trim().toLowerCase().replace(/[^a-z0-9._-]/g,"");
