import { HubPage, hubMetadata } from "@/components/hubs/HubPage";

export const metadata = hubMetadata("skin");

export default function Page() {
  return <HubPage slug="skin" />;
}
