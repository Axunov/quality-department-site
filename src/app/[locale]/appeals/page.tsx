import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";

const labels = {
  ru: { label: "Обращения", title: "Электронные обращения", description: "Направление предложений, замечаний и вопросов по качеству образовательного процесса.", categoriesTitle: "Темы обращений", categories: ["Качество проведения занятий", "Предложения по улучшению учебного процесса", "Организация экзаменов", "Вопросы аккредитации", "Другое обращение"], sendTitle: "Направить обращение", sendText: "Для безопасной регистрации и обработки обращений используется официальный Telegram-бот отдела. Не указывайте пароль, банковские данные и другую секретную информацию.", telegram: "Открыть Telegram-бот", contacts: "Другие способы связи" },
  uz: { label: "Murojaatlar", title: "Elektron murojaatlar", description: "Ta’lim jarayoni sifati bo‘yicha taklif, e’tiroz va savollarni yuborish.", categoriesTitle: "Murojaat mavzulari", categories: ["Darslar sifati", "O‘quv jarayonini yaxshilash bo‘yicha takliflar", "Imtihonlarni tashkil etish", "Akkreditatsiya masalalari", "Boshqa murojaat"], sendTitle: "Murojaat yuborish", sendText: "Murojaatlarni xavfsiz ro‘yxatga olish va ko‘rib chiqish uchun bo‘limning rasmiy Telegram-botidan foydalaniladi. Parol, bank ma’lumotlari yoki boshqa maxfiy ma’lumotlarni yubormang.", telegram: "Telegram-botni ochish", contacts: "Boshqa aloqa usullari" },
  en: { label: "Appeals", title: "Electronic appeals", description: "Submit suggestions, comments and questions about the quality of education.", categoriesTitle: "Appeal topics", categories: ["Quality of classes", "Suggestions for improving education", "Examination arrangements", "Accreditation questions", "Other appeal"], sendTitle: "Submit an appeal", sendText: "The department’s official Telegram bot is used to register and process appeals securely. Do not send passwords, banking details or other secret information.", telegram: "Open Telegram bot", contacts: "Other contact options" },
};

export default async function AppealsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[current];

  return (
    <main>
      <PageHeader label={t.label} title={t.title} description={t.description} />
      <section className="container-main py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[30px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
            <h2 className="section-title">{t.categoriesTitle}</h2>
            <div className="mt-8 grid gap-4">{t.categories.map((item) => <div key={item} className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-900">✓ {item}</div>)}</div>
          </div>
          <div className="rounded-[30px] bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] p-6 text-white shadow-xl sm:p-8">
            <h2 className="text-3xl font-bold">{t.sendTitle}</h2>
            <p className="mt-5 leading-8 text-blue-50">{t.sendText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://t.me/sbumiptk_murojaatbot" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-6 py-3 font-bold text-[#0b3b78]">{t.telegram}</a>
              <Link href="/contacts" className="rounded-xl border border-white/40 px-6 py-3 font-bold text-white">{t.contacts}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
