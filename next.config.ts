import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
