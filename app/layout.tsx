import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import DiscordButton from "@/components/DiscordButton";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roll Anime to Fight — Unofficial Guide",
  description:
    "Tier lists, unit cards, traits, mutations, and upgrade guides for the Roblox game Roll Anime to Fight.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen font-body">
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">{children}</main>
        <footer className="border-t border-ink-line/70 py-8 text-center font-body text-xs text-text-faint">
          Fan-made — not affiliated with Roll Anime to Fight or Roblox.
        </footer>
        <DiscordButton />
      </body>
    </html>
  );
}
