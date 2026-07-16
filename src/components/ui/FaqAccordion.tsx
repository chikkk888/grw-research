type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  title?: string;
  id?: string;
};

export function FaqAccordion({
  items,
  title = "Frequently asked questions",
  id = "faq",
}: Props) {
  if (!items.length) return null;

  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-3xl font-semibold tracking-tight text-ink">{title}</h2>
      <div className="mt-6 space-y-3">
        {items.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-border bg-surface px-5 py-4 shadow-brand-sm open:shadow-brand-md"
          >
            <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
              <span className="flex items-start justify-between gap-4">
                <span>{faq.question}</span>
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted transition group-open:rotate-45 group-open:border-accent group-open:text-accent"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
