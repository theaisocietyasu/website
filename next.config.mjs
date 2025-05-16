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
  // Use Next.js built-in compiler options
  compiler: {
    // This will disable the JSX namespace error
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  // Add a simple JSX transform configuration
  reactStrictMode: true,
};

export default nextConfig;
