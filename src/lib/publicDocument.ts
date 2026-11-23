import type { DocumentItem } from "@/services/documents.service";
import { uzbekAlphabet } from "@/lib/uzbekAlphabet";

export type DocumentLocale = "ru" | "uz" | "en";
export const documentLocales: DocumentLocale[] = ["ru","uz","en"];
export function documentText(document:DocumentItem,locale:DocumentLocale,field:"title"|"description"){
  for(const lang of [locale,...documentLocales.filter(l=>l!==locale)]){
    const value=document[`${field}_${lang}`]?.trim();
    if(value)return locale==="uz"&&lang==="uz" ? uzbekAlphabet(value) : value;
  }
  return "";
}

export function documentUrl(value?:string|null){
  try{return value && new URL(value).protocol==="https:" ? value : null;}catch{return null;}
}
