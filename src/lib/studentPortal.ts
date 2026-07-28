export const STUDENT_PORTAL_TOKEN_KEY = "quality_student_portal_token";

export function readStudentPortalToken() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(STUDENT_PORTAL_TOKEN_KEY) || "";
}

export function saveStudentPortalToken(token: string) {
  sessionStorage.setItem(STUDENT_PORTAL_TOKEN_KEY, token);
}

export function clearStudentPortalToken() {
  sessionStorage.removeItem(STUDENT_PORTAL_TOKEN_KEY);
}
