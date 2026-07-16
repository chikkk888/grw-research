import { HubPage, hubMetadata } from "@/components/hubs/HubPage";

export const metadata = hubMetadata("healthy-aging");

export default function Page() {
  return <HubPage slug="healthy-aging" />;
}
