import type { PersonProfile } from "@/config/authors";

export function AuthorBox({ person }: { person: PersonProfile }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-muted">Author</p>
      <p className="mt-1 font-medium text-ink">{person.name}</p>
      <p className="text-sm text-muted">{person.role}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{person.bio}</p>
      {person.isPlaceholder ? (
        <p className="mt-2 text-xs text-warning-ink">
          Placeholder profile — {person.credentialsNote}
        </p>
      ) : null}
    </div>
  );
}

export function ReviewerBox({ person }: { person: PersonProfile }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-muted">Reviewer</p>
      <p className="mt-1 font-medium text-ink">{person.name}</p>
      <p className="text-sm text-muted">{person.role}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{person.bio}</p>
      {person.isPlaceholder ? (
        <p className="mt-2 text-xs text-warning-ink">
          Placeholder profile — {person.credentialsNote}
        </p>
      ) : null}
    </div>
  );
}
