import "server-only";

import learningQualitySurvey from "@/data/learningQualitySurvey.json";
import { graduateRatingItems, doctoralRatingItems } from "@/data/qualitySurveys";
import { ratingItems } from "@/data/employerSurvey";
import { teacherSurveyQuestions } from "@/data/teacherSurvey";
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

async function allRows(table: string, select = "*") {
  const client = createAdminClient();
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client.from(table).select(select).range(from, from + 999);
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
  return values.map(value => Number(value)).filter(Number.isFinite);
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
  return countValues(rows.map(row => monthLabel(row.created_at ?? row.submitted_on)));
}

function arrayValues(row: Row, field: string) {
  const value = row[field];
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>);
  return value === null || value === undefined ? [] : [value];
}

function averageQuestion(id: string, label: string, values: unknown[], excludeZero = false): MonitoringQuestion {
  const numbers = numberValues(values).filter(value => !excludeZero || value > 0);
  return { id, label, total: numbers.length, average: average(numbers), values: numericCounts(numbers) };
}

function textQuestion(id: string, label: string, values: unknown[]): MonitoringQuestion {
  const counted = countValues(values);
  return { id, label, total: counted.reduce((sum, item) => sum + item.value, 0), average: null, values: counted };
}

function optionQuestion(id: string, label: string, rows: Row[], field: string, options: { ru: string }[]) {
  const values = rows.flatMap(row => arrayValues(row, field)).map(value => {
    const index = Number(value);
    return Number.isInteger(index) && options[index] ? options[index].ru : text(value);
  });
  return textQuestion(id, label, values);
}

function camelLabel(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, char => char.toUpperCase());
}

export async function buildSurveyMonitoring(): Promise<SurveyMonitoringPayload> {
  const [employers, quality, student, submissions, teacherAnswers, groups] = await Promise.all([
    allRows("employer_survey_responses", "created_at,locale,programmes,ratings,practice_rating,programme_relevance,recommendation_score,cooperation_readiness"),
    allRows("quality_survey_responses", "created_at,survey_type,locale,ratings,choices,answers"),
    allRows("student_survey_responses", "submitted_on,locale,group_id,answers"),
    allRows("survey_submissions", "created_at,group_id,locale,final_satisfaction,final_suggestions"),
    allRows("survey_teacher_answers", "created_at,submission_id,teacher_id,ratings,violation,comment"),
    allRows("survey_groups", "id,name"),
  ]);

  const groupNames = new Map(groups.map(row => [String(row.id), text(row.name)]));
  const teacherRows = submissions;
  const teacherRatingValues = teacherAnswers.flatMap(row => arrayValues(row, "ratings"));
  const studentQuestions = (learningQualitySurvey.questions as Array<{ id: string; prompt: { ru: string }; options: { ru: string }[] }>).map(question => optionQuestion(question.id, question.prompt.ru, student, "answers", question.options));
  const teacherQuestions = teacherSurveyQuestions.map((question, index) => averageQuestion(`teacher-${index + 1}`, question, teacherAnswers.flatMap(row => [arrayValues(row, "ratings")[index]]), true));
  teacherQuestions.push(averageQuestion("teacher-overall", "Общая удовлетворённость качеством преподавания", submissions.map(row => row.final_satisfaction), true));
  teacherQuestions.push(textQuestion("teacher-violations", "Ситуации, требующие внимания администрации", teacherAnswers.map(row => row.violation)));

  const employerQuestions = ratingItems.map((question, index) => averageQuestion(`employer-rating-${index + 1}`, question, employers.flatMap(row => [arrayValues(row, "ratings")[index]]), true));
  employerQuestions.push(averageQuestion("employer-practice", "Оценка практической подготовки", employers.map(row => row.practice_rating), true));
  employerQuestions.push(averageQuestion("employer-relevance", "Соответствие программы требованиям профессии", employers.map(row => row.programme_relevance), true));
  employerQuestions.push(averageQuestion("employer-recommendation", "Готовность рекомендовать выпускников", employers.map(row => row.recommendation_score), true));
  employerQuestions.push(textQuestion("employer-cooperation", "Готовность к сотрудничеству", employers.map(row => row.cooperation_readiness)));

  const qualityQuestions = (kind: "graduates" | "doctoral") => {
    const rows = quality.filter(row => row.survey_type === kind);
    const labels = kind === "graduates" ? graduateRatingItems : doctoralRatingItems;
    const questions = labels.map((label, index) => averageQuestion(`${kind}-rating-${index + 1}`, label, rows.flatMap(row => [arrayValues(row, "ratings")[index]]), true));
    const answerKeys = [...new Set(rows.flatMap(row => Object.keys((row.answers || {}) as Record<string, unknown>)))];
    for (const key of answerKeys) questions.push(textQuestion(`${kind}-${key}`, camelLabel(key), rows.map(row => ((row.answers || {}) as Record<string, unknown>)[key])));
    if (rows.some(row => arrayValues(row, "choices").length)) questions.push(textQuestion(`${kind}-choices`, "Выбранные варианты", rows.flatMap(row => arrayValues(row, "choices"))));
    return questions;
  };

  const studentCategories = countValues(student.map(row => groupNames.get(String(row.group_id)) || text(row.group_id)));
  const teacherCategories = countValues(teacherRows.map(row => groupNames.get(String(row.group_id)) || text(row.group_id)));
  const qualityReport = (kind: "graduates" | "doctoral", title: string): SurveyReport => {
    const rows = quality.filter(row => row.survey_type === kind);
    const questions = qualityQuestions(kind);
    return { key: kind, title, total: rows.length, average: average(rows.flatMap(row => numberValues(arrayValues(row, "ratings")))), byPeriod: periodCounts(rows), byCategory: countValues(rows.map(row => row.locale)), distributions: [{ label: "Варианты ответов", values: countValues(rows.flatMap(row => arrayValues(row, "choices"))) }], questions };
  };

  return {
    generatedAt: new Date().toISOString(),
    reports: [
      { key: "teacher", title: "Преподаватель глазами студента", total: submissions.length, average: average(submissions.map(row => Number(row.final_satisfaction)).filter(value => value > 0)), byPeriod: periodCounts(submissions), byCategory: teacherCategories, distributions: [{ label: "Оценки преподавателей", values: numericCounts(teacherRatingValues) }], questions: teacherQuestions },
      { key: "students", title: "Опрос студентов о качестве обучения", total: student.length, average: null, byPeriod: periodCounts(student), byCategory: studentCategories.length ? studentCategories : countValues(student.map(row => row.locale)), distributions: [], questions: studentQuestions },
      { key: "employers", title: "Опрос работодателей", total: employers.length, average: average(employers.map(row => Number(row.recommendation_score)).filter(value => value > 0)), byPeriod: periodCounts(employers), byCategory: countValues(employers.map(row => row.cooperation_readiness)), distributions: [{ label: "Выбранные направления", values: countValues(employers.flatMap(row => arrayValues(row, "programmes"))) }], questions: employerQuestions },
      qualityReport("graduates", "Опрос выпускников"),
      qualityReport("doctoral", "Опрос докторантов"),
    ],
  };
}
