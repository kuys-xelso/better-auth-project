import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Any request to /api/auth/* goes to NestJS
        source: "/api/auth/:path*",
        destination: "http://localhost:3001/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
