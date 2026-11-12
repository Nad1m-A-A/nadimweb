import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained bundle in .next/standalone; this is what gets deployed.
  output: "standalone",
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
