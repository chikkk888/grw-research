import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-muted">
        404
      </p>
      <h1 className="mt-3 font-semibold tracking-tight text-4xl text-ink">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        The page may have moved, or the link may be outdated. Try a topic hub to
        continue learning.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/research" variant="secondary">
          Research hub
        </ButtonLink>
      </div>
    </Container>
  );
}
