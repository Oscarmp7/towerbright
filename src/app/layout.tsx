import type { Metadata, Viewport } from "next";
import { cormorant, dmSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://towerbrightco.com"),
  title: {
    default: "TowerBright — Premium Condo Cleaning Miami",
    template: "%s | TowerBright",
  },
  description:
    "White-glove cleaning services for luxury condominiums in Miami and Brickell. Indoor window cleaning, balcony polish, marble rejuvenation, bathroom polish. Trusted by Aston Martin Residences.",
  keywords: [
    "luxury condo cleaning Miami",
    "condo cleaning Brickell",
    "marble rejuvenation Miami",
    "window cleaning luxury condos",
    "high-rise cleaning Miami",
    "Aston Martin Residences cleaning",
    "premium apartment cleaning Miami",
    "Brickell Heights cleaning service",
  ],
  authors: [{ name: "TowerBright", url: "/" }],
  creator: "TowerBright",
  publisher: "TowerBright",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TowerBright — Premium Condo Cleaning Miami",
    description:
      "White-glove cleaning for luxury condominiums in Brickell & Miami. Trusted by Aston Martin Residences.",
    url: "/",
    siteName: "TowerBright",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TowerBright — Premium luxury condo cleaning in Miami Brickell",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TowerBright — Premium Condo Cleaning Miami",
    description:
      "White-glove cleaning for luxury condominiums in Brickell & Miami.",
    creator: "@towerbrightco",
    site: "@towerbrightco",
    images: ["/opengraph-image"],
  },
  ...(process.env.NEXT_PUBLIC_GSC_TOKEN && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_TOKEN },
  }),
  category: "home services",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
