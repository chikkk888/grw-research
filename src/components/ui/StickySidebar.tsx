"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

type Props = {
  items: TocItem[];
};

export function StickySidebar({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.5, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-border bg-surface p-5 shadow-brand-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        On this page
      </p>
      <ul className="mt-4 space-y-1.5">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-ink-soft hover:bg-paper hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
