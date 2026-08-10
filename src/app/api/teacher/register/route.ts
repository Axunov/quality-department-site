import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function clean(value: unknown, max: number) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, max);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Некорректные данные." }, { status: 400 });
  }

  const fullName = clean(body.fullName, 180);
  const department = clean(body.department, 180);
  const position = clean(body.position, 180);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 180).toLowerCase();
  const password = String(body.password || "");

  if (fullName.length < 5 || !department || !position || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Заполните все обязательные поля." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ message: "Пароль должен содержать не менее 8 символов." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data: created, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { role: "teacher" },
      user_metadata: { full_name: fullName },
    });

    if (authError || !created.user) {
      const duplicate = authError?.message.toLowerCase().includes("already") || authError?.message.toLowerCase().includes("registered");
      return NextResponse.json(
        { message: duplicate ? "Учётная запись с этой почтой уже существует." : "Не удалось создать учётную запись." },
        { status: duplicate ? 409 : 400 },
      );
    }

    const { error: profileError } = await supabase.from("hemis_teacher_profiles").insert({
      user_id: created.user.id,
      full_name: fullName,
      department,
      position,
      phone: phone || null,
      email,
    });

    if (profileError) {
      await supabase.auth.admin.deleteUser(created.user.id);
      throw profileError;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[teacher-register]", error);
    return NextResponse.json({ message: "Сервис регистрации временно недоступен." }, { status: 503 });
  }
}
