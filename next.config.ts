import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  images: {
    unoptimized: true,
  },

  productionBrowserSourceMaps: false,

  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/core-linux-x64-musl",
      "node_modules/@esbuild/**",
      "node_modules/webpack/**",
      "node_modules/typescript/**",
      "node_modules/.cache/**",
      "node_modules/@img/sharp-libvips*/**",
      "**/*.map",
    ],
  },

  experimental: {
    webpackMemoryOptimizations: true,
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@base-ui/react",
      "@radix-ui/react-slot",
      "@tiptap/react",
      "@tiptap/core",
      "@tiptap/starter-kit",
      "@wooorm/starry-night",
      "katex",
      "axios",
    ],
  },
};

export default nextConfig;
