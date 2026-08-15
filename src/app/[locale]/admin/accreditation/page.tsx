import AdminAccreditation from "@/components/accreditation/AdminAccreditation";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params; const l=locale==='uz'||locale==='en'?locale:'ru'; return <AdminAccreditation locale={l}/>}
