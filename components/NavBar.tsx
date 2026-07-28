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
    <header className="sticky top-0 z-40 border-b border-ink-line/80 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide text-text sm:text-3xl">
            ROLL ANIME <span className="text-rarity-god">TO FIGHT</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-ink-line bg-ink-surface/70 p-1 sm:gap-1.5">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide transition-colors sm:px-4 sm:text-sm ${
                  active
                    ? "bg-rarity-legendary text-ink"
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
