import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { portalLocale } from "@/data/portal";

export default function Breadcrumbs({ locale, items }: { locale: string; items: ReadonlyArray<{ label: string; href?: string }> }) {
  const [navigation, home] = {
    ru: ["Путь к странице", "Главная"],
    uz: ["Sahifa yöli", "Boş sahifa"],
    en: ["Breadcrumb", "Home"],
  }[portalLocale(locale)];
  return <nav aria-label={navigation} className="mb-4 text-sm text-slate-600">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <li><Link href="/" className="font-semibold hover:underline">{home}</Link></li>
      {items.map((item, index) => <li key={index} className="inline-flex items-center gap-2">
        <ChevronRight size={14} aria-hidden="true" />
        {item.href ? <Link href={item.href} className="font-semibold hover:underline">{item.label}</Link> : <span aria-current="page">{item.label}</span>}
      </li>)}
    </ol>
  </nav>;
}
