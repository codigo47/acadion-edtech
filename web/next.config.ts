import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'placehold.co' },
      { hostname: 'localhost' },
    ],
  },
};

export default nextConfig;
