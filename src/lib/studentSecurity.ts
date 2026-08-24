import "server-only";
import { createHmac } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

export const STUDENT_PORTAL_COOKIE = "qds_student_portal";
export const SURVEY_SESSION_COOKIE = "qds_survey_session";
export const SURVEY_RECEIPT_COOKIE = "qds_survey_receipt";
export const GENERIC_SURVEY_SESSION_COOKIE = "qds_generic_survey_session";
export const GENERIC_SURVEY_RECEIPT_COOKIE = "qds_generic_survey_receipt";

export function getClientIp(request: NextRequest) {
  const netlifyIp = request.headers.get("x-nf-client-connection-ip");
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return netlifyIp || forwarded || "unknown";
}

export function hashClientIp(ip: string) {
  const secret =
    process.env.STUDENT_SECURITY_PEPPER ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret) {
    throw new Error("Student security pepper is not configured");
  }

  return createHmac("sha256", secret).update(ip).digest("hex");
}

export function studentCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}

export function clearStudentCookies(response: NextResponse) {
  for (const name of [
    STUDENT_PORTAL_COOKIE,
    SURVEY_SESSION_COOKIE,
    SURVEY_RECEIPT_COOKIE,
    GENERIC_SURVEY_SESSION_COOKIE,
    GENERIC_SURVEY_RECEIPT_COOKIE,
  ]) {
    response.cookies.set(name, "", studentCookieOptions(0));
  }
}

export async function verifyTurnstile(
  token: string,
  remoteIp: string,
) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );

  if (!response.ok) return false;

  const result = (await response.json()) as {
    success?: boolean;
    action?: string;
  };

  return result.success === true &&
    (!result.action || result.action === "student_login");
}
