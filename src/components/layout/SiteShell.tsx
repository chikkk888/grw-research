import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <Footer />
      <ConsentBanner />
    </ThemeProvider>
  );
}
