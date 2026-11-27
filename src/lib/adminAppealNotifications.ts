import "server-only";

export async function notifyAdminAboutAppeal() {
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.ADMIN_APPEAL_EMAIL;
  const emailFrom = process.env.ADMIN_APPEAL_FROM_EMAIL;
  if (!resendKey || !emailTo || !emailFrom) return;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        subject: "Новое обращение",
        text: "На портале поступило новое обращение. Откройте защищённую панель: https://qualitydepartment.netlify.app/ru/admin/tools/appeals",
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.warn("Appeal notification not delivered", response.status);
  } catch {
    console.warn("Appeal notification unavailable");
  }
}
