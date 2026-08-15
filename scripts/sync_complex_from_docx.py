import json
import re
import subprocess
import sys
from pathlib import Path

from docx import Document


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
RU_PATH = ROOT / "src/lib/accreditation/complexData.ts"
UZ_PATH = ROOT / "src/lib/accreditation/complexDataUz.ts"
SQL_PATH = ROOT / "supabase/ACCREDITATION_V5_9_COMPLEX_272_AND_UZ.sql"


def clean(value: str) -> str:
    return " ".join(value.split())


raw = subprocess.check_output(
    ["git", "show", "HEAD:src/lib/accreditation/complexData.ts"],
    cwd=ROOT,
    text=True,
)
array_start = raw.index("[", raw.index("=", raw.index("export const complexIndicators")))
ru_items = json.loads(raw[array_start : raw.rindex("]") + 1])
ru_by_code = {item["code"]: item for item in ru_items}

table = Document(SOURCE).tables[1]
chapter = ""
criterion_no = ""
criterion = ""
criterion_index = 0
uz_items = []

for row in table.rows[2:]:
    cells = [clean(cell.text) for cell in row.cells]
    if cells[0].startswith(tuple(f"{n}-bob" for n in range(1, 10))):
        chapter = cells[0]
        continue
    if re.fullmatch(r"\d+", cells[0]):
        if cells[0] != criterion_no:
            criterion_no = cells[0]
            criterion_index = 0
        criterion = cells[1]
    elif not (not cells[0] and not cells[1] and cells[2] and cells[4] and criterion_no):
        continue
    criterion_index += 1
    uz_items.append(
        {
            "code": f"{criterion_no}.{criterion_index}",
            "chapter": chapter,
            "criterion": criterion,
            "indicator": cells[2],
            "evidence": cells[3],
            "responsible": cells[4],
        }
    )

if len(uz_items) != 272:
    raise SystemExit(f"Expected 272 indicators, extracted {len(uz_items)}")

missing_ru = {
    "12.5": {
        "indicator": "Параметры приема согласованы с планом развития организации высшего образования (стратегическим планом, миссией, стратегией) и ее академическим профилем",
        "evidence": "Стратегический план организации высшего образования",
    },
    "12.6": {
        "indicator": "Параметры приема сформированы с учетом потребностей рынка труда, приоритетных направлений образования и научного потенциала",
        "evidence": "Сведения и подтверждающие документы о формировании параметров приема с учетом потребностей рынка труда, приоритетных направлений образования и научного потенциала",
    },
    "12.7": {
        "indicator": "Ежегодно проводился анализ выполнения параметров приема, и по результатам анализа в параметры приема вносились необходимые изменения",
        "evidence": "Сведения и подтверждающие документы об изменениях, внесенных на основании анализа",
    },
}

role_ru = {
    "O‘quv ishlari bo‘yicha direktor o‘rinbosari": "Заместитель директора по учебной работе",
    "Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari": "Заместитель директора по научной работе и инновациям",
    "Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari": "Заместитель директора по вопросам молодежи и духовно-просветительской работе",
    "Ishlar boshqarmasi boshlig‘i": "Начальник управления делами",
    "Ta'lim sifatini nazorat qilish bo‘limi boshlig‘i": "Начальник отдела контроля качества образования",
    "Ta’lim sifatini nazorat qilish bo‘limi boshlig‘i": "Начальник отдела контроля качества образования",
    "Bosh hisobchi": "Главный бухгалтер",
    "Axborot-resurs markazi direktori": "Директор информационно-ресурсного центра",
    "Xodimlar bo‘limi boshlig‘i": "Начальник отдела кадров",
    "Registrator ofisi boshlig‘i": "Начальник офиса регистратора",
    "Raqamli ta'lim texnologiyalari bo‘limi boshlig‘i": "Начальник отдела цифровых образовательных технологий",
    "Psixolog": "Психолог",
    "Kengash kotibi": "Секретарь Совета",
    "Moliya-iqtisod bo‘limi boshlig‘i": "Начальник финансово-экономического отдела",
}


def translate_roles(value: str) -> str:
    return "; ".join(role_ru.get(part.strip(), part.strip()) for part in value.split(";"))


ru_out = []
for uz in uz_items:
    code = uz["code"]
    if code in ru_by_code:
        item = dict(ru_by_code[code])
    else:
        item = {
            "code": code,
            "chapter": ru_by_code["12.4"]["chapter"],
            "criterion": ru_by_code["12.4"]["criterion"],
            **missing_ru[code],
            "responsible": "",
        }
    item["responsible"] = translate_roles(uz["responsible"])
    ru_out.append(item)

RU_PATH.write_text(
    "export type ComplexIndicator = {code:string; chapter:string; criterion:string; indicator:string; evidence:string; responsible:string};\n"
    "export const complexIndicators: ComplexIndicator[] = "
    + json.dumps(ru_out, ensure_ascii=False, indent=2)
    + ";\n",
    encoding="utf-8",
)

UZ_PATH.write_text(
    "import type { ComplexIndicator } from './complexData';\n"
    "export const complexIndicatorsUz: ComplexIndicator[] = "
    + json.dumps(uz_items, ensure_ascii=False, indent=2)
    + ";\n",
    encoding="utf-8",
)

values = []
for item in uz_items:
    owner = item["responsible"].replace("'", "''")
    values.append(f"  ('{item['code']}', '{owner}')")

SQL_PATH.write_text(
    """-- V5.9: 272 complex-accreditation indicators and owners from the approved Uzbek source.
-- Safe to rerun. Existing progress, documents, reviews and assignments are preserved.

with source(code, responsible_label) as (
 values
"""
    + ",\n".join(values)
    + """
), project as (
  select id from public.accreditation_v3_projects where code = 'complex'
)
insert into public.accreditation_v3_indicators(project_id, code, responsible_label)
select project.id, source.code, source.responsible_label
from source cross join project
on conflict(project_id, code) do update
set responsible_label = excluded.responsible_label;

create or replace function public.accreditation_v5_position_keys(label text)
returns text[] language plpgsql immutable as $$
declare s text := lower(coalesce(label,'')); r text[] := '{}';
begin
  if s='' then return r; end if;
  if s ~ 'юрисконсульт|yuriskonsult' then r:=array_append(r,'legal_counsel'); end if;
  if s ~ 'секретар.*совет|kengash kotibi|канцеляр' then r:=array_append(r,'council_secretary'); end if;
  if s ~ 'заместител.*учебн|o‘quv ishlari.*o‘rinbosari|o''quv ishlari.*o''rinbosari' then r:=array_append(r,'deputy_academic'); end if;
  if s ~ 'главн.*бухгалтер|bosh hisobchi' then r:=array_append(r,'chief_accountant'); end if;
  if s ~ 'контрол.*качеств|ta’lim sifatini nazorat|ta''lim sifatini nazorat' then r:=array_append(r,'head_quality'); end if;
  if s ~ 'управлен.*дел|ishlar boshqarmasi' then r:=array_append(r,'head_affairs'); end if;
  if s ~ 'отдел.*кадр|xodimlar bo‘limi|xodimlar bo''limi' then r:=array_append(r,'head_hr'); end if;
  if s ~ 'международн.*сотруднич|xalqaro hamkorlik' then r:=array_append(r,'head_international'); end if;
  if s ~ 'учебно-метод|o‘quv-uslubiy|o''quv-uslubiy' then r:=array_append(r,'head_methodological'); end if;
  if s ~ 'офис.*регистратор|registrator ofisi' then r:=array_append(r,'head_registrar'); end if;
  if s ~ 'научн.*исследован.*инновац|ilmiy tadqiqotlar.*innovats' then r:=array_append(r,'head_science'); end if;
  if s ~ 'заместител.*научн|ilmiy ishlar.*o‘rinbosari|ilmiy ishlar.*o''rinbosari' then r:=array_append(r,'deputy_science'); end if;
  if s ~ 'молодеж|yoshlar.*o‘rinbosari|yoshlar.*o''rinbosari' then r:=array_append(r,'deputy_youth'); end if;
  if s ~ 'финансово-эконом|reja-moliya|moliya-iqtisod' then r:=array_append(r,'head_finance'); end if;
  if s ~ 'маркетинг.*практик|marketing va talabalar amaliyoti' then r:=array_append(r,'head_marketing'); end if;
  if s ~ 'цифров.*образователь|цифров.*технолог|raqamli.*ta.lim.*texnolog|raqamli va axborot texnologiyalari' then r:=array_append(r,'head_digital'); end if;
  if s ~ 'заведующ.*кафедр|кафедр.*завед|tegishli kafedra mudiri' then r:=array_append(r,'department_head'); end if;
  if s ~ 'декан|dekanat' then r:=array_append(r,'dean'); end if;
  if s ~ 'приемн.*комисс|qabul komissiyasi' then r:=array_append(r,'admissions_secretary'); end if;
  if s ~ 'апелляц|apellyatsiya' then r:=array_append(r,'appeal_secretary'); end if;
  if s ~ 'комплаенс|komplayens' then r:=array_append(r,'compliance'); end if;
  if s ~ 'информационно-ресурс|axborot-resurs markazi' then r:=array_append(r,'library'); end if;
  if s ~ 'пресс-секретар|matbuot kotibi' then r:=array_append(r,'press_secretary'); end if;
  if s ~ 'гражданск.*защит|охран.*труд|mehnatni muhofaza' then r:=array_append(r,'civil_protection'); end if;
  if s ~ 'психолог|psixolog' then r:=array_append(r,'psychologist'); end if;
  if s ~ 'kpi' then r:=array_append(r,'kpi_chair'); end if;
  return (select coalesce(array_agg(distinct x),'{}') from unnest(r) x);
end $$;

update public.accreditation_v3_indicators i
set position_keys = public.accreditation_v5_position_keys(i.responsible_label)
from public.accreditation_v3_projects p
where p.id=i.project_id and p.code='complex';

-- Remove assignments that no longer match the corrected source, then assign
-- every active approved employee to the indicators for their current role.
update public.accreditation_v3_indicators i
set responsible_user_id = null
from public.accreditation_v3_profiles profile,
     public.accreditation_v3_projects project
where project.id = i.project_id
  and project.code = 'complex'
  and profile.user_id = i.responsible_user_id
  and not (profile.position_key = any(i.position_keys));

do $$
declare profile record;
begin
  for profile in
    select user_id, position_key
    from public.accreditation_v3_profiles
    where approval_status = 'approved'
      and is_active
      and position_key is not null
      and position_key <> 'director'
  loop
    perform public.accreditation_v5_assign_user(profile.user_id, profile.position_key);
  end loop;
end $$;

select count(*) as complex_indicators
from public.accreditation_v3_indicators i
join public.accreditation_v3_projects p on p.id=i.project_id
where p.code='complex';
""",
    encoding="utf-8",
)

print(f"Synced {len(uz_items)} indicators")
