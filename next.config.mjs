/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Correcto: 'unoptimized' va aquí afuera
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  
};

export default nextConfig;