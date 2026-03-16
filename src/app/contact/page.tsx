import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Book a premium cleaning service for your luxury condominium in Miami or Brickell. Contact TowerBright — call, WhatsApp, or fill in the form for a free walkthrough.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Book a Service | TowerBright",
    description:
      "Book a premium cleaning for your luxury condo in Miami. Call, WhatsApp, or fill in the form.",
    url: "/contact",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Book TowerBright luxury cleaning service Miami",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://towerbrightco.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Book a Service",
      item: "https://towerbrightco.com/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ContactContent />
    </>
  );
}
