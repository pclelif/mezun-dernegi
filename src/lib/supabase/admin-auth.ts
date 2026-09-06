import type { User } from "@supabase/supabase-js";

/**
 * Sunucu tarafında admin yetkisini doğrular.
 * 1) JWT app_metadata/user_metadata.role === "admin"
 * 2) ADMIN_EMAILS ortam değişkenindeki allowlist (virgülle ayrılmış)
 */
export function isAdminUser(user: User | null | undefined): boolean {
  if (!user) return false;

  const metaRole =
    (user.app_metadata as Record<string, unknown> | undefined)?.role ??
    (user.user_metadata as Record<string, unknown> | undefined)?.role;

  if (metaRole === "admin") return true;

  const email = user.email?.trim().toLowerCase();
  if (!email) return false;

  const allowlist = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return allowlist.includes(email);
}

export const ADMIN_MUTATION_TABLES = new Set([
  "events",
  "announcements",
  "galleries",
  "gallery_images",
  "faqs",
  "board_members",
  "site_content",
  "contact_messages",
]);
