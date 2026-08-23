import { formatTurkishDate, type DbAnnouncement, type DbBoardMember, type DbEvent, type DbFaq, type DbGallery, type DbGalleryImage } from "@/lib/supabase/client";
import { createServerAnonClient } from "@/lib/supabase/server";

// Fallback demo verileri (Supabase kapalıyken veya veri henüz eklenmediğinde boş durumları temsil eder)
const FALLBACK_EVENTS: DbEvent[] = [];
const FALLBACK_ANNOUNCEMENTS: DbAnnouncement[] = [];
const FALLBACK_GALLERIES: DbGallery[] = [];
const FALLBACK_GALLERY_IMAGES: DbGalleryImage[] = [
  {
    id: "fb-gimg-logo",
    gallery_id: "fb-gal-logo",
    image_url: "/logo-dernek.jpg",
    display_order: 1,
    created_at: new Date().toISOString(),
  },
];
const FALLBACK_BOARD: DbBoardMember[] = [];
const FALLBACK_FAQS: DbFaq[] = [];

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

export async function getSiteContent<T extends Record<string, string>>(section: string, defaults: T): Promise<T> {
  if (!isSupabaseConfigured()) return defaults;
  return withTimeout(async () => {
    const { data, error } = await createServerAnonClient().from("site_content").select("content").eq("section", section).maybeSingle();
    if (error || !data) return defaults;
    return { ...defaults, ...((data?.content as Partial<T> | null) ?? {}) };
  }, defaults);
}

export function mapEventToCardProps(event: DbEvent) {
  return {
    title: event.title,
    date: formatTurkishDate(event.date) || "Tarih belirtilmedi",
    time: event.time || "—",
    location: event.location || "—",
    description: event.description || "",
    href: `/etkinlikler/${event.slug}`,
    status: (event.status === "past" ? "past" : "upcoming") as "upcoming" | "past",
    dateTime: event.date ?? undefined,
  };
}
