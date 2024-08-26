// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['coin-images.coingecko.com'],
},

  async rewrites() {
    return [
      {
        source: '/api/coins/markets',
        destination: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
      },
    ];
  },
};

export default nextConfig;
