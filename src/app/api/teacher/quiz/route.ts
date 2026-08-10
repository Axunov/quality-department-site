import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hemisQuizQuestions, HEMIS_PASS_SCORE } from "@/data/hemisQuiz";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== "teacher") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("hemis_teacher_profiles")
    .select("full_name, department, position")
    .eq("user_id", user.id)
    .single();

  const { data: attempts } = await supabase
    .from("hemis_quiz_attempts")
    .select("score, passed, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    ok: true,
    profile,
    attempts: attempts || [],
    passScore: HEMIS_PASS_SCORE,
    total: hemisQuizQuestions.length,
    questions: hemisQuizQuestions.map(({ id, text, options }) => ({ id, text, options })),
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== "teacher") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { answers?: Record<string, number> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Некорректные ответы." }, { status: 400 });
  }

  const answers = body.answers || {};
  if (hemisQuizQuestions.some((q) => !Number.isInteger(answers[String(q.id)]))) {
    return NextResponse.json({ message: "Ответьте на все вопросы." }, { status: 400 });
  }

  const details = hemisQuizQuestions.map((question) => {
    const selectedIndex = answers[String(question.id)];
    return {
      id: question.id,
      selectedIndex,
      correctIndex: question.correctIndex,
      correct: selectedIndex === question.correctIndex,
      explanation: question.explanation,
    };
  });
  const score = details.filter((item) => item.correct).length;
  const passed = score >= HEMIS_PASS_SCORE;

  const { error } = await supabase.from("hemis_quiz_attempts").insert({
    user_id: user.id,
    score,
    total_questions: hemisQuizQuestions.length,
    passed,
    answers,
  });
  if (error) {
    console.error("[hemis-quiz-submit]", error);
    return NextResponse.json({ message: "Не удалось сохранить результат." }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    score,
    total: hemisQuizQuestions.length,
    percent: Math.round((score / hemisQuizQuestions.length) * 100),
    passed,
    details,
  });
}
