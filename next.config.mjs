/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true, // Required for static exports
  },
  // output: 'export', // Enables static export
  async redirects() {
    return [
      {
        // Serve one canonical host so Google doesn't see duplicate sites
        source: "/:path*",
        has: [{ type: "host", value: "www.pirhotech.com" }],
        destination: "https://pirhotech.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
