// ✏️ عدّلي بيانات الدعوة من هنا فقط
export const invite = {
  names: ["Lujain", "Yasmeen", "Sara"], // عدّلي الإملاء الإنجليزي للأسماء إذا لزم
  title: "Lujain, Yasmeen & Sara's Birthday",
  dateISO: "2026-10-30T19:30:00+03:00", // التاريخ والوقت (للعد التنازلي والتقويم)
  endISO: "2026-10-30T23:30:00+03:00",
  day: "30",
  month: "October",
  year: "2026",
  weekday: "Friday",
  dateLabel: "30 October",
  timeLabel: "7:00 PM – 12:00 AM",
  venue: "Riyadh, Saudi Arabia", // ✏️ اسم المكان
  address: "", // ✏️ العنوان
  mapUrl: "", // ✏️ رابط الخريطة
  notes: [
    "Get ready for FUN!",
    "Dress glam silver, pink and sparkle ",
  ],
  whatsapp: "966500000000", // رقم واتساب بدون + للتأكيد
};
export type Invite = typeof invite;
