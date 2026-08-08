export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export const corporateNavigation: NavigationItem[] = [
  { label: "Dernek Hakkında", href: "/kurumsal/hakkimizda" },
  { label: "Başkanın Mesajı", href: "/kurumsal/baskanin-mesaji" },
  { label: "Vizyon ve Misyon", href: "/kurumsal/vizyon-misyon" },
  { label: "Yönetim Kurulu", href: "/kurumsal/yonetim-kurulu" },
  { label: "Denetim Kurulu", href: "/kurumsal/denetim-kurulu" },
  { label: "Dernek Tüzüğü", href: "/kurumsal/tuzuk" },
];

export const navigation: NavigationItem[] = [
  { label: "Hakkımızda", href: "/kurumsal/hakkimizda", children: corporateNavigation },
  { label: "Duyurular", href: "/duyurular" },
  { label: "Etkinlikler", href: "/etkinlikler" },
  { label: "Haberler", href: "/haberler" },
  { label: "Galeri", href: "/galeri" },
  { label: "Üyelik", href: "/uyelik" },
  { label: "İletişim", href: "/iletisim" },
];
