export type Announcement = {
  title: string;
  date: string;
  dateTime: string;
  summary: string;
  href: string;
};

export type Event = {
  title: string;
  date: string;
  time: string;
  dateTime: string;
  location: string;
  description: string;
  href: string;
  status: "upcoming" | "past";
};

export const announcements: Announcement[] = [
  {
    title: "Yeni dönem üyelik başvuruları başladı",
    date: "1 Ağustos 2026",
    dateTime: "2026-08-01",
    href: "/duyurular/yeni-donem-uyelik",
    summary: "Mezun topluluğumuza katılmak ve dernek çalışmalarında yer almak için başvurunuzu iletebilirsiniz.",
  },
  {
    title: "Olağan genel kurul duyurusu",
    date: "24 Temmuz 2026",
    dateTime: "2026-07-24",
    href: "/duyurular/olagan-genel-kurul",
    summary: "Genel kurul toplantımıza ilişkin tarih, yer ve gündem bilgileri yayımlandı.",
  },
];

export const events: Event[] = [
  {
    title: "Geleneksel Mezunlar Buluşması",
    date: "12 Eylül 2026",
    time: "15.00",
    dateTime: "2026-09-12T15:00:00+03:00",
    location: "Okul Bahçesi",
    description: "Farklı dönemlerden mezunlarımızla yeniden bir araya geliyor, okul anılarımızı ve yeni dönem çalışmalarımızı paylaşıyoruz.",
    href: "/etkinlikler/mezunlar-bulusmasi",
    status: "upcoming",
  },
  {
    title: "Kariyer Sohbetleri",
    date: "3 Ekim 2026",
    time: "19.00",
    dateTime: "2026-10-03T19:00:00+03:00",
    location: "Çevrim içi",
    description: "Mezunlarımızın deneyimlerinden yararlanacağımız çevrim içi buluşmada farklı sektörlerdeki kariyer yollarını konuşuyoruz.",
    href: "/etkinlikler/kariyer-sohbetleri",
    status: "upcoming",
  },
];
