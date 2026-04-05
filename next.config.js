/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.buyee.jp' },
      { protocol: 'https', hostname: '**.zenmarket.jp' },
      { protocol: 'https', hostname: '**.fromjapan.co.jp' },
      { protocol: 'https', hostname: '**.dejapan.com' },
      { protocol: 'https', hostname: '**.jauce.com' },
      { protocol: 'https', hostname: '**.remambo.jp' },
      { protocol: 'https', hostname: '**.yahoo.co.jp' },
      { protocol: 'https', hostname: '**.mercari.com' },
      { protocol: 'https', hostname: 'auctions.c.yimg.jp' },
      { protocol: 'https', hostname: 'static.mercdn.net' },
    ],
  },
};

module.exports = nextConfig;
