import { ArrowUpRight, GraduationCap, Presentation, ClipboardCheck, ShieldCheck, Ticket } from "lucide-react";
import { Link } from "@/i18n/routing";
import { portalRoles, portalUI, portalLocale } from "@/data/portal";

const roles=[GraduationCap,Presentation,ClipboardCheck,ShieldCheck];
const copy={
 ru:{label:"Личные кабинеты",track:"Проверить статус обращения",all:"Все способы входа"},
 uz:{label:"Şaxsiy kabinetlar",track:"Murojaat holatini tekşiriş",all:"Barça kiriş usullari"},
 en:{label:"Accounts",track:"Track an appeal",all:"All sign-in options"},
};

export default function AccountGateway({locale,onNavigate}:{locale:string;onNavigate?:()=>void}){
 const l=portalLocale(locale), t=copy[l];
 const dismiss=(target:HTMLElement)=>{target.closest("details")?.removeAttribute("open");onNavigate?.();};
 return <details className="account-gateway relative" name="masthead" onKeyDown={e=>{
   if(e.key==="Escape"&&e.currentTarget.open){e.currentTarget.open=false;e.currentTarget.querySelector("summary")?.focus();}
 }}>
  <summary className="account-trigger">{t.label} <span aria-hidden="true">⌄</span></summary>
  <div className="account-panel editorial-glass">
   {portalRoles.map((role,i)=>{const Icon=roles[i], [label,description]=portalUI[l][role.id];return <Link key={role.id} href={role.href} className="account-option" onClick={e=>dismiss(e.currentTarget)}>
    <span className="account-icon" data-account={role.id}><Icon size={18} aria-hidden="true"/></span><span><strong>{label}</strong><small>{description}</small></span>
   </Link>})}
   <Link href="/appeals#track" className="account-shortcut" onClick={e=>dismiss(e.currentTarget)}><Ticket size={17} aria-hidden="true"/>{t.track}</Link>
   <Link href="/portal" className="account-shortcut" onClick={e=>dismiss(e.currentTarget)}>{t.all}<ArrowUpRight size={16} aria-hidden="true"/></Link>
  </div>
 </details>;
}
