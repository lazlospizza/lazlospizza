/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'https://api-dev.lazlospizza.com',
    NEXT_PUBLIC_DOMAIN_URL: 'https://dev.lazlospizza.com',
    NEXT_PUBLIC_ETH_NETWORK: 'rinkeby',
    NEXT_PUBLIC_INFURA_ID: '4f9f4ddc2f4942c1937e5c58365ae83b',
  },
};

module.exports = nextConfig;
