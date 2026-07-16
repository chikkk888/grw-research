export type PersonProfile = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Placeholder profiles must stay clearly marked until verified. */
  isPlaceholder: true;
  credentialsNote: string;
  url?: string;
};

export const authors: Record<string, PersonProfile> = {
  "editorial-team": {
    id: "editorial-team",
    name: "GRW Editorial Team",
    role: "Editorial contributors",
    bio: "Placeholder author profile for draft content. Final bylines will list named writers with verified backgrounds.",
    isPlaceholder: true,
    credentialsNote:
      "Credentials pending — do not treat this profile as verified expertise.",
  },
};

export const reviewers: Record<string, PersonProfile> = {
  "scientific-review-pending": {
    id: "scientific-review-pending",
    name: "Scientific Reviewer (Placeholder)",
    role: "Scientific review",
    bio: "Placeholder reviewer profile. Draft articles are not yet scientifically reviewed.",
    isPlaceholder: true,
    credentialsNote:
      "No credentials invented. Assign a real reviewer before publication.",
  },
};

export function getAuthor(id: string): PersonProfile {
  return authors[id] ?? authors["editorial-team"];
}

export function getReviewer(id: string): PersonProfile {
  return reviewers[id] ?? reviewers["scientific-review-pending"];
}
