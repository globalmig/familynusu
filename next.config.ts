import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers has no sharp/image-optimization runtime, so
    // next/image's built-in `/_next/image` optimizer 404s there.
    unoptimized: true,
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
