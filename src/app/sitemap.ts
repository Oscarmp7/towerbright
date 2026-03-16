import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://towerbrightco.com",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519818703-IMG_1935.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819951-IMG_2149.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819324-IMG_1943.jpeg",
      ],
    },
    {
      url: "https://towerbrightco.com/services",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819951-IMG_2149.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819324-IMG_1943.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819770-IMG_2162.jpeg",
      ],
    },
    {
      url: "https://towerbrightco.com/gallery",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519818703-IMG_1935.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819951-IMG_2149.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819324-IMG_1943.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519819770-IMG_2162.jpeg",
        "https://wol7zpzfeh2wdhnp.public.blob.vercel-storage.com/briefs/1773519820328-IMG_2170.jpeg",
      ],
    },
    {
      url: "https://towerbrightco.com/contact",
      lastModified: new Date("2026-03-16"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
