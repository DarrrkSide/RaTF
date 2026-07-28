"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/cards", label: "Cards" },
  { href: "/tierlist", label: "Tier List" },
  { href: "/tutorial", label: "Guide" },
  { href: "/credits", label: "Credits" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 rounded-full border border-ink-line/70 bg-ink-surface/70 px-3 py-2 shadow-sm">
          <span className="font-display text-xl tracking-[0.2em] text-text sm:text-2xl">
            ROLL ANIME <span className="text-rarity-god">TO FIGHT</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1.5 rounded-full border border-ink-line/70 bg-ink-surface/70 p-1.5 shadow-sm">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 sm:px-4 sm:text-sm ${
                  active
                    ? "bg-rarity-legendary text-ink shadow-sm"
                    : "text-text-dim hover:bg-ink-surface2 hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
