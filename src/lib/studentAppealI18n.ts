export const appealStatusLabels={
 ru:{draft:"Черновик",submitted:"Отправлено",registered:"Зарегистрировано",assigned:"Назначен ответственный",in_review:"На рассмотрении",clarification:"Требуется уточнение",answered:"Ответ подготовлен",completed:"Завершено",rejected:"Отклонено",cancelled:"Аннулировано"},
 uz:{draft:"Qoralama",submitted:"Yuborildi",registered:"Ro‘yxatga olindi",assigned:"Mas’ul tayinlandi",in_review:"Ko‘rib chiqilmoqda",clarification:"Aniqlashtirish talab etiladi",answered:"Javob tayyorlandi",completed:"Yakunlandi",rejected:"Rad etildi",cancelled:"Bekor qilindi"},
 en:{draft:"Draft",submitted:"Submitted",registered:"Registered",assigned:"Assignee appointed",in_review:"Under review",clarification:"Clarification required",answered:"Answer prepared",completed:"Completed",rejected:"Rejected",cancelled:"Cancelled"}
} as const;
export function appealStatusLabel(locale:string,status:string){const l=locale==="uz"||locale==="en"?locale:"ru";return appealStatusLabels[l][status as keyof typeof appealStatusLabels.ru]||status;}
