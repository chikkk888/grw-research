type Props = {
  name: string;
  role: string;
  bio: string;
};

export function AuthorCard({ name, role, bio }: Props) {
  return (
    <aside className="rounded-2xl border border-border bg-surface p-5 shadow-brand-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        Author
      </p>
      <div className="mt-4 flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent"
          aria-hidden="true"
        >
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="font-semibold text-ink">{name}</p>
          <p className="mt-0.5 text-sm text-muted">{role}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{bio}</p>
        </div>
      </div>
    </aside>
  );
}
