import survey from "@/data/learningQualitySurvey.json";

export type LearningResponse = { id: string; submitted_on: string; locale: string; answers: Record<string, unknown> };
export function validLearningAnswers(value: unknown): value is Record<string, number | string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const answers = value as Record<string, unknown>;
  if (Object.keys(answers).some(key => !survey.questions.some(q => q.id === key))) return false;
  return survey.questions.every(q => {
    const answer = answers[q.id];
    if (q.question_type === "text") return answer === undefined || (typeof answer === "string" && answer.length <= 3000);
    return typeof answer === "number" && Number.isInteger(answer) && answer >= 0 && answer < q.options.length;
  });
}
export function learningStats(rows: LearningResponse[]) {
  return survey.questions.slice(0, 11).map(q => {
    const counts = q.options.map((_, i) => rows.filter(row => row.answers[q.id] === i).length);
    return { id: q.id, counts, total: counts.reduce((sum, value) => sum + value, 0) };
  });
}
// Neutralize spreadsheet formula prefixes, including after whitespace/control characters.
export function safeCsvCell(value: unknown) {
  let text = String(value ?? "");
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(text)) text = "'" + text;
  return `"${text.replaceAll('"', '""')}"`;
}
