import { HubPage, hubMetadata } from "@/components/hubs/HubPage";

export const metadata = hubMetadata("hair");

export default function Page() {
  return <HubPage slug="hair" />;
}
