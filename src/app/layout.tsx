import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { getAnalyticsIds } from "@/lib/env";
import { SiteShell } from "@/components/layout/SiteShell";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const analytics = getAnalyticsIds();

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.brandName,
    description: siteConfig.description,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  verification: analytics.gscVerification
    ? { google: analytics.gscVerification }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('grw-theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <SiteShell>{children}</SiteShell>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
