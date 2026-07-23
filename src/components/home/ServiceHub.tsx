import { Link } from "@/i18n/routing";
import { BarChart3, ClipboardCheck, FileText, HelpCircle, MessageSquareText, ShieldCheck } from "lucide-react";

const content = {
  ru: {
    label: "Быстрый доступ",
    title: "Сервисы системы качества",
    description: "Ключевые материалы и инструменты отдела собраны в одном месте.",
    items: [
      ["Аккредитация", "Подготовка, этапы и доказательная база", "/accreditation", ShieldCheck],
      ["Самооценка", "Внутренняя оценка и корректирующие меры", "/self-assessment", ClipboardCheck],
      ["Нормативная база", "Положения, регламенты и формы", "/documents", FileText],
      ["Мониторинг", "Направления контроля качества", "/monitoring", BarChart3],
      ["Обращения", "Предложения, замечания и обратная связь", "/appeals", MessageSquareText],
      ["Частые вопросы", "Краткие ответы о работе отдела", "/faq", HelpCircle],
    ],
  },
  uz: {
    label: "Tezkor kirish", title: "Sifat tizimi xizmatlari", description: "Bo‘limning asosiy materiallari va vositalari bir joyda jamlangan.",
    items: [
      ["Akkreditatsiya", "Tayyorgarlik, bosqichlar va dalillar bazasi", "/accreditation", ShieldCheck],
      ["O‘zini o‘zi baholash", "Ichki baholash va tuzatish choralari", "/self-assessment", ClipboardCheck],
      ["Me’yoriy baza", "Nizomlar, reglamentlar va shakllar", "/documents", FileText],
      ["Monitoring", "Ta’lim sifati nazorati yo‘nalishlari", "/monitoring", BarChart3],
      ["Murojaatlar", "Takliflar, fikrlar va qayta aloqa", "/appeals", MessageSquareText],
      ["Ko‘p beriladigan savollar", "Bo‘lim faoliyati bo‘yicha javoblar", "/faq", HelpCircle],
    ],
  },
  en: {
    label: "Quick access", title: "Quality system services", description: "Key department resources and tools in one place.",
    items: [
      ["Accreditation", "Preparation, stages and evidence base", "/accreditation", ShieldCheck],
      ["Self-assessment", "Internal review and corrective actions", "/self-assessment", ClipboardCheck],
      ["Regulatory documents", "Policies, procedures and templates", "/documents", FileText],
      ["Monitoring", "Education quality control areas", "/monitoring", BarChart3],
      ["Appeals", "Suggestions, comments and feedback", "/appeals", MessageSquareText],
      ["Frequently asked questions", "Quick answers about the department", "/faq", HelpCircle],
    ],
  },
} as const;

export function ServiceHub({ locale }: { locale: string }) {
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const t = content[current];
  return (
    <section className="bg-white py-20 dark-section">
      <div className="container-main">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[.22em] text-cyan-700">{t.label}</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{t.title}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{t.description}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {t.items.map(([title, description, href, Icon]) => (
            <Link key={href} href={href} className="group flex gap-5 rounded-[26px] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-white hover:shadow-xl">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b4b8f] to-[#087d83] text-white"><Icon size={24} /></span>
              <span><strong className="block text-xl text-slate-950">{title}</strong><span className="mt-2 block leading-6 text-slate-600">{description}</span><span className="mt-3 block font-bold text-blue-700">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
