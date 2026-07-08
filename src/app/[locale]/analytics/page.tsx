import { PageHeader } from "@/components/common/PageHeader";

const reports = [
  {
    title: "Анализ посещаемости",
    value: "87%",
    text: "Средний показатель посещаемости занятий по данным внутреннего мониторинга.",
    icon: "👥",
  },
  {
    title: "Качество занятий",
    value: "89%",
    text: "Оценка качества проведения занятий по результатам наблюдений и опросов.",
    icon: "📊",
  },
  {
    title: "Удовлетворённость студентов",
    value: "84%",
    text: "Результаты анкетирования студентов по вопросам образовательной среды.",
    icon: "📝",
  },
  {
    title: "Готовность документов",
    value: "92%",
    text: "Степень подготовки материалов для аккредитации и внутренней отчётности.",
    icon: "📄",
  },
];

export default function AnalyticsPage() {
  return (
    <main>
      <PageHeader
        label="Аналитика"
        title="Аналитика качества образования"
        description="Сводные показатели, аналитические материалы и ключевые результаты внутреннего мониторинга."
      />

      <section className="container-main py-16">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {reports.map((item) => (
            <div
              key={item.title}
              className="rounded-[30px] bg-white p-7 shadow-xl shadow-slate-200/70"
            >
              <div className="text-5xl">{item.icon}</div>
              <p className="mt-6 text-5xl font-extrabold text-[#0b3b78]">
                {item.value}
              </p>
              <h2 className="mt-4 text-xl font-bold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70">
          <h2 className="section-title">Аналитические направления</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              "анализ учебного процесса",
              "оценка посещаемости занятий",
              "анализ результатов опросов",
              "подготовка справок для руководства",
              "мониторинг выполнения индикаторов",
              "формирование рекомендаций по улучшению качества",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-900"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}