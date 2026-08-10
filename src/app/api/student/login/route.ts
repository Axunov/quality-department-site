import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getClientIp,
  hashClientIp,
  STUDENT_PORTAL_COOKIE,
  studentCookieOptions,
  verifyTurnstile,
} from "@/lib/studentSecurity";

export const runtime = "nodejs";

type SecurityStatus = {
  captcha_required: boolean;
  blocked: boolean;
  retry_after_seconds: number;
};

function json(
  body: Record<string, unknown>,
  status = 200,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export async function POST(request: NextRequest) {
  let payload: { studentId?: string; captchaToken?: string };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  const studentId = String(payload.studentId || "").trim().toUpperCase();
  if (!/^STU-\d{4,}$/.test(studentId) || studentId.length > 50) {
    return json({
      ok: false,
      message: "Не удалось войти. Проверьте данные и повторите попытку.",
    }, 401);
  }

  try {
    const supabase = createAdminClient();
    const clientIp = getClientIp(request);
    const ipHash = hashClientIp(clientIp);

    const { data: statusData, error: statusError } = await supabase.rpc(
      "student_login_security_status",
      { p_ip_hash: ipHash },
    );
    if (statusError) throw statusError;

    const security = (statusData?.[0] || {
      captcha_required: false,
      blocked: false,
      retry_after_seconds: 0,
    }) as SecurityStatus;

    if (security.blocked) {
      return json(
        {
          ok: false,
          blocked: true,
          message: "Слишком много попыток. Повторите вход позже.",
        },
        429,
        {
          "Retry-After": String(Math.max(1, security.retry_after_seconds || 900)),
        },
      );
    }

    if (security.captcha_required) {
      const captchaValid = await verifyTurnstile(
        String(payload.captchaToken || ""),
        clientIp,
      );

      if (!captchaValid) {
        await supabase.rpc("record_student_login_event", {
          p_ip_hash: ipHash,
          p_student_identifier: studentId,
          p_reason: "captcha_failed",
        });
        return json({
          ok: false,
          captchaRequired: true,
          message: "Подтвердите, что вы не робот, и повторите вход.",
        }, 403);
      }
    }

    const { data, error } = await supabase.rpc(
      "student_portal_login_secure",
      {
        p_student_identifier: studentId,
        p_ip_hash: ipHash,
      },
    );
    if (error) throw error;

    const session = data?.[0] as { portal_token?: string } | undefined;
    if (!session?.portal_token) {
      const { data: updatedStatus } = await supabase.rpc(
        "student_login_security_status",
        { p_ip_hash: ipHash },
      );
      const captchaRequired =
        (updatedStatus?.[0] as SecurityStatus | undefined)?.captcha_required ||
        false;

      return json({
        ok: false,
        captchaRequired,
        message: "Не удалось войти. Проверьте данные и повторите попытку.",
      }, 401);
    }

    const response = json({ ok: true });
    response.cookies.set(
      STUDENT_PORTAL_COOKIE,
      session.portal_token,
      studentCookieOptions(60 * 60 * 2),
    );
    return response;
  } catch (error) {
    console.error("[student-login] server error", error);
    return json({
      ok: false,
      message: "Сервис временно недоступен. Сообщите администратору код LOGIN-SERVER.",
    }, 503);
  }
}
