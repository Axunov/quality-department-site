import { redirect } from "next/navigation";
import AnalyticsUpload from "@/components/institute/AnalyticsUpload";
import { analyticsLanguage } from "@/lib/institute/copy";
import { requireAdminMfa } from "@/lib/adminSecurity";

export const dynamic="force-dynamic";
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const lang=analyticsLanguage((await params).locale);
 if(!await requireAdminMfa())redirect(`/${lang}/admin/login`);
 const date=new Date(Date.now()+5*3600_000);
 const start=date.getUTCFullYear()-(date.getUTCMonth()<8?1:0);
 return <AnalyticsUpload lang={lang} today={date.toISOString().slice(0,10)} initialYear={`${start}-${start+1}`} />;
}
