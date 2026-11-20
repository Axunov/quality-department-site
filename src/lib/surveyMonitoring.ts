import "server-only";

import learningQualitySurvey from "@/data/learningQualitySurvey.json";
import { graduateRatingItems, doctoralRatingItems } from "@/data/qualitySurveys";
import { ratingItems } from "@/data/employerSurvey";
import { localizedTeacherSurvey, teacherSurveyQuestions } from "@/data/teacherSurvey";
import { qualityAnswerLabel, surveyText } from "@/lib/surveyI18n";
import { createAdminClient } from "@/lib/supabase/admin";

type Row = Record<string, unknown>;
export type MonitoringItem = { label: string; value: number };
export type MonitoringQuestion = { id: string; label: string; total: number; average: number | null; values: MonitoringItem[] };
export type SurveyReport = {
  key: string;
  title: string;
  total: number;
  average: number | null;
  byPeriod: MonitoringItem[];
  byCategory: MonitoringItem[];
  distributions: { label: string; values: MonitoringItem[] }[];
  questions: MonitoringQuestion[];
};
export type SurveyMonitoringPayload = { generatedAt: string; reports: SurveyReport[] };

async function allRows(table: string, select: string, surveyId?: string) {
  const client = createAdminClient();
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const query = client.from(table).select(select).order("id");
    const { data, error } = await (surveyId ? query.eq("survey_id", surveyId) : query).range(from, from + 999);
    if (error) throw error;
    rows.push(...((data || []) as unknown as Row[]));
    if (!data || data.length < 1000) return rows;
  }
}

function text(value: unknown) {
  const result = String(value ?? "").trim();
  return result && result !== "undefined" && result !== "null" ? result : "";
}

function numberValues(values: unknown[]) {
  return values.filter(value => typeof value === "number" || (typeof value === "string" && value.trim() !== "")).map(Number).filter(Number.isFinite);
}

function countValues(values: unknown[]) {
  const counts = new Map<string, number>();
  for (const value of values) {
    const label = text(value);
    if (!label) continue;
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([label, value]) => ({ label, value }));
}

function numericCounts(values: unknown[]) {
  return countValues(numberValues(values).map(value => String(value)));
}

function average(values: number[]) {
  const finite = values.filter(Number.isFinite);
  return finite.length ? Math.round(finite.reduce((a, b) => a + b, 0) / finite.length * 100) / 100 : null;
}

function monthLabel(value: unknown) {
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 7);
}

function periodCounts(rows: Row[]) {
  return countValues(rows.map(row => monthLabel(row.created_at ?? row.submitted_on))).sort((a, b) => a.label.localeCompare(b.label));
}

function arrayValues(row: Row, field: string) {
  const value = row[field];
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>);
  return value === null || value === undefined ? [] : [value];
}

function averageQuestion(id: string, label: string, values: unknown[], min = 1, max = 5): MonitoringQuestion {
  const numbers = numberValues(values).filter(value => Number.isInteger(value) && value >= min && value <= max);
  return { id, label, total: numbers.length, average: average(numbers), values: numericCounts(numbers) };
}

function textQuestion(id: string, label: string, values: unknown[]): MonitoringQuestion {
  const counted = countValues(values);
  return { id, label, total: counted.reduce((sum, item) => sum + item.value, 0), average: null, values: counted };
}

function objectValue(value: unknown, key: string) {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Row)[key] : undefined;
}

type Lang = keyof typeof localizedTeacherSurvey;

export async function buildSurveyMonitoring(lang: Lang = "ru", publicView = false): Promise<SurveyMonitoringPayload> {
  const [employers, quality, student, submissions, teacherAnswers, groups] = await Promise.all([
    allRows("employer_survey_responses", "created_at,locale,ratings,practice_rating,recommendation_score,programme_relevance,cooperation_readiness,hiring_readiness"),
    allRows("quality_survey_responses", "created_at,survey_type,locale,ratings,answers"),
    allRows("student_survey_responses", "submitted_on,locale,answers", learningQualitySurvey.id),
    allRows("survey_submissions", "id,created_at,group_id,locale,final_satisfaction"),
    allRows("survey_teacher_answers", "submission_id,teacher_id,ratings"),
    publicView ? Promise.resolve([] as Row[]) : allRows("survey_groups", "id,name"),
  ]);

  const word = (ru: string, uz: string, en: string) => ({ ru, uz, en })[lang];
  const translate = (label: string) => surveyText(lang, label);
  const localeRows = (rows: Row[]) => countValues(rows.map(row => row.locale === "ru" ? word("Русский", "Ruscha", "Russian") : row.locale === "uz" ? word("Узбекский", "O‘zbekcha", "Uzbek") : row.locale === "en" ? word("Английский", "Inglizcha", "English") : word("Не указан", "Ko‘rsatilmagan", "Not specified")));
  const groupName = (input: unknown) => {
    const label = text(input);
    if (lang === "ru") return label;
    return label.replace(/(?:дистанционное|дистанционная)/gi, word("дистанционное", "masofaviy", "distance learning"))
      .replace(/(?:заочное|заочная)/gi, word("заочное", "sirtqi", "part-time"))
      .replace(/(?:очное|очная)/gi, word("очное", "kunduzgi", "full-time"));
  };
  const groupNames = new Map(groups.map(row => [String(row.id), groupName(row.name)]));
  const bySubmission = new Map<string, Map<string, Row>>(submissions.map(row => [String(row.id), new Map()]));
  for (const row of teacherAnswers) {
    const answers = bySubmission.get(String(row.submission_id));
    if (answers && row.teacher_id) answers.set(String(row.teacher_id), row);
  }
  const teacherQuestions = localizedTeacherSurvey[lang].questions.map((label, index): MonitoringQuestion => {
    const studentScores = [...bySubmission.values()].flatMap(answers => {
      const ratings = numberValues([...answers.values()].map(row => arrayValues(row, "ratings")[index])).filter(n => Number.isInteger(n) && n >= 0 && n <= 5);
      const scored = ratings.filter(n => n > 0);
      return scored.length ? [scored.reduce((sum, n) => sum + n, 0) / scored.length] : ratings.length ? [0] : [];
    });
    const values = numericCounts(studentScores.map(Math.round)).map(item => ({
      ...item,
      label: item.label === "0" ? localizedTeacherSurvey[lang].ratingLabels[0] : item.label,
    }));
    return { id: `teacher-${index + 1}`, label, total: studentScores.length, average: average(studentScores.filter(n => n > 0)), values };
  });
  const overall = averageQuestion("teacher-overall", word("Общая удовлетворённость качеством преподавания", "O‘qitish sifatidan umumiy qoniqish", "Overall satisfaction with teaching"), submissions.map(row => row.final_satisfaction));
  teacherQuestions.push(overall);

  const studentQuestions = learningQualitySurvey.questions.filter(q => q.question_type === "single").map(q => {
    const labels = student.map(row => objectValue(row.answers, q.id)).map(value =>
      typeof value === "number" && Number.isInteger(value) ? q.options?.[value]?.[lang] : undefined
    );
    return textQuestion(q.id, q.prompt[lang], labels);
  });

  const employerQuestions = ratingItems.map((q, i) => averageQuestion(`employer-rating-${i + 1}`, translate(q), employers.map(row => arrayValues(row, "ratings")[i]), 1, 10));
  employerQuestions.push(averageQuestion("employer-practice", word("Оценка практической подготовки", "Amaliy tayyorgarlik bahosi", "Practical training score"), employers.map(row => row.practice_rating), 1, 10));
  const recommendation = averageQuestion("employer-recommendation", word("Готовность рекомендовать выпускников", "Bitiruvchilarni tavsiya etish", "Likelihood of recommending graduates"), employers.map(row => row.recommendation_score), 0, 10);
  employerQuestions.push(recommendation);
  const employerChoice = (key: string, label: string, options: string[]) => employerQuestions.push(textQuestion(key, label, employers.map(row => text(row[key])).filter(value => options.includes(value)).map(translate)));
  employerChoice("programme_relevance", word("Соответствие программы требованиям рынка труда", "Dasturning mehnat bozori talablariga mosligi", "Programme relevance to the labour market"), ["Полностью соответствует", "В основном соответствует", "Частично соответствует", "Не соответствует", "Затрудняюсь ответить"]);
  employerChoice("cooperation_readiness", word("Готовность к сотрудничеству", "Hamkorlikka tayyorlik", "Willingness to cooperate"), ["Да", "Скорее да", "При наличии конкретных предложений", "Скорее нет", "Нет"]);
  employerChoice("hiring_readiness", word("Готовность принять выпускников на работу", "Bitiruvchilarni ishga olishga tayyorlik", "Willingness to hire graduates"), ["Да", "Скорее да", "В зависимости от вакансий", "Скорее нет", "Нет"]);
  const qualityReport = (kind: "graduates" | "doctoral", title: string): SurveyReport => {
    const rows = quality.filter(row => row.survey_type === kind);
    const labels = kind === "graduates" ? graduateRatingItems : doctoralRatingItems;
    const questions = labels.map((label, index) => averageQuestion(`${kind}-rating-${index + 1}`, translate(label), rows.map(row => arrayValues(row, "ratings")[index])));
    if (kind === "graduates") {
      const add = (id: string, label: string, options: string[]) => questions.push(textQuestion(id, label, rows.map(row => objectValue(row.answers, id)).filter((v): v is string => typeof v === "string" && options.includes(v)).map(translate)));
      add("firstJobTiming", qualityAnswerLabel(lang, "firstJobTiming"), ["До окончания обучения", "В течение 3 месяцев", "От 3 до 6 месяцев", "Более 6 месяцев", "Пока не трудоустроился(ась)"]);
      add("recommendation", qualityAnswerLabel(lang, "recommendation"), ["Да", "Скорее да", "Скорее нет", "Нет", "Затрудняюсь ответить"]);
    }
    return { key: kind, title, total: rows.length, average: questions[kind === "graduates" ? 8 : 17].average, byPeriod: periodCounts(rows), byCategory: localeRows(rows), distributions: [], questions };
  };
  return {
    generatedAt: new Date().toISOString(),
    reports: [
      { key: "teacher", title: word("Преподаватель глазами студента", "O‘qituvchi talaba nigohida", "Teacher Through the Eyes of a Student"), total: submissions.length, average: overall.average, byPeriod: periodCounts(submissions), byCategory: publicView ? localeRows(submissions) : countValues(submissions.map(row => groupNames.get(String(row.group_id)) || word("Группа не указана", "Guruh ko‘rsatilmagan", "Group not specified"))), distributions: [], questions: teacherQuestions },
      { key: "students", title: learningQualitySurvey.title[lang], total: student.length, average: null, byPeriod: periodCounts(student), byCategory: localeRows(student), distributions: [], questions: studentQuestions },
      { key: "employers", title: translate("Опрос работодателей"), total: employers.length, average: recommendation.average, byPeriod: periodCounts(employers), byCategory: localeRows(employers), distributions: [], questions: employerQuestions },
      qualityReport("graduates", translate("Опрос выпускников")),
      qualityReport("doctoral", translate("Опрос докторантов")),
    ],
  };
}
