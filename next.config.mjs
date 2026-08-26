const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.1.7", "192.168.1.111"],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jmogqtwyfgmwiflbizjz.supabase.co",
        pathname: "/storage/v1/object/public/media/**",
      },
    ],
  },
};

export default nextConfig;
