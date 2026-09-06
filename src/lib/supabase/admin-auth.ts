import type { User } from "@supabase/supabase-js";

/** Only server-managed metadata may grant administrator access. */
export function isAdminUser(user: User | null | undefined): boolean {
  return Boolean(user?.id && user.app_metadata?.role === "admin");
}
