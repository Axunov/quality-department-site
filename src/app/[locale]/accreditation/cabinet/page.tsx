import HeadCabinet from "@/components/accreditation/HeadCabinet";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params; const l=locale==='uz'||locale==='en'?locale:'ru'; return <main className="min-h-screen bg-slate-50 py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><HeadCabinet locale={l}/></div></main>}
