import type { NextConfig } from "next";

const backendBaseUrl =
  process.env.BACKEND_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://backend:8080");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendBaseUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
