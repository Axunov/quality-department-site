import { redirect } from 'next/navigation';
export default async function Page({params,searchParams}:{params:Promise<{locale:string}>,searchParams:Promise<{program?:string}>}){const{locale}=await params;const sp=await searchParams;redirect(`/${locale}/accreditation/special${sp.program?`?program=${encodeURIComponent(sp.program)}`:''}`)}
