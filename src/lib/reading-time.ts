import readingTime from "reading-time";

export function calculateReadingTime(content: string): number {
  const result = readingTime(content);
  return Math.max(1, Math.ceil(result.minutes));
}
