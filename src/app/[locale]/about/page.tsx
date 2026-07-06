import { PageHeader } from "@/components/common/PageHeader";

const tasks = [
  "Мониторинг качества образовательного процесса",
  "Анализ посещаемости и успеваемости студентов",
  "Подготовка материалов по аккредитации",
  "Организация опросов студентов, преподавателей и работодателей",
  "Подготовка аналитических отчетов и справок",
  "Контроль исполнения решений по вопросам качества образования",
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        label="О подразделении"
        title="Отдел контроля качества образования"
        description="Структурное подразделение института, обеспечивающее внутреннюю систему качества, мониторинг учебного процесса и сопровождение аккредитационных процедур."
      />

      <section className="container-main py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-8">
            <h2 className="section-title">Миссия отдела</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Формирование эффективной, прозрачной и современной системы
              контроля качества образования.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="section-title">Цель деятельности</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Постоянное совершенствование образовательного процесса на основе
              мониторинга, анализа и обратной связи.
            </p>
          </div>
        </div>
      </section>

      <section className="container-main pb-20">
        <h2 className="section-title">Основные задачи отдела</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {tasks.map((item) => (
            <div key={item} className="card card-hover p-6">
              <p className="font-semibold text-slate-800">✓ {item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}