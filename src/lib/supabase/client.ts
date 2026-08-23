import { createBrowserClient } from "@supabase/ssr";

function getPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase ortam değişkenleri eksik. NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY değerlerini .env.local dosyasına ekleyin.",
    );
  }

  return { url, anonKey };
}

/**
 * Tarayıcıda kullanılacak Supabase istemcisi.
 */
export function createClient() {
  const { url, anonKey } = getPublicEnv();
  return createBrowserClient(url, anonKey);
}

export type DbEvent = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  status: string | null;
  image_url: string | null;
  is_published?: boolean;
  created_at: string;
};

export type DbAnnouncement = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  date: string | null;
  image_url: string | null;
  is_published?: boolean;
  created_at: string;
};

export type DbGallery = {
  id: string;
  title: string;
  slug: string;
  date: string | null;
  cover_image_url: string | null;
  created_at: string;
};

export type DbGalleryImage = {
  id: string;
  gallery_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
};

export type DbBoardMember = {
  id: string;
  name: string;
  role: string | null;
  board_type: "management" | "audit";
  image_url: string | null;
  bio?: string | null;
  display_order: number;
  created_at: string;
};

export type DbFaq = {
  id: string;
  question: string;
  answer: string;
  category: "general" | "membership" | "dues";
  display_order: number;
  created_at: string;
};

export function slugify(input: string) {
  return input
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatTurkishDate(value: string | null | undefined) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
