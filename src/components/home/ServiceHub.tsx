"use client";

import { useId, useState } from "react";
import { ArrowUpRight, GraduationCap, Presentation, BriefcaseBusiness, ClipboardCheck } from "lucide-react";
import { SpotlightCard, Reveal } from "@/components/motion/UnifiedMotion";
import { Link } from "@/i18n/routing";

const icons=[GraduationCap,Presentation,BriefcaseBusiness,ClipboardCheck];
const copy={
 ru:{
  heading:"Сервисы по ролям", all:"Все опросы", results:"Результаты опросов",
  roles:["Студенту","Преподавателю","Работодателю","Эксперту"],
  actions:[["Пройти студенческий опрос","Подать обращение","Проверить статус обращения"],["Пройти тест HEMIS","Открыть документы","Посмотреть результаты опросов"],["Пройти опрос работодателей","Открыть аналитику","Связаться с отделом"],["Войти в кабинет аккредитации","Комплексная аккредитация","Специализированная аккредитация"]],
 },
 uz:{
  heading:"Rollar böyiça xizmatlar", all:"Barça sörovlar", results:"Sörov natijalari",
  roles:["Talabaga","Öqituvçiga","Iş beruvçiga","Ekspertga"],
  actions:[["Talabalar sörovida qatnaşiş","Murojaat yuboriş","Murojaat holatini tekşiriş"],["HEMIS testidan ötiş","Hujjatlarni oçiş","Sörov natijalarini köriş"],["Iş beruvçilar sörovida qatnaşiş","Tahlilni oçiş","Bölim bilan boğlaniş"],["Akkreditatsiya kabinetiga kiriş","Kompleks akkreditatsiya","Maxsus akkreditatsiya"]],
 },
 en:{
  heading:"Services by role", all:"All surveys", results:"Survey results",
  roles:["Student","Teacher","Employer","Expert"],
  actions:[["Take a student survey","Submit an appeal","Track an appeal"],["Take the HEMIS test","Open documents","View survey results"],["Take the employer survey","Open institute analytics","Contact the department"],["Sign in to accreditation","Institutional accreditation","Programme accreditation"]],
 },
} as const;

const routes=[
 ["/surveys?audience=students","/appeals","/appeals#track"],
 ["/teacher/login","/documents","/monitoring"],
 ["/surveys/employers","/analytics","/contacts"],
 ["/accreditation/login","/accreditation?type=complex","/accreditation?type=special"],
] as const;

export function ServiceHub({locale}:{locale:string}){
 const t=copy[locale==="uz"||locale==="en"?locale:"ru"];
 const [role,setRole]=useState(0);
 const id=useId();
 return <SpotlightCard as="section" id="services" className="role-hub" labelledBy={id}>
   <h2 id={id} className="role-hub-heading">{t.heading}</h2>
   <div className="role-select" role="group" aria-labelledby={id}>
    {t.roles.map((label,index)=>{const Icon=icons[index];return <button key={label} type="button" aria-pressed={index===role} onClick={()=>setRole(index)}><Icon size={17} aria-hidden="true"/>{label}</button>})}
   </div>
   <div key={role} className="role-actions step-enter" aria-live="polite">
    {t.actions[role].map((label,index)=><Reveal key={label} delayMs={index*60}><Link href={routes[role][index]}><span>{label}</span><ArrowUpRight size={17} aria-hidden="true"/></Link></Reveal>)}
   </div>
   <div className="role-footer"><Link href="/surveys">{t.all}</Link><Link href="/monitoring">{t.results}</Link></div>
 </SpotlightCard>;
}
