import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See our work: before-and-after results from luxury condo cleaning across Miami and Brickell. Marble, windows, balconies, and more.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | TowerBright",
    description:
      "Before-and-after results from luxury condo cleaning in Miami and Brickell.",
    url: "/gallery",
    images: [
      {
        url: "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519818703-IMG_1935.jpeg",
        width: 1200,
        height: 800,
        alt: "Luxury condo window cleaning result by TowerBright Miami",
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
      name: "Gallery",
      item: "https://towerbrightco.com/gallery",
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GalleryContent />
    </>
  );
}
