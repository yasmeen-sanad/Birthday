// components/Stickers.tsx
type Sticker = {
  src: string;
  top: string;   // من أعلى الصورة
  left: string;  // من يسار الصورة
  w: number;     // العرض كنسبة % من عرض الصورة
  rot: number;   // الميلان بالدرجات
  z?: number;
  delay?: number;
};

const STICKERS: Sticker[] = [
  // الأعلى
  { src: "disco.png",       top: "-24%",  left: "3%", w: 27, rot: -10, z: 0, delay: 0 },
  { src: "silver-star.png", top: "-11%",   left: "90%", w: 17, rot: 14,  z: 2, delay: 0.6 },
  { src: "pink-star.png",   top: "-30%",  left: "55%", w: 11, rot: -18, z: 2, delay: 1.2 },

  // الجوانب
  { src: "kiss.png",        top: "10%",  left: "-10%", w: 15, rot: -14, z: 3, delay: 0.3 },
  { src: "camera.png",      top: "-20%",  left: "60%", w: 27, rot: 9,   z: 3, delay: 0.9 },
  { src: "silver-star.png", top: "5%",  left: "100%", w: 10, rot: -20, z: 2, delay: 1.5 },
  { src: "pink-star.png",   top: "20%",  left: "-20%",  w: 13, rot: 22,  z: 2, delay: 0.4 },

  // الأسفل
  { src: "cake.png",        top: "104%",  left: "76%", w: 29, rot: 6,   z: 3, delay: 0.2 },
  { src: "L.png",           top: "100%",  left: "0%",  w: 12, rot: -9,  z: 3, delay: 0.7 },
  { src: "Y.png",           top: "111%",  left: "14%", w: 12, rot: 7,   z: 3, delay: 1.1 },
  { src: "S.png",           top: "120%",  left: "30%", w: 10, rot: -5,  z: 3, delay: 1.4 },
  { src: "pink-star.png",   top: "111%",  left: "-5%", w: 9,  rot: 16,  z: 2, delay: 0.8 },
   { src: "pink-star.png",   top: "131%",  left: "25%", w: 9,  rot: 16,  z: 2, delay: 0.8 },
    { src: "pink-star.png",   top: "120%",  left: "10%", w: 9,  rot: 16,  z: 2, delay: 0.8 },
];

export function Stickers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {STICKERS.map((s, i) => (
        <img
          key={i}
         src={`/images/${s.src}`}
          alt=""
          draggable={false}
          className="sticker absolute h-auto select-none drop-shadow-[0_6px_10px_rgba(90,30,60,.25)]"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.w}%`,
            zIndex: s.z ?? 1,
            // @ts-expect-error CSS variables
            "--r": `${s.rot}deg`,
            animationDelay: `${s.delay ?? 0}s`,
          }}
        />
      ))}
    </div>
  );
}