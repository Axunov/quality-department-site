import type { Language } from "@/lib/institute/copy";
import type { Snapshot } from "@/lib/institute/types";
import { compareSnapshots } from "@/lib/institute/snapshotComparison";

const copy = {
  ru:{title:"Сравнение срезов",period:"Дата среза",total:"Численность",change:"Изменение",empty:"Для сравнения пока нет двух сопоставимых опубликованных срезов.",method:"Источник: HEMIS. Для сравнения берём предыдущую дату и одинаковую базу расчёта. Для студентов учебный год должен совпадать."},
  uz:{title:"Hisobotlarni taqqoslaş",period:"Hisobot sanasi",total:"Soni",change:"Özgariş",empty:"Hozirça taqqoslaş mumkin bölgan ikkita e’lon qilingan hisobot yöq.",method:"Manba: HEMIS. Taqqoslaşda oldingi sana va bir xil hisoblaş asosi olinadi. Talabalar uçun öquv yili mos kelişi kerak."},
  en:{title:"Compare snapshots",period:"Snapshot date",total:"Headcount",change:"Change",empty:"Two comparable published snapshots are not available yet.",method:"Source: HEMIS. Comparison uses a previous date and the same counting rules. Student snapshots must be from the same academic year."},
};

export function SnapshotComparison({lang,current,previous}:{lang:Language;current:Snapshot;previous:Snapshot|null}){
  const t=copy[lang],comparison=compareSnapshots(current,previous);
  const num=new Intl.NumberFormat(lang);
  const date=(value:string)=>new Intl.DateTimeFormat(lang,{dateStyle:"medium",timeZone:"UTC"}).format(new Date(value+"T00:00:00Z"));
  return <details className="campus-card">
    <summary className="cursor-pointer rounded font-bold focus-visible:outline-2 focus-visible:outline-offset-4">{t.title}</summary>
    <p className="mt-3 text-sm leading-6">{t.method}</p>
    {!comparison?<p className="mt-2 text-sm">{t.empty}</p>:
      <table className="mt-4 w-full table-fixed text-left text-sm">
        <thead><tr className="border-b"><th scope="col" className="py-2">{t.period}</th><th scope="col" className="py-2 text-right">{t.total}</th></tr></thead>
        <tbody>
          <tr className="border-b"><th scope="row" className="py-2 font-normal">{date(comparison.previousDate)}</th><td className="text-right">{num.format(comparison.previousTotal)}</td></tr>
          <tr className="border-b"><th scope="row" className="py-2 font-normal">{date(comparison.currentDate)}</th><td className="text-right">{num.format(comparison.currentTotal)}</td></tr>
          <tr><th scope="row" className="py-2">{t.change}</th><td className="text-right font-bold">{comparison.change>0?"+":""}{num.format(comparison.change)}</td></tr>
        </tbody>
      </table>}
  </details>;
}
