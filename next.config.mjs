/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "solana.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
