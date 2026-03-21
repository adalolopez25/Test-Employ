/** @type {import('next').NextConfig} */
const nextConfig = {
  output : 'export',
  images: {
    remotePatterns: [
      {
        unoptimized :true,
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  basePath : '/adalolopez25.github.io/Rick-And-Morty-APP/'
};

export default nextConfig;