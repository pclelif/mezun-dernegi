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
];

export const membershipNavigation: NavigationItem[] = [
  { label: "Dernek Üyeliği", href: "/uyelik" },
  { label: "Aidat ve Bağış", href: "/uyelik/aidat" },
];

export const navigation: NavigationItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/kurumsal/hakkimizda", children: corporateNavigation },
  { label: "Duyurular", href: "/duyurular" },
  { label: "Etkinlikler", href: "/etkinlikler" },
  { label: "Haberler", href: "/haberler" },
  { label: "Galeri", href: "/galeri" },
  { label: "Üyelik", href: "/uyelik", children: membershipNavigation },
  { label: "İletişim", href: "/iletisim" },
];
