import type { Metadata } from "next";
import { cormorant, dmSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Nav } from "@/components/layout/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "TowerBright — Excellence is the Standard",
  description:
    "Premium residential cleaning services for luxury condominiums in Miami and Brickell. Indoor window cleaning, balcony polish, marble rejuvenation.",
  keywords:
    "luxury cleaning Miami, condo cleaning Brickell, marble rejuvenation Miami, window cleaning luxury",
  openGraph: {
    title: "TowerBright — Excellence is the Standard",
    description:
      "Premium residential cleaning for luxury condominiums in Miami.",
    url: "https://towerbrightco.com",
    siteName: "TowerBright",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
