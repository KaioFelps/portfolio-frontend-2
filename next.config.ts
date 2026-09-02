import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  images: {
    unoptimized: true,
  },

  cacheComponents: true,

  productionBrowserSourceMaps: false,

  experimental: {
    webpackMemoryOptimizations: true,
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@base-ui/react",
      "@radix-ui/react-slot",
      "@tiptap/react",
      "@tiptap/core",
      "@tiptap/starter-kit",
      "katex",
      "axios",
    ],
  },
};

export default nextConfig;
