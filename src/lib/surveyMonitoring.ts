import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

type Row = Record<string, unknown>;
type SurveyReport = {
  key: string;
  title: string;
  total: number;
  average: number | null;
  byPeriod: { label: string; value: number }[];
  byCategory: { label: string; value: number }[];
  distributions: { label: string; values: { label: string; value: number }[] }[];
};

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

function monthLabel(value: unknown) {
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "—";
  return date.toISOString().slice(0, 7);
}

function countValues(values: unknown[]) {
  const counts = new Map<string, number>();
  for (const value of values) {
    const label = String(value ?? "—");
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }));
}

function average(values: number[]) {
  const finite = values.filter(Number.isFinite);
  return finite.length ? Math.round(finite.reduce((a, b) => a + b, 0) / finite.length * 100) / 100 : null;
}

function periodCounts(rows: Row[]) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const label = monthLabel(row.created_at ?? row.submitted_on);
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([label, value]) => ({ label, value }));
}

function jsonValues(rows: Row[], field: string) {
  const values: unknown[] = [];
  for (const row of rows) {
    const raw = row[field];
    if (Array.isArray(raw)) values.push(...raw);
    else if (raw && typeof raw === "object") values.push(...Object.values(raw as Record<string, unknown>));
    else if (raw !== null && raw !== undefined) values.push(raw);
  }
  return countValues(values);
}

export async function buildSurveyMonitoring(): Promise<{ generatedAt: string; reports: SurveyReport[] }> {
  const [employers, quality, student, submissions, teacherAnswers, groups] = await Promise.all([
    allRows("employer_survey_responses", "created_at,locale,programmes,ratings,practice_rating,programme_relevance,recommendation_score,cooperation_readiness"),
    allRows("quality_survey_responses", "created_at,survey_type,locale,ratings,choices,answers"),
    allRows("student_survey_responses", "submitted_on,locale,group_id,answers"),
    allRows("survey_submissions", "created_at,group_id,locale,final_satisfaction,final_suggestions"),
    allRows("survey_teacher_answers", "created_at,submission_id,teacher_id,ratings,violation,comment"),
    allRows("survey_groups", "id,name"),
  ]);

  const groupNames = new Map(groups.map(row => [String(row.id), String(row.name)]));
  const studentCategories = countValues(student.map(row => groupNames.get(String(row.group_id)) || "—"));
  const teacherCategories = countValues(submissions.map(row => groupNames.get(String(row.group_id)) || "—"));
  const teacherRatings = teacherAnswers.flatMap(row => Array.isArray(row.ratings) ? row.ratings.map(Number) : []);
  const employerScores = employers.map(row => Number(row.recommendation_score));
  const qualityRatings = quality.flatMap(row => Array.isArray(row.ratings) ? row.ratings.map(Number) : []);
  const studentAnswerValues = jsonValues(student, "answers");
  const teacherAnswerValues = jsonValues(teacherAnswers, "ratings");

  const reports: SurveyReport[] = [
    {
      key: "teacher",
      title: "Преподаватель глазами студента",
      total: submissions.length,
      average: average(submissions.map(row => Number(row.final_satisfaction))),
      byPeriod: periodCounts(submissions),
      byCategory: teacherCategories,
      distributions: [{ label: "Оценки преподавателей", values: teacherAnswerValues }],
    },
    {
      key: "students",
      title: "Опрос студентов о качестве обучения",
      total: student.length,
      average: null,
      byPeriod: periodCounts(student),
      byCategory: studentCategories,
      distributions: [{ label: "Ответы студентов", values: studentAnswerValues }],
    },
    {
      key: "employers",
      title: "Опрос работодателей",
      total: employers.length,
      average: average(employerScores),
      byPeriod: periodCounts(employers),
      byCategory: countValues(employers.flatMap(row => Array.isArray(row.programmes) ? row.programmes : [])),
      distributions: [
        { label: "Язык анкеты", values: countValues(employers.map(row => row.locale)) },
        { label: "Готовность к сотрудничеству", values: countValues(employers.map(row => row.cooperation_readiness)) },
      ],
    },
    {
      key: "graduates",
      title: "Опрос выпускников",
      total: quality.filter(row => row.survey_type === "graduates").length,
      average: average(quality.filter(row => row.survey_type === "graduates").flatMap(row => Array.isArray(row.ratings) ? row.ratings.map(Number) : [])),
      byPeriod: periodCounts(quality.filter(row => row.survey_type === "graduates")),
      byCategory: countValues(quality.filter(row => row.survey_type === "graduates").map(row => row.locale)),
      distributions: [{ label: "Варианты ответов", values: jsonValues(quality.filter(row => row.survey_type === "graduates"), "choices") }],
    },
    {
      key: "doctoral",
      title: "Опрос докторантов",
      total: quality.filter(row => row.survey_type === "doctoral").length,
      average: average(quality.filter(row => row.survey_type === "doctoral").flatMap(row => Array.isArray(row.ratings) ? row.ratings.map(Number) : [])),
      byPeriod: periodCounts(quality.filter(row => row.survey_type === "doctoral")),
      byCategory: countValues(quality.filter(row => row.survey_type === "doctoral").map(row => row.locale)),
      distributions: [{ label: "Варианты ответов", values: jsonValues(quality.filter(row => row.survey_type === "doctoral"), "choices") }],
    },
  ];

  return { generatedAt: new Date().toISOString(), reports };
}
