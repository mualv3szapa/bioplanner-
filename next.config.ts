import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const repoName = "bioplanner-";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
