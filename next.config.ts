import type { NextConfig } from "next";

// GitHub Pages serves project repos from /<repo>, but user/org pages
// (<user>.github.io) from the domain root. The deploy workflow computes
// the right value and passes it in; local dev gets "".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Pages has no image optimizer behind it.
  images: { unoptimized: true },
  // Emit /about/index.html rather than /about.html so static hosts resolve
  // extensionless URLs without redirect rules.
  trailingSlash: true,
};

export default nextConfig;
