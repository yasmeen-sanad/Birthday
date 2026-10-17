"use client";
import { useEffect, useId, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { invite } from "@/lib/invitation";
import Sparkles from "./Sparkles";
import Countdown from "./Countdown";
import Reveal from "./Reveal";
import { Stickers } from "@/components/Stickers";


// خلفية الـ intro (القديمة)
const INTRO_BG = "/images/intro-bg.png";
// خلفية الدعوة
const INVITE_BG = "/images/bg-pattern.png";

const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
    `DTSTART:${fmt(invite.dateISO)}`, `DTEND:${fmt(invite.endISO)}`,
    `SUMMARY:${invite.title}`, `LOCATION:${invite.venue}, ${invite.address}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "birthday.ics";
  a.click();
}


// قسم شفاف: الخلفية تجي من الـ main
function Section({
  flip,
  noSparkles,
  className = "",
  children,
  sectionRef,
}: {
  flip?: boolean;
  noSparkles?: boolean;
  className?: string;
  children: React.ReactNode;
  sectionRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <section ref={sectionRef} className={`relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden ${className}`}>
      {!noSparkles && <Sparkles flip={flip} />}
      <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center px-6 py-14 text-center">{children}</div>
    </section>
  );
}

const btn =
  "rounded-full border-2 px-[18px] py-[13px] text-base font-medium focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-hot";

export default function Invitation() {
  const wa = `https://wa.me/${invite.whatsapp}?text=${encodeURIComponent(`Hi! I'll be at ${invite.title} 🎉`)}`;
  const [a, b, c] = invite.names;
  const audioRef = useRef<HTMLAudioElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false); // ضغط على الـintro
  const [gone, setGone] = useState(false); // الـintro اختفى بالكامل
  const triggeredSections = useRef<Set<string>>(new Set());

  // منع السكرول وهو الـintro ظاهر
  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  // Intersection Observer for confetti on scroll
  useEffect(() => {
    if (!opened) return;

    const sections = [
      { ref: section1Ref, key: 'section1' },
      { ref: section2Ref, key: 'section2' },
      { ref: section3Ref, key: 'section3' },
      { ref: section4Ref, key: 'section4' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.ref.current === entry.target);
            if (section && !triggeredSections.current.has(section.key)) {
              triggerSectionConfetti();
              triggeredSections.current.add(section.key);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [opened]);

  function open() {
    if (opened) return;
    setOpened(true);
    // Play audio
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    // Trigger confetti burst
    triggerConfetti();
    window.scrollTo(0, 0);
    setTimeout(() => setGone(true), 800);
  }

  function triggerConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  function triggerSectionConfetti() {
    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f6a9c6', '#e86f9d', '#c23a78', '#ffd1e3', '#f06ea5'],
    };

    confetti({
      ...defaults,
      origin: { x: random(0.2, 0.8), y: 0.7 },
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        origin: { x: random(0.2, 0.8), y: 0.8 },
      });
    }, 200);
  }

  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <main className="relative isolate w-full">
      <audio ref={audioRef} src="/audio/rihanna.mp3" />
      {/* خلفية الدعوة (ثابتة ورا كل الأقسام) */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${INVITE_BG})` }}
      />
      <div className="fixed inset-0 -z-10 bg-white/20" />

      {/* ===== الـ intro (صفحة كاملة لحالها بخلفيتها القديمة) ===== */}
      {!gone && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Open invitation"
          onClick={open}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
          className={`fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-cover bg-center transition-all duration-700 ease-in-out ${
            opened ? "pointer-events-none -translate-y-12 opacity-0" : ""
          }`}
          style={{ backgroundImage: `url(${INTRO_BG})` }}
        >
          <Sparkles />
          <Reveal className="relative -top-10 z-10 flex flex-col items-center text-center">

            {/* Name intro */}
            <p className="mt-4 font-hand text-[28px] font-bold leading-none text-rose/70">it is</p>

            {/* Birthday names */}
            <div className="mt-2 flex flex-col items-center gap-0.5">
              {[a, b, c].map((name, i) => (
                <Reveal key={name} delay={120 * (i + 1)}>
                  <span
                    className="block bg-gradient-to-r from-hot via-[#c23a78] to-rose bg-clip-text px-2 pb-1 font-serif text-[40px] font-bold lowercase italic leading-[1.15] text-transparent [filter:drop-shadow(0_2px_0_#fff)]"
                    style={{ transform: `rotate(${i === 1 ? 1.5 : -1.5}deg)` }}
                  >
                    {name}
                  </span>
                </Reveal>
              ))}
            </div>

            {/* Birthday */}
            <p className="mt-3 font-hand text-[28px] font-bold leading-none text-hot [text-shadow:0_2px_0_#fff,0_6px_14px_rgba(224,85,139,.35)]">
              birthday
            </p>

            {/* تلميح الضغط */}
            <div className="mt-2 flex flex-col items-center gap-1">
              <img
                src="/images/star.png"
                alt="Tap to open"
                className="h-16 w-16 animate-bounce"
              />
              <span className="animate-pulse font-hand text-[13px] font-bold leading-none text-rose">
                tap to open
              </span>
            </div>
          </Reveal>
        </div>
      )}

      {/* ===== الدعوة الأصلية (تظهر بعد الضغط) ===== */}
      {opened && (
        <>
          {/* 1) التهنئة */}
      <Section sectionRef={section1Ref}>
  <Reveal className="relative flex w-full flex-col items-center">
    {/* Happy birthday */}
    <p
      className="text-center font-serif text-[48px] font-bold leading-none text-rose [text-shadow:0_2px_0_#fff,0_6px_14px_rgba(224,85,139,.35)]"
    >
      Happy birthday
    </p>

    {/* Names and message */}
    <p
      className="mt-8 max-w-[340px] text-center font-serif text-[22px] font-semibold leading-9 text-rose
        [paint-order:stroke_fill] [-webkit-text-stroke:6px_#f6efe6]
        [text-shadow:0_2px_12px_rgba(246,239,230,.95),0_0_24px_rgba(246,239,230,.9)]"
    >
      {a} {b} and {c} I hope you have the greatest year and the best birthday ever, Always Dream big and shine like a star!
    </p>

    {/* Cake sticker */}
    <img
      src="/images/cake.png"
      alt="Cake"
      className="mt-8 h-32 w-31"
    />

    {/* Stickers */}
    <img
      src="/images/silver-star.png"
      alt=""
      className="absolute top-[-50px] left-[-10px] h-14 w-15 rotate-[-15deg]"
    />
     <img
      src="/images/silver-star.png"
      alt=""
      className="absolute top-[-43px] left-[350px] h-14 w-15 rotate-[15deg]"
    />
  </Reveal>
</Section>

       {/* 2) العد التنازلي */}
<Section sectionRef={section2Ref}>
  <Reveal className="relative flex w-full flex-col items-center gap-4">
    {/* Eyebrow */}
    <p className="font-hand text-[22px] font-bold leading-none text-rose/70">
       the big night is near 
    </p>

    {/* Title */}
    <p className="font-serif text-[32px] font-bold leading-none text-rose">
      Counting down
    </p>

    {/* Subtitle */}
    <p className="font-hand text-[24px] font-bold leading-none text-rose/80">
      Get ready to sparkle
    </p>

    {/* العدّ التنازلي */}
    <div className="relative z-10 mt-5 w-full rounded-[28px] border-2 border-white bg-gradient-to-b from-white/60 to-pink/20 px-3 py-3 text-center shadow-[0_12px_40px_rgba(122,31,69,.18)]">
      <Countdown date={invite.dateISO} />
    </div>

    {/* Tagline under countdown */}
    <p className="mt-2 max-w-[300px] text-center font-hand text-[22px] font-bold leading-snug text-rose/80">
      every second brings us closer to the best night 
    </p>


    {/* Stickers */}
    <img
      src="/images/pink-star.png"
      alt=""
      className="absolute top-[-15px] left-[310px] h-14 w-15 rotate-[-130deg]"
    />
    <img
      src="/images/pink-star.png"
      alt=""
      className="absolute top-[-20px] left-[30px] h-14 w-15 rotate-[15deg]"
    />
  </Reveal>
</Section>

     {/* 3) التفاصيل */}
<Section sectionRef={section3Ref}>
  <h2 className="relative z-10 font-serif text-[38px] font-bold leading-none text-rose">
    Party Details
  </h2>

  <Reveal className="relative z-10 mt-5 w-full rounded-[28px] border-2 border-white bg-gradient-to-b from-white/60 to-pink/20 px-5 py-6 text-center shadow-[0_12px_40px_rgba(122,31,69,.18)]">
    <dl className="grid gap-4 text-ink">
      <div>
        <dt className="font-hand text-2xl font-bold text-pink">When</dt>
        <dd className="font-serif text-xl font-bold text-rose">
          {invite.weekday}, {invite.dateLabel}
        </dd>
        <dd className="text-base text-ink/80">{invite.timeLabel}</dd>
      </div>

      <div className="mx-auto h-px w-2/3 bg-pink/40" />

      <div>
        <dt className="font-hand text-2xl font-bold text-pink">Where</dt>
        <dd className="font-serif text-xl font-bold text-rose">{invite.venue}</dd>
        <dd className="text-base text-ink/80">{invite.address}</dd>
      </div>

      <div className="mx-auto h-px w-2/3 bg-pink/40" />

      <div>
        <dt className="font-hand text-2xl font-bold text-pink">Good to know</dt>
        {invite.notes.map((n) => (
          <dd key={n} className="text-base leading-snug text-ink/90">
            {n}
          </dd>
        ))}
      </div>
    </dl>

   <div className="mx-auto mt-7 grid w-full max-w-[280px] gap-3">
  <a
    href={invite.mapUrl}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-gradient-to-b from-pink to-rose px-6 py-2.5 font-hand text-[26px] font-bold leading-none text-white shadow-[0_6px_0_rgba(122,31,69,.35)] transition active:translate-y-[3px] active:shadow-[0_3px_0_rgba(122,31,69,.35)] rotate-[-1.5deg]"
  >
    <span>📍</span> Open map
  </a>

  <button
    onClick={downloadIcs}
    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-rose bg-white/90 px-6 py-2.5 font-hand text-[26px] font-bold leading-none text-rose shadow-[0_6px_0_rgba(122,31,69,.2)] transition active:translate-y-[3px] active:shadow-[0_3px_0_rgba(122,31,69,.2)] rotate-[1.5deg]"
  >
    <span></span> Add to calendar
  </button>
</div>
  </Reveal>

  {/* Stickers */}
  <img
    src="/images/kiss.png"
    alt=""
    className="pointer-events-none absolute top-10 left-4 h-14 w-14 rotate-[-12deg]"
  />
  <img
    src="/images/kiss.png"
    alt=""
    className="pointer-events-none absolute top-10 right-4 h-14 w-14 rotate-[12deg] -scale-x-100"
  />
</Section>

          {/* 4) الصورة فقط */}
<Section >
  <div className="relative w-full max-w-[300px]">
    <div className="aspect-[870/1020] w-full overflow-hidden">
      <img
        className="h-full w-full object-cover object-bottom mix-blend-multiply"
        src="/images/girls.png"
        alt={`Happy Birthday ${a}, ${b} & ${c}`}
      />
    </div>

    <Stickers />
  </div>
</Section>
        </>
      )}
    </main>
  );
}