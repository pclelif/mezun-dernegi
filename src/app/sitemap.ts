import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getAnnouncements, getEvents } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Hakkımızda
    {
      url: `${siteUrl}/hakkimizda/dernek-hakkinda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/hakkimizda/aydogan-aydin`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/hakkimizda/vizyon-ve-misyon`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/hakkimizda/baskanin-mesaji`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/hakkimizda/yonetim-ve-denetim-kurulu`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/hakkimizda/dernek-tuzugu`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Duyurular ve Etkinlikler
    {
      url: `${siteUrl}/duyurular-ve-etkinlikler/duyurular`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/duyurular-ve-etkinlikler/etkinlikler`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/duyurular-ve-etkinlikler/galeri`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Üyelik
    {
      url: `${siteUrl}/uyelik/dernek-uyeligi`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/uyelik/aidat-ve-bagis`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // Sıkça Sorulanlar & İletişim
    {
      url: `${siteUrl}/sikca-sorulanlar`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/iletisim`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Yasal
    {
      url: `${siteUrl}/kvkk`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/gizlilik-politikasi`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/cerez-politikasi`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/kullanim-kosullari`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Dynamic Announcement Routes from Supabase
  let announcementRoutes: MetadataRoute.Sitemap = [];
  try {
    const announcements = await getAnnouncements();
    announcementRoutes = announcements
      .filter((a) => a.slug)
      .map((a) => ({
        url: `${siteUrl}/duyurular-ve-etkinlikler/duyurular/${a.slug}`,
        lastModified: a.created_at || currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch {
    announcementRoutes = [];
  }

  // Dynamic Event Routes from Supabase
  let eventRoutes: MetadataRoute.Sitemap = [];
  try {
    const events = await getEvents();
    eventRoutes = events
      .filter((e) => e.slug)
      .map((e) => ({
        url: `${siteUrl}/duyurular-ve-etkinlikler/etkinlikler/${e.slug}`,
        lastModified: e.created_at || currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch {
    eventRoutes = [];
  }

  return [...staticRoutes, ...announcementRoutes, ...eventRoutes];
}
