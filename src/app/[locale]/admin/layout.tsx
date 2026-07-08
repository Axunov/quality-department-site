import { Link } from "@/i18n/routing";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="min-h-screen w-72 bg-[#083b73] p-6 text-white">
          <h1 className="text-2xl font-bold">Админ-панель</h1>

          <nav className="mt-8 space-y-2">
            <Link href="/admin" className="block rounded-xl px-4 py-3 hover:bg-white/10">
              📊 Dashboard
            </Link>

            <Link href="/admin/news" className="block rounded-xl px-4 py-3 hover:bg-white/10">
              📰 Новости
            </Link>

            <Link href="/admin/documents" className="block rounded-xl px-4 py-3 hover:bg-white/10">
              📄 Документы
            </Link>

            <Link href="/admin/employees" className="block rounded-xl px-4 py-3 hover:bg-white/10">
              👨‍🏫 Сотрудники
            </Link>

            <Link href="/" className="mt-8 block rounded-xl bg-white/10 px-4 py-3 hover:bg-white/20">
              ← На сайт
            </Link>
          </nav>
        </aside>

        <section className="flex-1 p-8">
          {children}
        </section>
      </div>
    </main>
  );
}