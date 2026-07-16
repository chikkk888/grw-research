import { HubPage, hubMetadata } from "@/components/hubs/HubPage";

export const metadata = hubMetadata("reviews");

export default function Page() {
  return <HubPage slug="reviews" />;
}
