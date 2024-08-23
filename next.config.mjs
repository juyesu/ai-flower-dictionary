/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['221.158.142.142'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
