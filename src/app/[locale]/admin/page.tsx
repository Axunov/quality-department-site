import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";

const modules = [
  {
    title: "Новости",
    text: "Добавление, редактирование и публикация новостей отдела.",
    href: "/admin/news",
    icon: "📰",
  },
  {
    title: "Документы",
    text: "Загрузка PDF, DOCX, приказов, положений и шаблонов.",
    href: "/admin/documents",
    icon: "📄",
  },
  {
    title: "Сотрудники",
    text: "Редактирование карточек сотрудников, контактов и фотографий.",
    href: "/admin/employees",
    icon: "👥",
  },
  {
    title: "Аккредитация",
    text: "Управление дорожной картой, индикаторами и рабочими группами.",
    href: "/admin/accreditation",
    icon: "🏛️",
  },
];

export default function AdminPage() {
  return (
    <main>
      <PageHeader
        label="Админ-панель"
        title="Панель управления сайтом"
        description="Раздел для управления новостями, документами, сотрудниками и материалами отдела контроля качества образования."
      />

      <section className="container-main py-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="text-5xl">{item.icon}</div>
              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
              <p className="mt-6 font-bold text-blue-700">Открыть →</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-[30px] bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">Важно</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Сейчас это первая версия административной панели. На следующем этапе
            мы подключим базу данных и авторизацию, чтобы изменения сохранялись
            и отображались на сайте автоматически.
          </p>
        </div>
      </section>
    </main>
  );
}