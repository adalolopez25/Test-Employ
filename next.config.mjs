/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'rick-morty.s3.us-east-2.amazonaws.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
};

export default nextConfig;