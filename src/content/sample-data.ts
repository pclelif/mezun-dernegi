import { associationName } from "@/config/site";

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

export type BoardMember = {
  name: string;
  role: string;
  image?: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
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
  {
    title: "Mezunlar Kahvaltısı",
    date: "17 Mayıs 2026",
    time: "10.30",
    dateTime: "2026-05-17T10:30:00+03:00",
    location: "Ankara",
    description: "Farklı mezuniyet dönemlerinden üyelerimizin bir araya geldiği geleneksel kahvaltı buluşmamızı gerçekleştirdik.",
    href: "/etkinlikler/mezunlar-kahvaltisi",
    status: "past",
  },
];

export const boardMembers: BoardMember[] = [
  { name: "Ayşe Yılmaz", role: "Yönetim Kurulu Başkanı" },
  { name: "Mehmet Demir", role: "Başkan Yardımcısı" },
  { name: "Selin Kaya", role: "Genel Sekreter" },
  { name: "Burak Aydın", role: "Sayman" },
  { name: "Zeynep Şahin", role: "Yönetim Kurulu Üyesi" },
  { name: "Emre Arslan", role: "Yönetim Kurulu Üyesi" },
];

export const auditBoardMembers: BoardMember[] = [
  { name: "Elif Koç", role: "Denetim Kurulu Başkanı" },
  { name: "Can Özdemir", role: "Denetim Kurulu Üyesi" },
  { name: "Derya Akın", role: "Denetim Kurulu Üyesi" },
];

export const frequentlyAskedQuestions: FAQ[] = [
  {
    id: "membership-eligibility",
    question: "Kimler derneğe üye olabilir?",
    answer: `${associationName} kapsamındaki mezunlar, dernek tüzüğünde belirtilen üyelik koşullarını sağlamaları halinde üyelik başvurusunda bulunabilir.`,
  },
  {
    id: "membership-application",
    question: "Derneğe nasıl üye olabilirim?",
    answer: "Üyelik başvuru formunu eksiksiz doldurarak başvurunuzu iletebilirsiniz. Başvurunuz değerlendirildikten sonra sizinle iletişime geçilir.",
  },
  {
    id: "membership-fee",
    question: "Üyelik aidatını nasıl ödeyebilirim?",
    answer: "Güncel aidat tutarı ve ödeme seçeneklerine Üyelik bölümündeki Aidat ve Bağış sayfasından ulaşabilirsiniz.",
  },
  {
    id: "events",
    question: "Etkinliklerden nasıl haberdar olabilirim?",
    answer: "Yaklaşan buluşmaları Etkinlikler sayfasından, önemli bilgilendirmeleri ise Duyurular sayfasından takip edebilirsiniz.",
  },
];
