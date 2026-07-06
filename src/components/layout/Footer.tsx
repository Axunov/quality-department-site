import Image from "next/image";
import { Link } from "@/i18n/routing";

export function Footer() {
  return (
    <footer className="mt-16 bg-[#083b73] text-white">
      <div className="container-main py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.jpg"
                alt="Логотип института"
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-full object-cover bg-white"
              />

              <div>
                <h2 className="text-2xl font-extrabold">
                  Отдел контроля качества образования
                </h2>
                <p className="mt-2 text-sm text-blue-100">
                  Совместный Белорусско–Узбекский межотраслевой институт
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl leading-7 text-blue-100">
              Официальный портал отдела контроля качества образования:
              мониторинг, аккредитация, документы, новости и обратная связь.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">Быстрые ссылки</h3>
            <div className="mt-5 grid gap-3 text-blue-100">
              <Link href="/about">О подразделении</Link>
              <Link href="/employees">Сотрудники</Link>
              <Link href="/news">Новости</Link>
              <Link href="/documents">Документы</Link>
              <Link href="/accreditation">Аккредитация</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Контакты</h3>
            <div className="mt-5 space-y-3 text-blue-100">
              <p>📍 Ташкентская область, Кибрайский район, Корамурт 1</p>
              <p>☎ +998 90 322-26-29</p>
              <p>✉ quality@sbumiptk.uz</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-blue-100">
          © 2026 Отдел контроля качества образования. Все права защищены.
        </div>
      </div>
    </footer>
  );
}