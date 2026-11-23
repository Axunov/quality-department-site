import { specialPrograms } from "./specialData";

export const indicatorStatuses = ["draft", "in_progress", "review", "revision", "approved"] as const;
export const indicatorDeadlines = ["all", "overdue", "soon", "none"] as const;
export type IndicatorStatusFilter = "all" | typeof indicatorStatuses[number];
export type IndicatorDeadlineFilter = typeof indicatorDeadlines[number];

export function registryQuery(input: unknown, max = 120) {
  return typeof input === "string" ? input.slice(0, max).trim() : "";
}

export function statusFilter(input: unknown): IndicatorStatusFilter {
  return indicatorStatuses.find(status => status === input) ?? "all";
}

export function deadlineFilter(input: unknown): IndicatorDeadlineFilter {
  return indicatorDeadlines.find(deadline => deadline === input) ?? "all";
}

export function registryHref(project: string, filters: { scope?: "mine"; indicator?: string; status?: IndicatorStatusFilter; deadline?: IndicatorDeadlineFilter } = {}) {
  const program = specialPrograms.find(entry => project === `special-${entry.slug}`);
  if (project !== "complex" && !program) return null;
  const params = new URLSearchParams();
  if (program) params.set("program", program.slug);
  if (filters.scope==="mine") params.set("scope","mine");
  const code = registryQuery(filters.indicator,40);
  if (code) params.set("indicator", code);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.deadline && filters.deadline !== "all") params.set("deadline", filters.deadline);
  const search = params.toString();
  return `/accreditation/${program ? "special" : "complex"}${search ? "?" + search : ""}#indicator-registry`;
}

export function indicatorHref(project: string, code: string) {
  const indicator = registryQuery(code, 40);
  return indicator ? registryHref(project, { indicator }) : null;
}

export function accreditationDay(now: Date, offset = 0) {
  return new Date(now.getTime() + 5 * 3600_000 + offset * 86400_000).toISOString().slice(0, 10);
}

export function deadlineMatches(filter: IndicatorDeadlineFilter, state: { status: string; due_date: string | null } | undefined, now = new Date()) {
  if (filter === "all") return true;
  if (!state || state.status === "approved") return false;
  if (filter === "none") return !state.due_date;
  if (!state.due_date) return false;
  const today = accreditationDay(now);
  if (filter === "overdue") return state.due_date < today;
  return state.due_date >= today && state.due_date <= accreditationDay(now, 7);
}

export const registryCopy = {
  ru: { registry:"Реестр индикаторов", search:"Код, формулировка или ответственный", scope:"Назначение", all:"Все индикаторы", mine:"Мои индикаторы", status:"Статус", allStatus:"Все статусы", deadline:"Срок", allDeadline:"Все сроки", overdue:"Просрочено", soon:"Ближайшие 7 дней", none:"Без срока", reset:"Сбросить фильтры", found:"Найдено", empty:"Нет индикаторов с такими параметрами. Измените фильтры или сбросьте их.", loading:"Загружаем статусы индикаторов…", error:"Не удалось обновить статусы индикаторов.", previous:"Предыдущая страница", next:"Следующая страница", open:"Открыть индикатор", close:"Закрыть", readiness:"Готовность", responsible:"Ответственный" },
  uz: { registry:"Indikatorlar reyestri", search:"Kod, indikator nomi yoki mas’ul", scope:"Biriktiriş", all:"Barça indikatorlar", mine:"Mening indikatorlarim", status:"Holat", allStatus:"Barça holatlar", deadline:"Muddat", allDeadline:"Barça muddatlar", overdue:"Muddati ötgan", soon:"Yaqin 7 kun", none:"Muddatsiz", reset:"Filtrlarni tozalaş", found:"Topildi", empty:"Bu mezonlarga mos indikatorlar yöq. Filtrlarni özgartiring yoki tozalang.", loading:"Indikator holatlari yuklanmoqda…", error:"Indikator holatlarini yangilab bölmadi.", previous:"Oldingi sahifa", next:"Keyingi sahifa", open:"Indikatorni oçiş", close:"Yopiş", readiness:"Tayyorlik", responsible:"Mas’ul" },
  en: { registry:"Indicator register", search:"Code, indicator text or owner", scope:"Assignment", all:"All indicators", mine:"My indicators", status:"Status", allStatus:"All statuses", deadline:"Deadline", allDeadline:"All deadlines", overdue:"Overdue", soon:"Next 7 days", none:"No deadline", reset:"Clear filters", found:"Found", empty:"No indicators match. Change or clear the filters.", loading:"Loading indicator statuses…", error:"Could not update indicator statuses.", previous:"Previous page", next:"Next page", open:"Open indicator", close:"Close", readiness:"Readiness", responsible:"Owner" },
} as const;
