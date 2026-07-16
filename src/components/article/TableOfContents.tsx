export type TocItem = { id: string; text: string; level: number };

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-lg border border-border bg-surface p-4"
    >
      <p className="text-sm font-semibold text-ink">In this guide</p>
      <ol className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level > 2 ? "pl-3" : undefined}>
            <a
              href={`#${item.id}`}
              className="text-sm text-ink-soft transition-colors hover:text-accent"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    const id = slugifyHeading(text);
    items.push({ id, text, level });
  }

  return items;
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
