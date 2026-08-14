export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export const corporateNavigation: NavigationItem[] = [
  { label: "Dernek Hakkında", href: "/kurumsal/hakkimizda" },
  { label: "Vizyon ve Misyon", href: "/kurumsal/vizyon-misyon" },
  { label: "Başkanın Mesajı", href: "/kurumsal/baskanin-mesaji" },
  { label: "Yönetim Kurulu", href: "/kurumsal/yonetim-kurulu" },
  { label: "Denetim Kurulu", href: "/kurumsal/denetim-kurulu" },
  { label: "Dernek Tüzüğü", href: "/kurumsal/tuzuk" },
  { label: "Aydoğan Aydın Kimdir?", href: "/hakkimizda/aydogan-aydin" },
];

export const newsAndEventsNavigation: NavigationItem[] = [
  { label: "Etkinlikler", href: "/etkinlikler" },
  { label: "Duyurular", href: "/duyurular" },
  { label: "Galeri", href: "/galeri" },
];

export const membershipNavigation: NavigationItem[] = [
  { label: "Dernek Üyeliği", href: "/uyelik" },
  { label: "Aidat ve Bağış", href: "/uyelik/aidat" },
];

export const footerLinks: NavigationItem[] = [
  ...corporateNavigation,
  ...newsAndEventsNavigation,
  { label: "Sıkça Sorulan Sorular", href: "/sss" },
];

export const navigation: NavigationItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/kurumsal/hakkimizda", children: corporateNavigation },
  { label: "Etkinlikler ve Duyurular", href: "/etkinlikler", children: newsAndEventsNavigation },
  { label: "Üyelik", href: "/uyelik", children: membershipNavigation },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];
