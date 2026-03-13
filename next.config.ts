import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Proxy all /api/* requests to the external API server.
    // This lets the frontend keep calling fetch('/api/...') while bypassing
    // the in-repo Next route handlers under app/api/*.
    const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5062";
    const base = rawBase.replace(/\/+$/, "");

    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${base}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
