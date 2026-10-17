"use client";
import { useEffect, useState } from "react";

function parts(target: number) {
  const d = Math.max(0, target - Date.now());
  return [
    ["days", Math.floor(d / 864e5)],
    ["hours", Math.floor(d / 36e5) % 24],
    ["min", Math.floor(d / 6e4) % 60],
    ["sec", Math.floor(d / 1e3) % 60],
  ] as const;
}

// قلتر احتياطي بالـ CSS (يظهر تحت الصورة، وبدالها لو ما انحملت)
const GLITTER =
  "radial-gradient(circle at 20% 25%,#fff 0 1.5px,#0000 2px)," +
  "radial-gradient(circle at 70% 18%,#fff 0 1.2px,#0000 2px)," +
  "radial-gradient(circle at 45% 60%,#fff 0 1.5px,#0000 2px)," +
  "radial-gradient(circle at 85% 70%,#fff 0 1.2px,#0000 2px)," +
  "radial-gradient(circle at 15% 85%,#fff 0 1.4px,#0000 2px)," +
  "linear-gradient(135deg,#ffd1e3,#f06ea5 55%,#c23a78)";

export default function Countdown({
  date,
  className,
  bg = "/images/Sparkly.jpeg",
}: {
  date: string;
  className?: string;
  bg?: string;
}) {
  const target = new Date(date).getTime();
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    setT(parts(target));
    const id = setInterval(() => setT(parts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) return <div className={`min-h-[84px] ${className || "mt-8"}`} />;

  return (
    <div className={`flex justify-center gap-2.5 ${className || "mt-8"}`}>
      {t.map(([label, v], i) => (
        <div
          key={label}
          className="w-[68px] overflow-hidden rounded-xl border-2 border-white py-2 shadow-[0_6px_14px_rgba(60,20,40,.25)]"
          style={{
            // طبقة بيضاء خفيفة عشان الأرقام تبان، ثم الصورة، ثم القلتر الاحتياطي
            background: `linear-gradient(rgba(255,255,255,.35),rgba(255,255,255,.2)), url(${bg}) center/cover, ${GLITTER}`,
            transform: `rotate(${i % 2 ? 3 : -3}deg)`,
          }}
        >
          <b className="block font-serif text-[30px] font-bold leading-none text-rose [text-shadow:0_1px_0_#fff,0_0_8px_#fff]">
            {String(v).padStart(2, "0")}
          </b>
          <small className="font-hand text-lg font-bold text-rose [text-shadow:0_1px_0_#fff]">{label}</small>
        </div>
      ))}
    </div>
  );
}