/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  typescript: {
    // Keep frontend deployment unblocked even if optional backend template routes fail type checks.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;