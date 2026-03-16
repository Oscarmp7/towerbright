import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Portfolio } from "@/components/sections/Portfolio";
import { Properties } from "@/components/sections/Properties";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingCTA } from "@/components/sections/BookingCTA";

const cleaningServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CleaningService"],
  "@id": "https://towerbrightco.com/#business",
  name: "TowerBright",
  description:
    "Premium white-glove cleaning services for luxury condominiums in Miami and Brickell. Specializing in indoor window cleaning, balcony polish, marble rejuvenation, and bathroom polish.",
  url: "https://towerbrightco.com",
  telephone: "+12393519514",
  email: "info@towerbrightco.com",
  priceRange: "$$$",
  image: [
    "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519818703-IMG_1935.jpeg",
    "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819951-IMG_2149.jpeg",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.7617,
    longitude: -80.1918,
  },
  areaServed: [
    { "@type": "City", name: "Miami" },
    { "@type": "Neighborhood", name: "Brickell" },
    { "@type": "Neighborhood", name: "Downtown Miami" },
    { "@type": "Neighborhood", name: "Edgewater" },
    { "@type": "Neighborhood", name: "Coconut Grove" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: ["https://www.instagram.com/towerbrightco"],
  serviceType: "Residential Cleaning",
  knowsAbout: [
    "Luxury condo cleaning",
    "High-rise apartment cleaning",
    "Marble surface rejuvenation",
    "Interior window cleaning",
    "Balcony detailing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Indoor Window Cleaning",
          description:
            "Crystal clarity for every pane. Floor-to-ceiling window cleaning with zero streaks.",
          url: "https://towerbrightco.com/services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Balcony Polish",
          description:
            "Full deep-clean, polish, and detail for outdoor living spaces.",
          url: "https://towerbrightco.com/services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marble Rejuvenation",
          description:
            "Professional honing, polishing, and sealing to restore marble brilliance.",
          url: "https://towerbrightco.com/services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bathroom Polish",
          description:
            "Spa-level cleanliness — every surface, fixture, and detail polished to luxury standard.",
          url: "https://towerbrightco.com/services",
        },
      },
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://towerbrightco.com/#organization",
  name: "TowerBright",
  url: "https://towerbrightco.com",
  logo: "https://towerbrightco.com/opengraph-image",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+12393519514",
    contactType: "customer service",
    availableLanguage: ["English", "Spanish"],
    areaServed: "US",
  },
  sameAs: ["https://www.instagram.com/towerbrightco"],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://towerbrightco.com/#website",
  name: "TowerBright",
  url: "https://towerbrightco.com",
  description:
    "Premium white-glove cleaning services for luxury condominiums in Miami and Brickell.",
  publisher: {
    "@id": "https://towerbrightco.com/#organization",
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleaningServiceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Portfolio />
      <Properties />
      <Testimonials />
      <BookingCTA />
    </main>
  );
}
