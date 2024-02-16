/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["c.housingcdn.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
