/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true, // Required for static exports
  },
  // output: 'export', // Enables static export
};

export default nextConfig;
