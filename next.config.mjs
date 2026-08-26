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
  async redirects() {
    return [
      { source: "/kurumsal/hakkimizda", destination: "/hakkimizda/dernek-hakkinda", permanent: true },
      { source: "/hakkimizda", destination: "/hakkimizda/dernek-hakkinda", permanent: true },
      { source: "/kurumsal/vizyon-misyon", destination: "/hakkimizda/vizyon-ve-misyon", permanent: true },
      { source: "/kurumsal/baskanin-mesaji", destination: "/hakkimizda/baskanin-mesaji", permanent: true },
      { source: "/kurumsal/yonetim-ve-denetim-kurullari", destination: "/hakkimizda/yonetim-ve-denetim-kurulu", permanent: true },
      { source: "/kurumsal/yonetim-kurulu", destination: "/hakkimizda/yonetim-ve-denetim-kurulu", permanent: true },
      { source: "/kurumsal/denetim-kurulu", destination: "/hakkimizda/yonetim-ve-denetim-kurulu", permanent: true },
      { source: "/kurumsal/tuzuk", destination: "/hakkimizda/dernek-tuzugu", permanent: true },
      { source: "/duyurular", destination: "/duyurular-ve-etkinlikler/duyurular", permanent: true },
      { source: "/duyurular/:slug", destination: "/duyurular-ve-etkinlikler/duyurular/:slug", permanent: true },
      { source: "/haberler", destination: "/duyurular-ve-etkinlikler/duyurular", permanent: true },
      { source: "/haberler/:slug", destination: "/duyurular-ve-etkinlikler/duyurular/:slug", permanent: true },
      { source: "/etkinlikler", destination: "/duyurular-ve-etkinlikler/etkinlikler", permanent: true },
      { source: "/etkinlikler/:slug", destination: "/duyurular-ve-etkinlikler/etkinlikler/:slug", permanent: true },
      { source: "/galeri", destination: "/duyurular-ve-etkinlikler/galeri", permanent: true },
      { source: "/uyelik", destination: "/uyelik/dernek-uyeligi", permanent: true },
      { source: "/uyelik/sartlar", destination: "/uyelik/dernek-uyeligi", permanent: true },
      { source: "/uyelik/aidat", destination: "/uyelik/aidat-ve-bagis", permanent: true },
      { source: "/uyelik/bagis", destination: "/uyelik/aidat-ve-bagis", permanent: true },
      { source: "/sss", destination: "/sikca-sorulanlar", permanent: true },
    ];
  },
};

export default nextConfig;
