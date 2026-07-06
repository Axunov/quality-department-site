export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold">
              Отдел контроля качества образования
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Совместный Белорусско–Узбекский межотраслевой институт прикладных
              технических квалификаций в городе Ташкенте.
            </p>
          </div>

          <div>
            <p className="font-semibold">Разделы</p>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>О подразделении</p>
              <p>Сотрудники</p>
              <p>Новости</p>
              <p>Документы</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Контакты</p>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>г. Ташкент, Республика Узбекистан</p>
              <p>Email: quality@sbumiptk.uz</p>
              <p>Telegram: @quality_department</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          © 2026. Все права защищены.
        </div>
      </div>
    </footer>
  );
}