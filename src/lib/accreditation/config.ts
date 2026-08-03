export type AccreditationSection = {
  slug: string;
  title: Record<"ru" | "uz" | "en", string>;
  description: Record<"ru" | "uz" | "en", string>;
  icon: string;
};

export const accreditationSections: AccreditationSection[] = [
  {
    slug: "institutional",
    icon: "🏛️",
    title: {
      ru: "Комплексная государственная аккредитация",
      uz: "Kompleks davlat akkreditatsiyasi",
      en: "Institutional state accreditation",
    },
    description: {
      ru: "Общая готовность института, дорожная карта, статусы подразделений и доказательная база.",
      uz: "Institutning umumiy tayyorgarligi, yo‘l xaritasi, bo‘linmalar holati va dalillar bazasi.",
      en: "Overall institutional readiness, roadmap, department status and evidence base.",
    },
  },
  {
    slug: "self-assessment",
    icon: "📝",
    title: { ru: "Самооценка", uz: "O‘zini o‘zi baholash", en: "Self-assessment" },
    description: {
      ru: "Формирование отчёта по самооценке, главы отчёта, выводы и подтверждающие материалы.",
      uz: "O‘zini o‘zi baholash hisoboti, boblar, xulosalar va tasdiqlovchi materiallar.",
      en: "Self-assessment report chapters, findings and supporting materials.",
    },
  },
  {
    slug: "indicators",
    icon: "📊",
    title: { ru: "Индикаторы качества", uz: "Sifat indikatorlari", en: "Quality indicators" },
    description: {
      ru: "Мониторинг критериев, сроков, ответственных и выполнения корректирующих мероприятий.",
      uz: "Mezonlar, muddatlar, mas’ullar va tuzatish tadbirlarining bajarilishini monitoring qilish.",
      en: "Monitoring criteria, deadlines, owners and corrective actions.",
    },
  },
  {
    slug: "documents",
    icon: "📚",
    title: { ru: "Нормативные документы", uz: "Me’yoriy hujjatlar", en: "Regulatory documents" },
    description: {
      ru: "Законы, постановления, стандарты, документы агентства и внутренние документы института.",
      uz: "Qonunlar, qarorlar, standartlar, agentlik va institut ichki hujjatlari.",
      en: "Laws, resolutions, standards, agency documents and internal regulations.",
    },
  },
  {
    slug: "working-groups",
    icon: "👥",
    title: { ru: "Рабочие группы", uz: "Ishchi guruhlar", en: "Working groups" },
    description: {
      ru: "Ответственные лица, задачи, сроки, документы и процент выполнения каждой группы.",
      uz: "Mas’ullar, vazifalar, muddatlar, hujjatlar va har bir guruhning bajarilish foizi.",
      en: "Owners, tasks, deadlines, documents and progress of every working group.",
    },
  },
];

export const demoDepartments = [
  { name: "Учебный отдел", owner: "С. Хошимов", progress: 84, status: "review" },
  { name: "Отдел кадров", owner: "А. Усмонов", progress: 92, status: "in_progress" },
  { name: "Библиотека", owner: "Д. Сайфуллаева", progress: 100, status: "approved" },
  { name: "Международный отдел", owner: "А. Баходиров", progress: 61, status: "revision" },
  { name: "Отдел качества", owner: "Ф. Рустамов", progress: 88, status: "review" },
];

export const statusLabels = {
  draft: { ru: "Черновик", uz: "Qoralama", en: "Draft" },
  in_progress: { ru: "В работе", uz: "Jarayonda", en: "In progress" },
  review: { ru: "На проверке", uz: "Tekshiruvda", en: "Under review" },
  revision: { ru: "На доработке", uz: "Qayta ishlashda", en: "Revision required" },
  approved: { ru: "Утверждено", uz: "Tasdiqlangan", en: "Approved" },
} as const;
