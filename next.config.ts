import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained bundle in .next/standalone; this is what gets deployed.
  output: "standalone",
};

export default nextConfig;
