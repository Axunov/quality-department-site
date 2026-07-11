import { getNews } from "@/services/news.service";
import { getDocuments } from "@/services/documents.service";
import { getEmployees } from "@/services/employees.service";
import { Link } from "@/i18n/routing";
import { getLocalizedText } from "@/utils/getLocalizedText";

const labels = {
  ru: {
    title: "Панель управления",
    subtitle: "Управление сайтом отдела контроля качества образования",
    news: "Новости",
    documents: "Документы",
    employees: "Сотрудники",
    newsDesc: "Управление новостями сайта",
    documentsDesc: "Файловый менеджер",
    employeesDesc: "Сотрудники отдела",
    latestNews: "Последние новости",
    quickActions: "Быстрые действия",
    addNews: "+ Добавить новость",
    addDocument: "+ Добавить документ",
    addEmployee: "+ Добавить сотрудника",
    defaultCategory: "Новости",
    noNews: "Новости пока не добавлены",
  },
  uz: {
    title: "Boshqaruv paneli",
    subtitle: "Ta’lim sifatini nazorat qilish bo‘limi saytini boshqarish",
    news: "Yangiliklar",
    documents: "Hujjatlar",
    employees: "Xodimlar",
    newsDesc: "Sayt yangiliklarini boshqarish",
    documentsDesc: "Fayl menejeri",
    employeesDesc: "Bo‘lim xodimlari",
    latestNews: "So‘nggi yangiliklar",
    quickActions: "Tezkor amallar",
    addNews: "+ Yangilik qo‘shish",
    addDocument: "+ Hujjat qo‘shish",
    addEmployee: "+ Xodim qo‘shish",
    defaultCategory: "Yangiliklar",
    noNews: "Hozircha yangiliklar qo‘shilmagan",
  },
  en: {
    title: "Dashboard",
    subtitle: "Education Quality Control Department website management",
    news: "News",
    documents: "Documents",
    employees: "Employees",
    newsDesc: "Manage website news",
    documentsDesc: "File manager",
    employeesDesc: "Department employees",
    latestNews: "Latest news",
    quickActions: "Quick actions",
    addNews: "+ Add news",
    addDocument: "+ Add document",
    addEmployee: "+ Add employee",
    defaultCategory: "News",
    noNews: "No news has been added yet",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const [news, documents, employees] = await Promise.all([
    getNews(),
    getDocuments(),
    getEmployees(),
  ]);

  const dateLocale =
    currentLocale === "uz"
      ? "uz-UZ"
      : currentLocale === "en"
        ? "en-US"
        : "ru-RU";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">{t.title}</h1>
        <p className="mt-2 text-slate-500">{t.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/admin/news"
          className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
        >
          <p className="text-sm font-semibold text-slate-500">{t.news}</p>
          <h2 className="mt-3 text-5xl font-bold text-blue-700">
            {news.length}
          </h2>
          <p className="mt-3 text-sm text-slate-500">{t.newsDesc}</p>
        </Link>

        <Link
          href="/admin/documents"
          className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
        >
          <p className="text-sm font-semibold text-slate-500">
            {t.documents}
          </p>
          <h2 className="mt-3 text-5xl font-bold text-blue-700">
            {documents.length}
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            {t.documentsDesc}
          </p>
        </Link>

        <Link
          href="/admin/employees"
          className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
        >
          <p className="text-sm font-semibold text-slate-500">
            {t.employees}
          </p>
          <h2 className="mt-3 text-5xl font-bold text-blue-700">
            {employees.length}
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            {t.employeesDesc}
          </p>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold text-slate-900">
            {t.latestNews}
          </h2>

          <div className="mt-5 space-y-3">
            {news.slice(0, 5).map((item: any) => {
              const title = getLocalizedText(
                currentLocale,
                item.title_ru,
                item.title_uz,
                item.title_en
              );

              return (
                <Link
                  key={item.id}
                  href={`/admin/news/${item.slug}/edit`}
                  className="block rounded-xl bg-slate-50 p-4 transition hover:bg-blue-50"
                >
                  <p className="font-semibold text-slate-900">{title}</p>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.category || t.defaultCategory} ·{" "}
                    {new Date(item.created_at).toLocaleDateString(dateLocale)}
                  </p>
                </Link>
              );
            })}

            {news.length === 0 && (
              <p className="rounded-xl bg-slate-50 p-5 text-center text-slate-500">
                {t.noNews}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold text-slate-900">
            {t.quickActions}
          </h2>

          <div className="mt-5 grid gap-3">
            <Link
              href="/admin/news/new"
              className="rounded-xl bg-blue-700 px-5 py-4 font-semibold text-white transition hover:bg-blue-800"
            >
              {t.addNews}
            </Link>

            <Link
              href="/admin/documents"
              className="rounded-xl bg-slate-100 px-5 py-4 font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              {t.addDocument}
            </Link>

            <Link
              href="/admin/employees"
              className="rounded-xl bg-slate-100 px-5 py-4 font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              {t.addEmployee}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}