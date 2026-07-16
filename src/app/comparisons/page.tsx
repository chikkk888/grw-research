import { HubPage, hubMetadata } from "@/components/hubs/HubPage";

export const metadata = hubMetadata("comparisons");

export default function Page() {
  return <HubPage slug="comparisons" />;
}
