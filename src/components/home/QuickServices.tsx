import { Link } from "@/i18n/routing";

const services = [
  {
    title: "Мониторинг",
    text: "Посещаемость, успеваемость и качество занятий.",
    href: "/monitoring",
    icon: "📊",
  },
  {
    title: "Аналитика",
    text: "Сводные показатели и аналитические материалы.",
    href: "/analytics",
    icon: "📈",
  },
  {
    title: "FAQ",
    text: "Ответы на часто задаваемые вопросы.",
    href: "/faq",
    icon: "❓",
  },
  {
    title: "Обращения",
    text: "Предложения, замечания и вопросы по качеству образования.",
    href: "/appeals",
    icon: "✉️",
  },
  {
    title: "Админ-панель",
    text: "Управление новостями, документами и сотрудниками.",
    href: "/admin",
    icon: "⚙️",
  },
];

export function QuickServices() {
  return (
    <section className="container-main py-14">
      <div className="mb-8">
        <p className="soft-label">Сервисы</p>
        <h2 className="mt-4 section-title">Быстрые сервисы отдела</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {services.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            <p className="mt-5 text-sm font-bold text-blue-700">Открыть →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}