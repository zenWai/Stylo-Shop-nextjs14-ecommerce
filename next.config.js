/** @type {import('next').NextConfig} */
const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

module.exports = (phase) => {
  // Determine if the current phase is one of the production phases
  const isProduction =
    phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER;

  // Conditionally set up the bundle analyzer based on the environment
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });

  const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    logging: isProduction
      ? { fetches: { fullUrl: false } }
      : { fetches: { fullUrl: true } },
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.shopify.com',
          pathname: '/s/files/**',
        },
      ],
    },
    compiler: {
      removeConsole: isProduction ? { exclude: ['error'] } : false,
    },
    async redirects() {
      return [
        {
          source: '/password',
          destination: '/',
          permanent: true,
        },
      ];
    },
  };

  return withBundleAnalyzer(nextConfig);
};
