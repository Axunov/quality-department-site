import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  accreditationSections,
  demoDepartments,
  statusLabels,
} from "@/lib/accreditation/config";

type Props = {
  params: Promise<{ locale: string; section: string }>;
};

const copy = {
  ru: {
    back: "Назад к аккредитации",
    overall: "Общая готовность",
    departments: "Подразделения и ответственные",
    evidence: "Доказательная база",
    evidenceText: "Здесь будут храниться документы, подтверждающие выполнение критериев и мероприятий.",
    comments: "Замечания и доработка",
    commentsText: "Администратор, отдел качества или директор сможет принять материал либо вернуть его на доработку с обязательным комментарием.",
    actions: "Доступные действия",
    upload: "Загрузить документ",
    submit: "Отправить на проверку",
    return: "Вернуть на доработку",
    approve: "Утвердить",
    indicators: "Индикаторы",
    documents: "Документы",
    remarks: "Замечания",
  },
  uz: {
    back: "Akkreditatsiyaga qaytish",
    overall: "Umumiy tayyorgarlik",
    departments: "Bo‘linmalar va mas’ullar",
    evidence: "Dalillar bazasi",
    evidenceText: "Bu yerda mezonlar va tadbirlar bajarilishini tasdiqlovchi hujjatlar saqlanadi.",
    comments: "Izohlar va qayta ishlash",
    commentsText: "Administrator, sifat bo‘limi yoki direktor materialni qabul qilishi yoxud izoh bilan qayta ishlashga qaytarishi mumkin.",
    actions: "Mavjud amallar",
    upload: "Hujjat yuklash",
    submit: "Tekshiruvga yuborish",
    return: "Qayta ishlashga qaytarish",
    approve: "Tasdiqlash",
    indicators: "Indikatorlar",
    documents: "Hujjatlar",
    remarks: "Izohlar",
  },
  en: {
    back: "Back to accreditation",
    overall: "Overall readiness",
    departments: "Departments and owners",
    evidence: "Evidence base",
    evidenceText: "Documents supporting compliance with criteria and planned actions will be stored here.",
    comments: "Comments and revision",
    commentsText: "An administrator, quality office or director can approve a submission or return it for revision with a mandatory comment.",
    actions: "Available actions",
    upload: "Upload document",
    submit: "Submit for review",
    return: "Return for revision",
    approve: "Approve",
    indicators: "Indicators",
    documents: "Documents",
    remarks: "Remarks",
  },
};

export default async function AccreditationSectionPage({ params }: Props) {
  const { locale, section } = await params;
  const currentLocale = locale === "uz" || locale === "en" ? locale : "ru";
  const t = copy[currentLocale];
  const item = accreditationSections.find((entry) => entry.slug === section);

  if (!item) notFound();

  const overall = Math.round(
    demoDepartments.reduce((sum, department) => sum + department.progress, 0) /
      demoDepartments.length
  );

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/accreditation" className="text-sm font-semibold text-blue-700 hover:underline">
          ← {t.back}
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-12">
          <div className="text-5xl">{item.icon}</div>
          <h1 className="mt-5 max-w-4xl text-3xl font-bold md:text-5xl">
            {item.title[currentLocale]}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            {item.description[currentLocale]}
          </p>

          <div className="mt-8 max-w-xl">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{t.overall}</span>
              <span>{overall}%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${overall}%` }} />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            [t.indicators, "272"],
            [t.documents, "150+"],
            [t.remarks, "4"],
          ].map(([label, value]) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-slate-950">{value}</div>
              <div className="mt-1 text-sm text-slate-500">{label}</div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-950">{t.departments}</h2>
          <div className="mt-6 space-y-4">
            {demoDepartments.map((department) => {
              const status = statusLabels[department.status as keyof typeof statusLabels][currentLocale];
              return (
                <article key={department.name} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{department.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{department.owner} · {status}</p>
                    </div>
                    <div className="w-full md:max-w-sm">
                      <div className="flex justify-between text-sm font-semibold text-slate-700">
                        <span>{department.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-blue-700" style={{ width: `${department.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">{t.evidence}</h2>
            <p className="mt-3 text-slate-600">{t.evidenceText}</p>
          </article>
          <article className="rounded-3xl border border-amber-200 bg-amber-50 p-7">
            <h2 className="text-xl font-bold text-amber-950">{t.comments}</h2>
            <p className="mt-3 text-amber-900/80">{t.commentsText}</p>
          </article>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-bold text-slate-950">{t.actions}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {[t.upload, t.submit, t.return, t.approve].map((label, index) => (
              <button
                key={label}
                type="button"
                disabled
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${index === 3 ? "bg-emerald-700 text-white" : index === 2 ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700"} disabled:cursor-not-allowed disabled:opacity-70`}
                title="Будет подключено к Supabase после применения SQL-схемы"
              >
                {label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
