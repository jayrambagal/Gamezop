/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.gamezop.com",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
