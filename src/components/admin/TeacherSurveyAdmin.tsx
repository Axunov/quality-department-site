"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Row = Record<string, any>;

function downloadCsv(filename: string, rows: Row[]) {
  const keys = rows.length ? Object.keys(rows[0]) : [];
  const quote = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = "\uFEFF" + [keys.map(quote).join(";"), ...rows.map((row) => keys.map((key) => quote(row[key])).join(";"))].join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value.trim().toUpperCase());
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return "\\x" + Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = () => Array.from({ length: 4 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `${part()}-${part()}`;
}

export default function TeacherSurveyAdmin() {
  const supabase = useMemo(() => createClient(), []);
  const [periods, setPeriods] = useState<Row[]>([]);
  const [groups, setGroups] = useState<Row[]>([]);
  const [teachers, setTeachers] = useState<Row[]>([]);
  const [assignments, setAssignments] = useState<Row[]>([]);
  const [submissions, setSubmissions] = useState<Row[]>([]);
  const [answers, setAnswers] = useState<Row[]>([]);
  const [accessCodes, setAccessCodes] = useState<Row[]>([]);
  const [groupName, setGroupName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [subject, setSubject] = useState("");
  const [studentNames, setStudentNames] = useState("");
  const [participantSearch, setParticipantSearch] = useState("");
  const [participantGroupFilter, setParticipantGroupFilter] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    async function fetchAll(
      table: string,
      select: string,
      orderColumn: string,
      ascending = true,
    ) {
      const allRows: Row[] = [];
      const pageSize = 1000;
      for (let from = 0; ; from += pageSize) {
        const { data, error } = await supabase
          .from(table)
          .select(select)
          .order(orderColumn, { ascending })
          .range(from, from + pageSize - 1);
        if (error) throw error;
        allRows.push(...(data || []));
        if (!data || data.length < pageSize) break;
      }
      return allRows;
    }

    const [p, g, t, a, s, r, c] = await Promise.all([
      supabase.from("survey_periods").select("*").order("created_at", { ascending: false }),
      supabase.from("survey_groups").select("*").order("name"),
      supabase.from("survey_teachers").select("*").order("full_name"),
      supabase.from("survey_group_teachers").select("*,survey_groups(name),survey_teachers(full_name)").order("sort_order"),
      fetchAll("survey_submissions", "*,survey_groups(name),survey_periods(title)", "created_at", false),
      fetchAll("survey_teacher_answers", "*,survey_teachers(full_name),survey_submissions(group_id,created_at,survey_groups(name))", "created_at", false),
      fetchAll("survey_access_codes", "id,group_id,participant_name,student_identifier,used_at,created_at,survey_groups(name)", "participant_name"),
    ]);
    setPeriods(p.data || []);
    setGroups(g.data || []);
    setTeachers(t.data || []);
    setAssignments(a.data || []);
    setSubmissions(s);
    setAnswers(r);
    setAccessCodes(c);
  }, [supabase]);

  useEffect(() => { void load(); }, [load]);

  async function add(table: string, values: Row, clear: () => void) {
    setMessage("");
    const { error } = await supabase.from(table).insert(values);
    if (error) setMessage(error.message);
    else { clear(); await load(); }
  }

  async function addParticipants() {
    const period = periods.find((item) => item.active);
    const participants = studentNames
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [studentIdentifier, ...nameParts] = line.split("|");
        return {
          studentIdentifier: studentIdentifier?.trim().toUpperCase(),
          participantName: nameParts.join("|").trim(),
        };
      });
    if (!period || !groupId || participants.length < 1 || participants.length > 500) {
      setMessage("Выберите группу и вставьте от 1 до 500 строк в формате: STU-1818 | Ф.И.О.");
      return;
    }
    if (participants.some((item) =>
      !/^STU-\d{4,}$/.test(item.studentIdentifier) || !item.participantName
    )) {
      setMessage("Проверьте формат: STU-1818 | Ф.И.О. студента.");
      return;
    }
    const codes = participants.map(() => randomCode());
    const rows = await Promise.all(codes.map(async (code, index) => ({
      period_id: period.id,
      group_id: groupId,
      code_hash: await sha256(code),
      code_prefix: code.slice(0, 4),
      participant_name: participants[index].participantName,
      student_identifier: participants[index].studentIdentifier,
    })));
    const { error } = await supabase.from("survey_access_codes").insert(rows);
    if (error) {
      setMessage(error.message);
      return;
    }
    setStudentNames("");
    setMessage(`Добавлено студентов: ${participants.length}. Они могут входить по Student ID.`);
    await load();
  }

  function exportParticipation() {
    const rows = accessCodes.map((item) => {
      const group = Array.isArray(item.survey_groups) ? item.survey_groups[0] : item.survey_groups;
      return {
        group: group?.name || "",
        participant: item.participant_name || "Без имени (старый код)",
        student_identifier: item.student_identifier || "",
        status: item.used_at ? "Прошёл" : "Не прошёл",
      };
    });
    downloadCsv("Реестр_участия_студентов.csv", rows);
  }

  const visibleAccessCodes = accessCodes.filter((item) => {
    const matchesGroup =
      !participantGroupFilter || item.group_id === participantGroupFilter;
    const query = participantSearch.trim().toLocaleLowerCase("ru");
    const matchesSearch =
      !query ||
      String(item.participant_name || "").toLocaleLowerCase("ru").includes(query) ||
      String(item.student_identifier || "").toLocaleLowerCase("ru").includes(query);
    return matchesGroup && matchesSearch;
  });

  function exportAnswers() {
    const rows = answers.map((answer) => {
      const submission = Array.isArray(answer.survey_submissions) ? answer.survey_submissions[0] : answer.survey_submissions;
      const group = Array.isArray(submission?.survey_groups) ? submission.survey_groups[0] : submission?.survey_groups;
      const teacher = Array.isArray(answer.survey_teachers) ? answer.survey_teachers[0] : answer.survey_teachers;
      const ratings = answer.ratings || [];
      return {
        date: new Date(answer.created_at).toLocaleString("ru-RU"),
        group: group?.name || "",
        teacher: teacher?.full_name || "",
        q1: ratings[0], q2: ratings[1], q3: ratings[2], q4: ratings[3],
        q5: ratings[4], q6: ratings[5], q7: ratings[6], q8: ratings[7],
        violation: answer.violation,
        comment: answer.comment || "",
      };
    });
    downloadCsv("Результаты_Преподаватель_глазами_студента.csv", rows);
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[.18em] text-cyan-700">Анонимное анкетирование</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Преподаватель глазами студента</h1>
        </div>
        <button onClick={exportAnswers} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">Скачать результаты CSV</button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-slate-500">Завершено анкет</p><strong className="mt-2 block text-4xl text-blue-700">{submissions.length}</strong></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-slate-500">Студентов прошли</p><strong className="mt-2 block text-4xl text-emerald-700">{accessCodes.filter((item) => item.used_at).length}</strong></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-slate-500">Оценок преподавателей</p><strong className="mt-2 block text-4xl text-cyan-700">{answers.length}</strong></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-slate-500">Учебных групп</p><strong className="mt-2 block text-4xl text-violet-700">{groups.length}</strong></div>
      </div>

      {message && <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-semibold text-amber-900">{message}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">1. Группы и преподаватели</h2>
          <form onSubmit={(event) => { event.preventDefault(); void add("survey_groups", { name: groupName.trim() }, () => setGroupName("")); }} className="mt-4 flex gap-2">
            <input required value={groupName} onChange={(event) => setGroupName(event.target.value)} placeholder="Например: 15-25 ИП" className="min-w-0 flex-1 rounded-xl border px-4 py-3" />
            <button className="rounded-xl bg-blue-700 px-4 font-bold text-white">Добавить группу</button>
          </form>
          <form onSubmit={(event) => { event.preventDefault(); void add("survey_teachers", { full_name: teacherName.trim() }, () => setTeacherName("")); }} className="mt-3 flex gap-2">
            <input required value={teacherName} onChange={(event) => setTeacherName(event.target.value)} placeholder="Ф.И.О. преподавателя" className="min-w-0 flex-1 rounded-xl border px-4 py-3" />
            <button className="rounded-xl bg-blue-700 px-4 font-bold text-white">Добавить</button>
          </form>
          <p className="mt-4 text-sm text-slate-500">Групп: {groups.length}. Преподавателей: {teachers.length}.</p>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">2. Закрепление за группой</h2>
          <div className="mt-4 grid gap-3">
            <select value={groupId} onChange={(event) => setGroupId(event.target.value)} className="rounded-xl border bg-white px-4 py-3"><option value="">Выберите группу</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select>
            <select value={teacherId} onChange={(event) => setTeacherId(event.target.value)} className="rounded-xl border bg-white px-4 py-3"><option value="">Выберите преподавателя</option>{teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.full_name}</option>)}</select>
            <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Дисциплина" className="rounded-xl border px-4 py-3" />
            <button disabled={!groupId || !teacherId} onClick={() => void add("survey_group_teachers", { group_id: groupId, teacher_id: teacherId, subject: subject.trim() || null }, () => { setTeacherId(""); setSubject(""); })} className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white disabled:opacity-50">Закрепить преподавателя</button>
          </div>
          <p className="mt-4 text-sm text-slate-500">Создано назначений: {assignments.length}.</p>
        </section>
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black">3. Добавление новых студентов</h2>
        <p className="mt-2 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-900">
          Реестр из 1817 студентов уже импортирован. Используйте эту форму только
          для студентов, которых нет в основном списке. Для входа каждому
          студенту нужен постоянный Student ID.
        </p>
        <p className="mt-3 text-sm text-slate-500">Выберите группу выше и вставьте новых студентов. Одна строка: Student ID, знак | и Ф.И.О. Личные данные хранятся только в реестре участия и не записываются в ответы.</p>
        <div className="mt-4 grid gap-3">
          <textarea
            value={studentNames}
            onChange={(event) => setStudentNames(event.target.value)}
            placeholder={"STU-1818 | Абдуллаев Азиз Акмалович\nSTU-1819 | Иванова Мария Сергеевна"}
            className="min-h-44 w-full rounded-xl border px-4 py-3"
          />
          <button onClick={addParticipants} className="justify-self-start rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">Добавить студентов</button>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black">Реестр участия студентов</h2>
            <p className="mt-1 text-sm text-slate-500">Видно только, кто прошёл опрос. Ответы с Ф.И.О. не связаны.</p>
          </div>
          <button onClick={exportParticipation} className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white">Скачать реестр</button>
        </div>
        <div className="grid gap-3 border-b bg-slate-50 p-4 sm:grid-cols-2">
          <input
            value={participantSearch}
            onChange={(event) => setParticipantSearch(event.target.value)}
            placeholder="Поиск по Ф.И.О. или номеру"
            className="rounded-xl border bg-white px-4 py-3"
          />
          <select
            value={participantGroupFilter}
            onChange={(event) => setParticipantGroupFilter(event.target.value)}
            className="rounded-xl border bg-white px-4 py-3"
          >
            <option value="">Все группы ({accessCodes.length} студентов)</option>
            {groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-slate-50"><tr><th className="p-4">Ф.И.О. студента</th><th className="p-4">Группа</th><th className="p-4">Статус</th></tr></thead>
            <tbody>{visibleAccessCodes.map((item) => {
              const group = Array.isArray(item.survey_groups) ? item.survey_groups[0] : item.survey_groups;
              return (
                <tr key={item.id} className="border-t">
                  <td className="p-4 font-semibold">{item.participant_name || "Без имени (старый код)"}</td>
                  <td className="p-4">{group?.name || "—"}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 font-bold ${item.used_at ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                      {item.used_at ? "Прошёл" : "Не прошёл"}
                    </span>
                  </td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b p-6"><h2 className="text-xl font-black">Последние анкеты</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50"><tr><th className="p-4">Дата</th><th className="p-4">Группа</th><th className="p-4">Общая оценка</th><th className="p-4">Предложения</th></tr></thead>
            <tbody>{submissions.slice(0, 50).map((item) => {
              const group = Array.isArray(item.survey_groups) ? item.survey_groups[0] : item.survey_groups;
              return <tr key={item.id} className="border-t"><td className="p-4">{new Date(item.created_at).toLocaleString("ru-RU")}</td><td className="p-4">{group?.name}</td><td className="p-4 font-bold">{item.final_satisfaction}/5</td><td className="max-w-md p-4">{item.final_suggestions || "—"}</td></tr>;
            })}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
