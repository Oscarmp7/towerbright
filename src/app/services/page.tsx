import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Premium cleaning services for luxury condos in Miami: indoor window cleaning, balcony polish, bathroom polish, and marble rejuvenation. Book a free walkthrough today.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Cleaning Services | TowerBright",
    description:
      "Premium cleaning services for luxury condos in Miami — window cleaning, balcony polish, marble rejuvenation, bathroom polish.",
    url: "/services",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TowerBright luxury cleaning services Miami",
      },
    ],
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Luxury Condo Cleaning Services — TowerBright",
  description:
    "White-glove residential cleaning for luxury condominiums in Miami and Brickell. Services include indoor window cleaning, balcony polish, bathroom polish, and marble rejuvenation.",
  provider: {
    "@id": "https://towerbrightco.com/#business",
  },
  areaServed: [
    { "@type": "City", name: "Miami" },
    { "@type": "Neighborhood", name: "Brickell" },
  ],
  offers: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Indoor Window Cleaning",
        description:
          "Crystal clarity for every pane. Floor-to-ceiling window cleaning with zero streaks or residue.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Balcony Polish",
        description:
          "Full deep-clean, polish, and detail for outdoor living spaces.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Bathroom Polish",
        description:
          "Spa-level cleanliness — every surface, fixture, and detail polished to luxury standard.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Marble Rejuvenation",
        description:
          "Professional honing, polishing, and sealing to restore marble brilliance.",
      },
    },
  ],
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
      name: "Services",
      item: "https://towerbrightco.com/services",
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesContent />
    </>
  );
}
