import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ConsentBanner />
    </ThemeProvider>
  );
}
