const STARS = [
  [6, 4, 26, "pink", 0], [88, 7, 34, "silver", 1.2], [14, 22, 18, "silver", 0.6], [92, 28, 22, "pink", 2],
  [4, 46, 30, "pink", 1.6], [90, 52, 18, "silver", 0.3], [10, 70, 24, "silver", 2.2], [86, 76, 30, "pink", 0.9],
  [20, 92, 20, "pink", 1.4], [74, 94, 26, "silver", 0.1],
] as const;

export default function Sparkles({ flip = false }: { flip?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {STARS.map(([x, y, s, c, d], i) => (
        <i
          key={i}
          className={`star-shape absolute animate-twinkle ${c === "pink" ? "star-pink" : "star-silver"}`}
          style={{ left: `${flip ? 100 - x : x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
        />
      ))}
    </div>
  );
}
