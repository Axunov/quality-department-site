import EditorialPreview from "./EditorialPreview";
import { editorialLanguages, type EditorialLanguage } from "./EditorialTranslation";

const fields = {
  ru: ["Русский", "Название", "Описание"],
  uz: ["O‘zbekcha", "Nomi", "Tavsif"],
  en: ["English", "Title", "Description"],
} as const;

export function DocumentTextFields({ source, document }: { source: EditorialLanguage; document?: Partial<Record<`title_${EditorialLanguage}` | `description_${EditorialLanguage}`, string | null>> }) {
  return <div className="my-5 space-y-3">
    {editorialLanguages.map(lang => <details key={lang} open={source === lang || undefined} data-editor-language={lang} className="editorial-fields">
      <summary className="cursor-pointer font-semibold">{fields[lang][0]}</summary>
      <div className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">{fields[lang][1]}<input name={`title_${lang}`} defaultValue={document?.[`title_${lang}`] || ""} maxLength={500} className="rounded-lg border border-slate-300 bg-transparent p-3" /></label>
        <label className="grid gap-2 text-sm font-semibold">{fields[lang][2]}<textarea name={`description_${lang}`} defaultValue={document?.[`description_${lang}`] || ""} className="min-h-28 rounded-lg border border-slate-300 bg-transparent p-3" /></label>
      </div>
    </details>)}
    <EditorialPreview locale={source} field="description" />
  </div>;
}
