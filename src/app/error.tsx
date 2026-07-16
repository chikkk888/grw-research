"use client";

import { Container } from "@/components/ui/Container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-semibold tracking-tight text-4xl text-ink">Something went wrong</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white"
      >
        Try again
      </button>
    </Container>
  );
}
