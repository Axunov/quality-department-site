import "server-only";

type AppealNotice = { number: string; category: string; subject: string; anonymous: boolean; name?: string | null; group?: string | null };

export async function notifyAdminAboutAppeal(appeal: AppealNotice) {
  const lines = [
    "Новое обращение на сайте",
    `Номер: ${appeal.number}`,
    `Категория: ${appeal.category}`,
    `Тема: ${appeal.subject}`,
    `Автор: ${appeal.anonymous ? "анонимно" : appeal.name || "не указано"}`,
    appeal.group ? `Группа: ${appeal.group}` : "",
    "Откройте: https://qualitydepartment.netlify.app/ru/admin/tools/appeals",
  ].filter(Boolean).join("\n");

  const jobs: Promise<unknown>[] = [];
  const telegramToken = process.env.ADMIN_TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.ADMIN_TELEGRAM_CHAT_ID;
  if (telegramToken && telegramChatId) {
    jobs.push(fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text: lines, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(5000),
    }));
  }

  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.ADMIN_APPEAL_EMAIL;
  const emailFrom = process.env.ADMIN_APPEAL_FROM_EMAIL;
  if (resendKey && emailTo && emailFrom) {
    jobs.push(fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: emailFrom, to: [emailTo], subject: `Новое обращение ${appeal.number}`, text: lines }),
      signal: AbortSignal.timeout(5000),
    }));
  }
  await Promise.allSettled(jobs);
}
