import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { pink: "#f2a6c0", hot: "#e0558b", rose: "#7a1f45", silver: "#c9ccd3", ink: "#2a1a22" },
      fontFamily: { hand: ["var(--font-hand)", "cursive"], serif: ["var(--font-serif)", "serif"] },
      keyframes: {
        twinkle: { "0%,100%": { transform: "scale(1) rotate(0)", opacity: ".95" }, "50%": { transform: "scale(1.18) rotate(12deg)", opacity: ".6" } },
        shine: { from: { backgroundPosition: "150% 0" }, to: { backgroundPosition: "-100% 0" } },
        swing: { "0%,100%": { transform: "rotate(-7deg)" }, "50%": { transform: "rotate(7deg)" } },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        shine: "shine 2.6s linear infinite",
        swing: "swing 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
