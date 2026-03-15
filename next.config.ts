import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wol7zpzfeh2wdhnp.public.blob.vercel-storage.com",
        pathname: "/briefs/**",
      },
    ],
  },
};

export default nextConfig;
