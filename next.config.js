/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["fuul-assets-production.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
