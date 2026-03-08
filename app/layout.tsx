import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import AnnouncementBar from "@/components/homepage/announcement-bar";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/homepage/theme-provider";
import type { Metadata, Viewport } from "next";

const siteName = "Salon Betsaleel";
const siteDescription =
  "Premiere edition 2026 du salon entrepreneurial Talents & Talents organise par les jeunes de l'eglise PPUNILU.";
const deploymentHost = process.env.DEPLOYMENT_URL?.replace(/^https?:\/\//, "");
const siteUrl = deploymentHost ? `https://${deploymentHost}` : "https://salon-betsaleel.vercel.app";
const ogImage = "/homepage/excursion%202026_719.jpg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Salon Betsaleel - Talents & Talents 2026",
      },
    ],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnnouncementBar />
          <Suspense
            fallback={
              <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16" />
              </div>
            }
          >
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
