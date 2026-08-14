const nextConfig = {
  allowedDevOrigins: ["192.168.1.7", "192.168.1.111"],
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
