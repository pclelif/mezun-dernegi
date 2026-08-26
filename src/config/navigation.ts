export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export const corporateNavigation: NavigationItem[] = [
  { label: "Dernek Hakkında", href: "/hakkimizda/dernek-hakkinda" },
  { label: "Aydoğan Aydın Kimdir?", href: "/hakkimizda/aydogan-aydin" },
  { label: "Vizyon ve Misyon", href: "/hakkimizda/vizyon-ve-misyon" },
  { label: "Başkanın Mesajı", href: "/hakkimizda/baskanin-mesaji" },
  { label: "Yönetim ve Denetim Kurulu", href: "/hakkimizda/yonetim-ve-denetim-kurulu" },
  { label: "Dernek Tüzüğü", href: "/hakkimizda/dernek-tuzugu" },
];

export const newsAndEventsNavigation: NavigationItem[] = [
  { label: "Duyurular", href: "/duyurular-ve-etkinlikler/duyurular" },
  { label: "Etkinlikler", href: "/duyurular-ve-etkinlikler/etkinlikler" },
  { label: "Galeri", href: "/duyurular-ve-etkinlikler/galeri" },
];

export const membershipNavigation: NavigationItem[] = [
  { label: "Dernek Üyeliği", href: "/uyelik/dernek-uyeligi" },
  { label: "Aidat ve Bağış", href: "/uyelik/aidat-ve-bagis" },
];

export const footerLinks: NavigationItem[] = [
  ...corporateNavigation,
  ...newsAndEventsNavigation,
  ...membershipNavigation,
  { label: "Sıkça Sorulanlar", href: "/sikca-sorulanlar" },
  { label: "İletişim", href: "/iletisim" },
];

export const navigation: NavigationItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda/dernek-hakkinda", children: corporateNavigation },
  { label: "Duyurular ve Etkinlikler", href: "/duyurular-ve-etkinlikler/duyurular", children: newsAndEventsNavigation },
  { label: "Üyelik", href: "/uyelik/dernek-uyeligi", children: membershipNavigation },
  { label: "Sıkça Sorulanlar", href: "/sikca-sorulanlar" },
  { label: "İletişim", href: "/iletisim" },
];
