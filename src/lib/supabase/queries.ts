import { formatTurkishDate, type DbAnnouncement, type DbBoardMember, type DbEvent, type DbFaq, type DbGallery, type DbGalleryImage } from "@/lib/supabase/client";
import { createServerAnonClient } from "@/lib/supabase/server";

// Fallback demo verileri (Supabase kapalıyken veya veri henüz eklenmediğinde boş durumları engeller)
const FALLBACK_EVENTS: DbEvent[] = [
  {
    id: "fb-event-1",
    title: "Test: Mezunlar Buluşması",
    slug: "test-mezunlar-bulusmasi",
    description: "Mezunlarımızı okulumuzda bir araya getirmeyi planladığımız dönem buluşması. Ayrıntılar ve buluşma saati netleştiğinde paylaşılacaktır.",
    date: "2026-10-18",
    time: "14:00",
    location: "KAAFL Okul Bahçesi / Ankara",
    status: "upcoming",
    image_url: "/hero-bg.jpg",
    is_published: true,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-event-2",
    title: "Test: Mezunlar Kahvaltısı",
    slug: "test-mezunlar-kahvaltisi",
    description: "Dönem mezunlarımızla bir araya gelip sohbet edeceğimiz keyifli bir hafta sonu kahvaltı buluşması.",
    date: "2026-11-15",
    time: "10:30 - 13:00",
    location: "Dernek Merkezi / Ankara",
    status: "upcoming",
    image_url: "/hero-bg.jpg",
    is_published: true,
    created_at: "2026-08-18T10:00:00.000Z",
  },
  {
    id: "fb-event-3",
    title: "Test: Tanışma Toplantısı",
    slug: "test-tanisma-toplantisi",
    description: "Derneğimizin kuruluşu sonrasında mezunlarımızla gerçekleştirdiğimiz ilk tanışma toplantısı.",
    date: "2026-06-20",
    time: "14:00",
    location: "Dernek Merkezi / Ankara",
    status: "past",
    image_url: "/hero-bg.jpg",
    is_published: true,
    created_at: "2026-06-01T10:00:00.000Z",
  },
];

const FALLBACK_ANNOUNCEMENTS: DbAnnouncement[] = [
  {
    id: "fb-ann-1",
    title: "Test: Web Sitemiz Yayında",
    slug: "test-web-sitemiz-yayinda",
    content: "Derneğimizin resmi web sitesi mezunlarımızın kullanımına açılmıştır. Tüm duyuru ve etkinliklerimizi sitemiz üzerinden takip edebilirsiniz.",
    date: "2026-08-25",
    image_url: null,
    is_published: true,
    created_at: "2026-08-25T10:00:00.000Z",
  },
  {
    id: "fb-ann-2",
    title: "Test: Üyelik Başvuruları Hakkında",
    slug: "test-uyelik-basvurulari-hakkinda",
    content: "Derneğimize üye olmak isteyen mezunlarımız için üyelik formu ve başvuru adımları sitemizde yer almaktadır.",
    date: "2026-08-20",
    image_url: null,
    is_published: true,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-ann-3",
    title: "Test: İletişim Bilgileri Güncellemesi",
    slug: "test-iletisim-bilgileri-guncellemesi",
    content: "Mezunlarımızla daha kolay iletişim kurabilmek adına iletişim kanallarımız güncellenmiştir. Bizlere iletişim sayfamızdan ulaşabilirsiniz.",
    date: "2026-08-15",
    image_url: null,
    is_published: true,
    created_at: "2026-08-15T10:00:00.000Z",
  },
];

const FALLBACK_GALLERIES: DbGallery[] = [
  {
    id: "fb-gal-1",
    title: "Ana Galeri",
    slug: "ana-galeri",
    date: "2026-08-20",
    cover_image_url: "/logo-dernek.jpg",
    created_at: "2026-08-20T10:00:00.000Z",
  },
];

const FALLBACK_GALLERY_IMAGES: DbGalleryImage[] = [
  {
    id: "fb-gimg-1",
    gallery_id: "fb-gal-1",
    image_url: "/logo-dernek.jpg",
    display_order: 1,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-gimg-2",
    gallery_id: "fb-gal-1",
    image_url: "/hero-bg.jpg",
    display_order: 2,
    created_at: "2026-08-20T10:01:00.000Z",
  },
  {
    id: "fb-gimg-3",
    gallery_id: "fb-gal-1",
    image_url: "/images/aydogan-aydin.jpg",
    display_order: 3,
    created_at: "2026-08-20T10:02:00.000Z",
  },
  {
    id: "fb-gimg-4",
    gallery_id: "fb-gal-1",
    image_url: "/logo-dernek.jpg",
    display_order: 4,
    created_at: "2026-08-20T10:03:00.000Z",
  },
];

const FALLBACK_BOARD: DbBoardMember[] = [
  { id: "fb-bm-1", name: "Test", role: "Yönetim Kurulu Başkanı", board_type: "management", image_url: null, display_order: 1, created_at: "2026-08-20T10:00:00.000Z" },
  { id: "fb-bm-2", name: "Test", role: "Yönetim Kurulu Üyesi", board_type: "management", image_url: null, display_order: 2, created_at: "2026-08-20T10:00:00.000Z" },
  { id: "fb-bm-3", name: "Test", role: "Denetim Kurulu Başkanı", board_type: "audit", image_url: null, display_order: 1, created_at: "2026-08-20T10:00:00.000Z" },
  { id: "fb-bm-4", name: "Test", role: "Denetim Kurulu Üyesi", board_type: "audit", image_url: null, display_order: 2, created_at: "2026-08-20T10:00:00.000Z" },
  { id: "fb-bm-5", name: "Test", role: "Denetim Kurulu Üyesi", board_type: "audit", image_url: null, display_order: 3, created_at: "2026-08-20T10:00:00.000Z" },
];

const FALLBACK_FAQS: DbFaq[] = [
  {
    id: "fb-faq-1",
    question: "Test: Mezunlar Derneği'nin amacı nedir?",
    answer: "Derneğimiz, mezunlarımız arasındaki sosyal ve mesleki bağı kuvvetlendirmek, okulumuzun değerlerini yaşatmak ve öğrencilere destek olmak amacıyla faaliyet göstermektedir.",
    category: "general",
    display_order: 1,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-faq-2",
    question: "Test: Kimler derneğimize üye olabilir?",
    answer: "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi mezunları ve dernek tüzüğümüzde belirtilen şartları sağlayan tüm mensuplarımız üyelik başvurusunda bulunabilir.",
    category: "general",
    display_order: 2,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-faq-3",
    question: "Test: Dernek tüzüğüne nereden ulaşabilirim?",
    answer: "Dernek tüzüğümüzün güncel ve tam metnine web sitemizin Hakkımızda menüsü altında yer alan Dernek Tüzüğü sayfasından ulaşabilirsiniz.",
    category: "general",
    display_order: 3,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-faq-4",
    question: "Test: Üyelik başvuru süreci nasıl işler?",
    answer: "Web sitemizdeki üyelik formunu indirip doldurduktan sonra, adli sicil kaydı ve giriş aidatı dekontu ile birlikte derneğimize ileterek başvurunuzu başlatabilirsiniz.",
    category: "membership",
    display_order: 1,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-faq-5",
    question: "Test: Üyelik başvurusu ne kadar sürede sonuçlanır?",
    answer: "Yönetim kurulumuz tarafından yapılan inceleme sonrasında en geç 30 gün içinde tarafınıza bilgilendirme yapılır.",
    category: "membership",
    display_order: 2,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-faq-6",
    question: "Test: Dernek aidatları hangi dönemlerde ödenir?",
    answer: "Dernek aidatları yılda 4 dönem (Mart, Haziran, Eylül, Aralık) olarak belirlenen banka hesabımıza açıklama belirtilerek ödenir.",
    category: "dues",
    display_order: 1,
    created_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "fb-faq-7",
    question: "Test: Derneğe nasıl bağış yapabilirim?",
    answer: "Resmi banka IBAN numaramıza 'Bağış' açıklaması ve ad-soyadınızı yazarak dilediğiniz miktarda bağışta bulunabilirsiniz.",
    category: "dues",
    display_order: 2,
    created_at: "2026-08-20T10:00:00.000Z",
  },
];

/** Supabase URL ve Key kontrolü - DNS zaman aşımını (10-20 sn yavaşlığı) engellemek için hızlı denetim */
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes("placeholder.supabase.co") || key === "placeholder_key") return false;
  return true;
}

async function withTimeout<T>(fn: () => Promise<T>, fallback: T, ms = 5000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), ms);
  });
  try {
    const result = await Promise.race([fn(), timeout]);
    clearTimeout(timer!);
    return result;
  } catch {
    clearTimeout(timer!);
    return fallback;
  }
}

export async function getEvents(limit?: number) {
  const fallback = (limit ? FALLBACK_EVENTS.slice(0, limit) : FALLBACK_EVENTS) as DbEvent[];
  if (!isSupabaseConfigured()) return fallback;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    let query = supabase
      .from("events")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return fallback;
    return data as DbEvent[];
  }, fallback);
}

export async function getEventBySlug(slug: string) {
  const fallback = FALLBACK_EVENTS.find((e) => e.slug === slug) || FALLBACK_EVENTS[0] || null;
  if (!isSupabaseConfigured()) return fallback;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase.from("events").select("*").eq("slug", slug).maybeSingle();
    if (error || !data) return fallback;
    return data as DbEvent | null;
  }, fallback);
}

export async function getAnnouncements(limit?: number) {
  const fallback = (limit ? FALLBACK_ANNOUNCEMENTS.slice(0, limit) : FALLBACK_ANNOUNCEMENTS) as DbAnnouncement[];
  if (!isSupabaseConfigured()) return fallback;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    let query = supabase
      .from("announcements")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return fallback;
    return data as DbAnnouncement[];
  }, fallback);
}

export async function getAnnouncementBySlug(slug: string) {
  const fallback = FALLBACK_ANNOUNCEMENTS.find((a) => a.slug === slug) || FALLBACK_ANNOUNCEMENTS[0] || null;
  if (!isSupabaseConfigured()) return fallback;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase.from("announcements").select("*").eq("slug", slug).maybeSingle();
    if (error || !data) return fallback;
    return data as DbAnnouncement | null;
  }, fallback);
}

export async function getGalleries() {
  if (!isSupabaseConfigured()) return FALLBACK_GALLERIES as DbGallery[];
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase.from("galleries").select("*").order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return FALLBACK_GALLERIES as DbGallery[];
    return data as DbGallery[];
  }, FALLBACK_GALLERIES as DbGallery[]);
}

export async function getGalleryBySlug(slug: string) {
  const fallback = FALLBACK_GALLERIES.find((g) => g.slug === slug) || FALLBACK_GALLERIES[0] || null;
  if (!isSupabaseConfigured()) return fallback;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase.from("galleries").select("*").eq("slug", slug).maybeSingle();
    if (error || !data) return fallback;
    return data as DbGallery | null;
  }, fallback);
}

export async function getGalleryImages(galleryId: string) {
  if (!isSupabaseConfigured()) return FALLBACK_GALLERY_IMAGES;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("gallery_id", galleryId)
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_GALLERY_IMAGES;
    return data;
  }, FALLBACK_GALLERY_IMAGES);
}

export async function getAllGalleryImages() {
  if (!isSupabaseConfigured()) return FALLBACK_GALLERY_IMAGES;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return FALLBACK_GALLERY_IMAGES;
    return data;
  }, FALLBACK_GALLERY_IMAGES);
}

export async function getBoardMembers() {
  if (!isSupabaseConfigured()) return FALLBACK_BOARD;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    const { data, error } = await supabase
      .from("board_members")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_BOARD;
    return data;
  }, FALLBACK_BOARD);
}

export async function getFaqs(category?: DbFaq["category"]) {
  const fallback = (category ? FALLBACK_FAQS.filter((f) => f.category === category) : FALLBACK_FAQS) as DbFaq[];
  if (!isSupabaseConfigured()) return fallback;
  return withTimeout(async () => {
    const supabase = createServerAnonClient();
    let query = supabase
      .from("faqs")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true });
    if (category) query = query.eq("category", category);
    let { data, error } = await query;

    if (error && category) {
      const fallbackQuery = await supabase
        .from("faqs")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false });
      data = fallbackQuery.data;
      error = fallbackQuery.error;
    }

    if (error || !data || data.length === 0) return fallback;
    return (data ?? []).map((faq) => ({ ...faq, category: faq.category ?? "general" })) as DbFaq[];
  }, fallback);
}

function normalizeMezunlarDernegi<T extends Record<string, string>>(obj: T): T {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === "string") {
      result[key] = val.replace(/Mezunları Derneği/g, "Mezunlar Derneği");
    } else {
      result[key] = val;
    }
  }
  return result as T;
}

export async function getSiteContent<T extends Record<string, string>>(section: string, defaults: T): Promise<T> {
  const normalizedDefaults = normalizeMezunlarDernegi(defaults);
  if (!isSupabaseConfigured()) return normalizedDefaults;
  return withTimeout(async () => {
    const { data, error } = await createServerAnonClient().from("site_content").select("content").eq("section", section).maybeSingle();
    if (error || !data) return normalizedDefaults;
    const merged = { ...normalizedDefaults, ...((data?.content as Partial<T> | null) ?? {}) };
    return normalizeMezunlarDernegi(merged);
  }, normalizedDefaults);
}

export function mapEventToCardProps(event: DbEvent) {
  return {
    title: event.title,
    date: formatTurkishDate(event.date) || "Tarih belirtilmedi",
    time: event.time || "—",
    location: event.location || "—",
    description: event.description || "",
    href: `/duyurular-ve-etkinlikler/etkinlikler/${event.slug}`,
    status: (event.status === "past" ? "past" : "upcoming") as "upcoming" | "past",
    dateTime: event.date ?? undefined,
  };
}
