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
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl tracking-[0.2em] text-text sm:text-2xl">
            Ra<span className="text-rarity-god">TF</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 border-l border-ink-line/70 pl-3 sm:gap-6 sm:pl-4">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-200 sm:text-sm ${
                  active
                    ? "text-rarity-legendary"
                    : "text-text-dim hover:text-text"
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
