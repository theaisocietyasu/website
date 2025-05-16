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
  // Add SWC compiler options to fix JSX namespace error
  compiler: {
    styledComponents: true,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    swcMinify: true,
  },
  experimental: {
    swcPlugins: [
      ['next-superjson-plugin', {}],
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      use: [
        {
          loader: 'swc-loader',
          options: {
            jsc: {
              transform: {
                react: {
                  throwIfNamespace: false
                }
              }
            }
          }
        }
      ]
    });
    return config;
  }
};

export default nextConfig;
