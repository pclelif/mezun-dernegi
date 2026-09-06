import "server-only";
import { isAdminUser } from "./admin-auth";
import { createServerSessionClient } from "./server";

export async function requireAdmin() {
  const supabase = await createServerSessionClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { ok: false, status: 401 } as const;
  if (!isAdminUser(user)) return { ok: false, status: 403 } as const;
  // Also require the database policy to agree; fail closed if migration is missing.
  const { data: allowed, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || allowed !== true) return { ok: false, status: 403 } as const;
  return { ok: true, supabase, user } as const;
}
