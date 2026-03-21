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
  // IMPORTANTE: El basePath solo debe ser el nombre del repositorio
  // Si tu URL es adalolopez25.github.io/Test-Employ/, el basePath es solo '/Test-Employ'
};

export default nextConfig;