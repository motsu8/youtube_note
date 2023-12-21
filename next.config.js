/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['i.ytimg.com', 'yt3.ggpht.com'],
  },
};
module.exports = nextConfig;
