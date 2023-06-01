/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.coingecko.com',
          port: '',
          pathname: '/coins/images/**',
        },
      {
          protocol: 'https',
          hostname: 'assets.coingecko.com',
          port: '',
          pathname: '/markets/images/**',
        },
      ],
    },
};



module.exports = nextConfig
