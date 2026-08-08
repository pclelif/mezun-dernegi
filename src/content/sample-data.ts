export type Announcement = {
  title: string;
  date: string;
  slug: string;
  summary?: string;
};

export type Event = {
  title: string;
  date: string;
  location: string;
  slug: string;
};

export const announcements: Announcement[] = [
  {
    title: "Yeni dönem üyelik başvuruları başladı",
    date: "1 Ağustos 2026",
    slug: "yeni-donem-uyelik",
    summary: "Mezun topluluğumuza katılmak ve dernek çalışmalarında yer almak için başvurunuzu iletebilirsiniz.",
  },
  {
    title: "Olağan genel kurul duyurusu",
    date: "24 Temmuz 2026",
    slug: "olagan-genel-kurul",
    summary: "Genel kurul toplantımıza ilişkin tarih, yer ve gündem bilgileri yayımlandı.",
  },
];

export const events: Event[] = [
  { title: "Geleneksel Mezunlar Buluşması", date: "12 Eylül 2026 · 15.00", location: "Okul Bahçesi", slug: "mezunlar-bulusmasi" },
  { title: "Kariyer Sohbetleri", date: "3 Ekim 2026 · 19.00", location: "Çevrim içi", slug: "kariyer-sohbetleri" },
];
