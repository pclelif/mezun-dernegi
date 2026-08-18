export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export const corporateNavigation: NavigationItem[] = [
  { label: "Dernek Hakkında", href: "/kurumsal/hakkimizda" },
  { label: "Aydoğan Aydın Kimdir?", href: "/hakkimizda/aydogan-aydin" },
  { label: "Vizyon ve Misyon", href: "/kurumsal/vizyon-misyon" },
  { label: "Başkanın Mesajı", href: "/kurumsal/baskanin-mesaji" },
  { label: "Yönetim ve Denetim Kurulu", href: "/kurumsal/yonetim-ve-denetim-kurullari" },
  { label: "Dernek Tüzüğü", href: "/kurumsal/tuzuk" },
];

export const newsAndEventsNavigation: NavigationItem[] = [
  { label: "Duyurular", href: "/duyurular" },
  { label: "Etkinlikler", href: "/etkinlikler" },
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
  { label: "Duyurular ve Etkinlikler", href: "/duyurular", children: newsAndEventsNavigation },
  { label: "Üyelik", href: "/uyelik", children: membershipNavigation },
  { label: "Sıkça Sorulanlar", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];
