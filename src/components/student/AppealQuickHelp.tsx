import Link from "next/link";
import { uzbekAlphabet } from "@/lib/uzbekAlphabet";
import { BookOpen, ChevronDown } from "lucide-react";
import { appealHelp, type AppealLocale } from "@/lib/appealHelp";

const labels = {
  ru: { title: "Быстрая справка", lead: "Откройте типовой вопрос или перейдите сразу к форме.", form: "Написать обращение", track: "Проверить статус", contacts: "Открыть контакты", documents: "Открыть документы", more: "Ещё вопросы" },
  uz: { title: "Tezkor yordam", lead: "Ko‘p beriladigan savolni oching yoki shaklga o‘ting.", form: "Murojaat yozish", track: "Holatni tekshirish", contacts: "Kontaktlarni ochish", documents: "Hujjatlarni ochish", more: "Boshqa savollar" },
  en: { title: "Quick help", lead: "Open a common question or go straight to the form.", form: "Write an appeal", track: "Check appeal status", contacts: "Open contacts", documents: "Open documents", more: "More questions" },
};

export default function AppealQuickHelp({ locale }: { locale: AppealLocale }) {
  const t = labels[locale];
  const localize = (value: string) => locale === "uz" ? uzbekAlphabet(value) : value;
  const ui = (key: keyof typeof t) => localize(t[key]);
  const items = (entries: typeof appealHelp) => entries.map(({ id, question, answer, target }) => (
    <details key={id} className="group rounded-2xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
        {localize(question[locale])}
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 group-open:rotate-180" />
      </summary>
      <div className="pb-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        <p>{localize(answer[locale])}</p>
        {target && <Link className="mt-2 inline-block font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300" href={target === "form" ? "#appeal-form" : target === "track" ? "#track" : `/${locale}/${target}`}>{ui(target)}</Link>}
      </div>
    </details>
  ));

  return (
    <section aria-labelledby="appeal-help-title" className="mb-8 rounded-3xl border border-blue-100 bg-blue-50/70 p-5 dark:border-slate-700 dark:bg-slate-900/80 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="appeal-help-title" className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white"><BookOpen aria-hidden="true" className="size-5 text-blue-600 dark:text-blue-300" />{ui("title")}</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{ui("lead")}</p>
        </div>
        <Link href="#appeal-form" className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800">{ui("form")}</Link>
      </div>
      <div className="mt-5 grid items-start gap-2 sm:grid-cols-2">{items(appealHelp.slice(0, 4))}</div>
      <details className="mt-3">
        <summary className="w-fit cursor-pointer rounded py-2 font-bold text-blue-700 dark:text-blue-300">{ui("more")}</summary>
        <div className="mt-2 grid items-start gap-2 sm:grid-cols-2">{items(appealHelp.slice(4))}</div>
      </details>
    </section>
  );
}
