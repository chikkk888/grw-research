export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items?.length) return null;

  return (
    <aside className="rounded-lg border border-border bg-accent-soft/50 p-5">
      <h2 className="font-semibold tracking-tight text-xl text-ink">Key takeaways</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
