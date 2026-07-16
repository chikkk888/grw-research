type Testimonial = {
  quote: string;
  attribution: string;
  role: string;
};

const placeholders: Testimonial[] = [
  {
    quote:
      "Clearer than most peptide blogs — it reads like a research briefing, not a sales page.",
    attribution: "Reader feedback placeholder",
    role: "Independent researcher",
  },
  {
    quote:
      "Appreciate the explicit uncertainty and the way affiliate context comes after the science.",
    attribution: "Reader feedback placeholder",
    role: "Graduate student",
  },
  {
    quote:
      "The structure helped me evaluate claims without feeling pressured toward a purchase.",
    attribution: "Reader feedback placeholder",
    role: "Lab technician",
  },
];

/** Placeholder testimonials for layout/CRO testing — replace with verified quotes only. */
export function TestimonialsPlaceholder() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          What readers are saying
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Placeholder quotes for layout only. Do not publish fabricated
          testimonials — replace with verified reader feedback before launch.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {placeholders.map((item) => (
            <figure
              key={item.quote}
              className="rounded-2xl border border-border bg-paper/60 p-6 shadow-brand-sm"
            >
              <blockquote className="text-sm leading-relaxed text-ink-soft">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-medium text-ink">{item.attribution}</p>
                <p className="text-xs text-muted">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
