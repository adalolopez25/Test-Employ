/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains : ['rick-morty.s3.us-east-2.amazonaws.com'],
    // Correcto: 'unoptimized' va aquí afuera
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
    formats : ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  
};

export default nextConfig;