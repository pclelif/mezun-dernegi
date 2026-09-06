import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/supabase/require-admin";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const auth = await requireAdmin();
  if (!auth.ok) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
