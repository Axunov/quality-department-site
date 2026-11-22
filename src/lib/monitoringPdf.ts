import type { jsPDF } from "jspdf";
import type { SurveyReport } from "@/lib/surveyMonitoring";
import { monitoringFormat } from "@/lib/monitoringFormat";

const labels={
 ru:{heading:"Мониторинг качества образования",date:"Сформировано",forms:"Анкет получено",evaluations:"Оценок преподавателей",mean:"Средний балл",month:"Анкеты по месяцам",groups:"Учебные группы",languages:"Языки анкет",questions:"Результаты по вопросам",answered:"Анкет по вопросу",empty:"Пока нет данных для отчёта."},
 uz:{heading:"Ta’lim sifati monitoringi",date:"Tuzilgan sana",forms:"Qabul qilingan anketalar",evaluations:"O‘qituvchilarga berilgan baholar",mean:"O‘rtacha ball",month:"Oylar bo‘yicha anketalar",groups:"O‘quv guruhlari",languages:"Anketa tillari",questions:"Savollar natijalari",answered:"Savolga javob bergan anketalar",empty:"Hisobot uchun hali ma’lumot yo‘q."},
 en:{heading:"Education quality monitoring",date:"Generated",forms:"Forms received",evaluations:"Teacher evaluations",mean:"Average score",month:"Forms by month",groups:"Study groups",languages:"Survey languages",questions:"Question results",answered:"Forms answering this question",empty:"No data are available for this report yet."},
};
export function layOutReport(doc:jsPDF,fontBase64:string,report:SurveyReport,generatedAt:string,language:string){
 const l=language==="uz"||language==="en"?language:"ru", t=labels[l], fmt=monitoringFormat(l);
 doc.addFileToVFS("DejaVuSans.ttf",fontBase64);doc.addFont("DejaVuSans.ttf","DejaVu","normal");doc.setFont("DejaVu");
 let y=0;
 const reset=()=>{
  doc.setFillColor(16,53,99);doc.rect(0,0,210,18,"F");
  doc.setTextColor(255,255,255);doc.setFontSize(10);doc.text(t.heading,14,11);
  doc.setTextColor(22,42,65);y=29;
 };
 reset();
 const ensure=(h:number)=>{if(y+h>278){doc.addPage();reset();}};
 const words=(text:string,size:number)=>{doc.setFontSize(size);return doc.splitTextToSize(text,182) as string[];};
 const text=(value:string,size=10)=>{
  for(const line of words(value,size)){ensure(5);doc.setFontSize(size);doc.text(line,14,y);y+=size>=16?8:5;}
  y+=2;
 };
 const heading=(value:string,next=0)=>{ensure(12+next);doc.setTextColor(13,81,150);text(value,13);doc.setTextColor(22,42,65);};
 function bars(items:{label:string;value:number}[],base:number){
  for(const item of items){
   const label=words(item.label+"  ·  "+fmt.number(item.value)+(base?" ("+fmt.percent(item.value/base)+")":""),9);
   ensure(label.length*5+7);for(const line of label){doc.setFontSize(9);doc.text(line,14,y);y+=5;}
   doc.setFillColor(232,239,248);doc.rect(14,y-2,182,1.5,"F");
   doc.setFillColor(33,119,162);if(base&&item.value>0)doc.rect(14,y-2,182*item.value/base,1.5,"F");y+=4;
  }
 }
 text(report.title,17);text(`${t.date}: ${fmt.date(generatedAt)}`,9);
 text(`${t.forms}: ${fmt.number(report.total)}`,12);
 if(report.teacherEvaluations!==undefined)text(`${t.evaluations}: ${fmt.number(report.teacherEvaluations)}`);
 if(report.average!==null)text(`${t.mean}: ${fmt.number(report.average)}`);
 if(!report.total)text(t.empty);
 if(report.byPeriod.length){heading(t.month,12);bars(report.byPeriod.map(x=>({...x,label:fmt.month(x.label)})),report.total);}
 if(report.byCategory.length){heading(report.key==="teacher"?t.groups:t.languages,12);bars(report.byCategory,report.total);}
 const questions=report.questions.filter(q=>q.total>0&&q.values.length);
 if(questions.length)heading(t.questions,20);
 for(const [i,q] of questions.entries()){
  ensure(words(q.label,11).length*6+20);text(`${i+1}. ${q.label}`,11);
  text(`${t.answered}: ${fmt.number(q.total)}`+(q.average===null?"":` · ${t.mean}: ${fmt.number(q.average)}`),9);bars(q.values,q.total);y+=3;
 }
 const pages=doc.getNumberOfPages();
 for(let i=1;i<=pages;i++){doc.setPage(i);doc.setTextColor(89,107,126);doc.setFontSize(8);doc.text(`${i} / ${pages}`,196,288,{align:"right"});}
 return doc;
}
