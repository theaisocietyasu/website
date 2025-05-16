/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['ais-asu.com', 'github.com', 'drive.google.com', 'placeholder.svg'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // This ensures the public folder is included in the build
  distDir: '.next',
  output: 'standalone',
};

export default nextConfig;
