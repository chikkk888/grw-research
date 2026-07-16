import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact GRW Research for corrections, editorial questions, and partnership inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
