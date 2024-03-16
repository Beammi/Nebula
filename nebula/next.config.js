/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nebulaimagestorage.blob.core.windows.net'],
  },
}

module.exports = nextConfig;
