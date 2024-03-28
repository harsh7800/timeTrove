/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            outputPath: "static/media",
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    // For server-side rendering of videos, we need to ignore the fs module

    return config;
  },
};

export default nextConfig;
