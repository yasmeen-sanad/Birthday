import type { Metadata, Viewport } from "next";
import { Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { invite } from "@/lib/invitation";

const hand = Caveat({ subsets: ["latin"], weight: ["700"], variable: "--font-hand" });
const serif = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: `${invite.title} ✨`,
  description: `You're invited! ${invite.dateLabel} · ${invite.timeLabel}`,
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7c6d6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${hand.variable} ${serif.variable} min-h-full bg-white font-serif text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
