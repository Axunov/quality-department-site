import type { ReactNode } from "react";
export type EditorialLocale="ru"|"uz"|"en";
export const editorialLocale=(value:string):EditorialLocale=>value==="uz"||value==="en"?value:"ru";

export function EditorialIntro({title,description,children}:{title:string;description:string;children?:ReactNode}){
 return <header className="editorial-intro"><div className="container-main">
  <h1>{title}</h1><p>{description}</p>{children}
 </div></header>;
}

export function EditorialContents({locale,links,children}:{locale:EditorialLocale;links:readonly (readonly [string,string])[];children:ReactNode}){
 const label={ru:"На этой странице",uz:"Uşbu sahifada",en:"On this page"}[locale];
 return <div className="container-main editorial-layout">
   <nav className="editorial-toc" aria-label={label}><p>{label}</p><ul>{links.map(([id,title])=><li key={id}><a href={"#"+id}>{title}</a></li>)}</ul></nav>
   <div className="min-w-0 space-y-6">{children}</div>
 </div>;
}

export function EditorialSection({id,title,lead,children}:{id:string;title:string;lead?:string;children:ReactNode}){
 return <section id={id} className="editorial-section editorial-surface" aria-labelledby={id+"-title"}>
   <h2 id={id+"-title"}>{title}</h2>{lead&&<p className="editorial-lead">{lead}</p>}{children}
 </section>;
}
