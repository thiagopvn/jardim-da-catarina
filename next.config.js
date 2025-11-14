/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/webp'], // Usa WebP para melhor compressão
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Tamanhos otimizados
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tamanhos de ícones
    minimumCacheTTL: 60, // Cache de 60 segundos
  },
  compress: true, // Habilita compressão gzip (SWC é padrão no Next.js 16)
}

module.exports = nextConfig