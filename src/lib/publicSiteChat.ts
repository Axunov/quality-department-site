import { appealHelp, type AppealLocale } from "./appealHelp";
import { uzbekAlphabet } from "./uzbekAlphabet";

const copy = (ru: string, uz: string, en: string) => ({ ru, uz, en });
const survey = {
  id: "surveys",
  question: copy("Где находятся опросы?", "So‘rovnomalar qayerda?", "Where can I find surveys?"),
  answer: copy("Откройте раздел «Опросы» и выберите нужный опрос из списка.", "«So‘rovnomalar» bo‘limini oching va ro‘yxatdan kerakli so‘rovnomani tanlang.", "Open the Surveys section and choose the survey you need from the list."),
  target: "surveys" as const,
};

const topics = [...appealHelp, survey] as const;
const examples: Record<string, string[]> = {
  track: ["где посмотреть ответ", "получил ли ответ", "проверить статус", "отследить", "holat", "javob qayerda", "kuzatish", "status", "read reply", "check my appeal", "track appeal"],
  anonymous: ["анонимн", "без имени", "anonim", "anonymous", "anonymously"],
  files: ["прикрепить", "вложен", "размер файла", "скриншот", "biriktir", "ilova", "attach", "file size"],
  surveys: ["опрос", "анкет", "so rov", "sorov", "survey", "questionnaire"],
  contacts: ["контакт", "телефон отдела", "почта отдела", "aloqa", "kontakt", "contact", "office phone", "office email"],
  documents: ["документ", "норматив", "hujjat", "document", "regulation"],
  code: ["где найти код", "где взять код", "номер обращения", "kuzatuv kodi", "murojaat raqami", "tracking code", "reference number"],
  notfound: ["не находит обращение", "обращение не найдено", "murojaat topilmayapti", "appeal not found", "cant find my appeal"],
  schedule: ["ошибка в расписании", "неверное расписание", "jadvaldagi xato", "timetable error", "schedule error"],
  technical: ["техническ", "сайт не работает", "texnik", "technical", "server error"],
  suggestion: ["предложение", "предложить", "taklif", "suggestion", "suggest an improvement"],
  updates: ["обязательно ли оставлять контакт", "aloqa malumotlarini qoldirish shartmi", "leave contact details"],
  submit: ["подать обращение", "отправить обращение", "написать обращение", "murojaat yubor", "murojaat yoz", "submit an appeal", "send an appeal", "write an appeal"],
};

function normalize(value: string) {
  return uzbekAlphabet(value.toLowerCase()).replace(/['’‘ʻʼ`´]/gu, " ")
    .normalize("NFKD").replace(/\p{Mark}/gu, "").replace(/[^\p{Letter}\p{Number}]+/gu, " ").trim();
}

export function matchSiteTopic(question: string): string | null {
  const text = normalize(question.slice(0, 300));
  if (!text || /[\w.+-]+@[\w.-]+\.\w+|(?:\d[\s-]*){7,}/u.test(question)) return null;
  // Do not mistake a personal record request for a site-navigation question.
  if (/\b(?:hemis|gpa|my grades?|my marks?|student id|baholarim|shaxsiy malumot)\b|мои оценки|мой балл|пароль|мой документ|моя справка/u.test(text)) return null;
  const candidates = Object.entries(examples).flatMap(([id, phrases]) => {
    const score = Math.max(0, ...phrases.map((phrase) => {
      const key = normalize(phrase);
      return (key.includes(" ") ? (` ${text} `).includes(` ${key} `) : text.split(" ").some((word) => word.startsWith(key))) ? key.length : 0;
    }));
    return score ? [{ id, score }] : [];
  }).sort((a, b) => b.score - a.score);
  return candidates[0]?.id ?? null;
}

export function siteChatAnswer(topic: unknown, locale: AppealLocale) {
  const source = topics.find((item) => item.id === topic);
  if (!source) return null;
  const link = source.target === "form" ? "#appeal-form" : source.target === "track" ? "#track" : source.target ? `/${locale}/${source.target}` : "#appeal-help-title";
  const localize = (value: string) => locale === "uz" ? uzbekAlphabet(value) : value;
  return { title: localize(source.question[locale]), text: localize(source.answer[locale]), href: link };
}

export const chatSuggestions = ["track", "surveys", "documents", "contacts"] as const;
