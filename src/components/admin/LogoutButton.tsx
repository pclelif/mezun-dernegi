"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={() => void handleLogout()}
      disabled={loading}
      className="inline-flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-bold text-[#ec1c24] transition-colors hover:bg-red-950/40 hover:text-red-400 disabled:opacity-60 cursor-pointer"
    >
      <LogOut className="size-4" aria-hidden="true" />
      {loading ? "Çıkış yapılıyor…" : "Çıkış Yap"}
    </button>
  );
}
