import type { Metadata } from "next";
import { cormorant, dmSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "TowerBright",
  description: "Premium cleaning service in Miami/Brickell",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
