import type { ArticleFaq } from "@/types/content";

export function ArticleFaqs({ faqs }: { faqs: ArticleFaq[] }) {
  if (!faqs?.length) return null;

  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-semibold tracking-tight text-2xl text-ink">Frequently asked questions</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-lg border border-border bg-surface px-4 py-3"
          >
            <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
              <span className="flex items-start justify-between gap-3">
                {faq.question}
                <span className="text-muted transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
