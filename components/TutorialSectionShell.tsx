import Link from "next/link";
import type { ReactNode } from "react";

type TutorialSectionShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  backHref?: string;
};

export function TutorialSectionShell({
  title,
  description,
  children,
  backHref = "/tutorial",
}: TutorialSectionShellProps) {
  return (
    <div className="flex flex-col gap-8 transition-all duration-300 ease-out">
      <div className="flex flex-col gap-3">
        <Link
          href={backHref}
          className="guide-button-secondary w-fit text-sm"
        >
          ← Back to guide overview
        </Link>
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-3xl font-body text-sm text-text-dim">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
