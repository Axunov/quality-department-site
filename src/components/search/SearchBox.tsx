import { Link } from "@/i18n/routing";

type SearchBoxProps = {
  placeholder: string;
};

export function SearchBox({ placeholder }: SearchBoxProps) {
  return (
    <Link
      href="/search"
      className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-slate-500 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      🔍 {placeholder}
    </Link>
  );
}