/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript strict mode for better code quality
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
  // Image optimization
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
  // Performance optimizations
  compress: true,
  // Security headers
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
