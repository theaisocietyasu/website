/** @type {import('next').NextConfig} */
const nextConfig = {
  // The 2024–25 site lives on under /legacy. Temporary (307) so these paths can be reclaimed later.
  async redirects() {
    return ["projects", "software-corner", "ml_lab", "nlp_lab", "ai_makerspace"].map((path) => ({
      source: `/${path}`,
      destination: `/legacy/${path}`,
      permanent: false,
    }))
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['ais-asu.com', 'www.ais-asu.com', 'github.com', 'drive.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
