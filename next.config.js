const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-icons'],
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  experimental: {
    serverActions: {},
  },
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-icons$': 'react-icons/lib/esm',
      };
    }
    return config;
  },
};

module.exports = withPWA(nextConfig);
