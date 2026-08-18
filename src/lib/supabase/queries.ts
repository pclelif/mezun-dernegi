import { formatTurkishDate, type DbAnnouncement, type DbEvent, type DbFaq, type DbGallery } from "@/lib/supabase/client";
import { createServerAnonClient } from "@/lib/supabase/server";

export async function getEvents(limit?: number) {
  const supabase = createServerAnonClient();
  let query = supabase.from("events").select("*").order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as DbEvent[];
}

export async function getEventBySlug(slug: string) {
  const supabase = createServerAnonClient();
  const { data, error } = await supabase.from("events").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as DbEvent | null;
}

export async function getAnnouncements(limit?: number) {
  const supabase = createServerAnonClient();
  let query = supabase.from("announcements").select("*").order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as DbAnnouncement[];
}

export async function getAnnouncementBySlug(slug: string) {
  const supabase = createServerAnonClient();
  const { data, error } = await supabase.from("announcements").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as DbAnnouncement | null;
}

export async function getGalleries() {
  const supabase = createServerAnonClient();
  const { data, error } = await supabase.from("galleries").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbGallery[];
}

export async function getGalleryBySlug(slug: string) {
  const supabase = createServerAnonClient();
  const { data, error } = await supabase.from("galleries").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as DbGallery | null;
}

export async function getGalleryImages(galleryId: string) {
  const supabase = createServerAnonClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("gallery_id", galleryId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAllGalleryImages() {
  const supabase = createServerAnonClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getBoardMembers() {
  const supabase = createServerAnonClient();
  const { data, error } = await supabase.from("board_members").select("*").order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getFaqs(category?: DbFaq["category"]) {
  const supabase = createServerAnonClient();
  let query = supabase.from("faqs").select("*").order("display_order", { ascending: true });
  if (category) query = query.eq("category", category);
  let { data, error } = await query;

  if (error && category) {
    const fallback = await supabase.from("faqs").select("*").order("display_order", { ascending: true });
    data = fallback.data;
    error = fallback.error;
  }

  if (error) throw error;
  return (data ?? []).map((faq) => ({ ...faq, category: faq.category ?? "general" })) as DbFaq[];
}

export async function getSiteContent<T extends Record<string, string>>(section: string, defaults: T): Promise<T> {
  const { data, error } = await createServerAnonClient().from("site_content").select("content").eq("section", section).maybeSingle();
  if (error) return defaults;
  return { ...defaults, ...((data?.content as Partial<T> | null) ?? {}) };
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
