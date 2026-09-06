import "server-only";
import dns from "node:dns";
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // DNS override bazı ortamlarda engellenebilir; sessizce geç.
}

function getAnonEnv() {
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
 * RSC / public okumalar için anon istemci.
 * ASLA service role kullanmaz; RLS her zaman uygulanır.
 */
export function createServerAnonClient() {
  const { url, anonKey } = getAnonEnv();
  return createSupabaseJsClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

/**
 * Cookie tabanlı Supabase Auth istemcisi (Server Components / Route Handlers).
 * Yalnızca anon key + kullanıcı oturumu; service role kullanılmaz.
 */
export async function createServerSessionClient() {
  const { url, anonKey } = getAnonEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cookies yazamaz; token yenilemeyi proxy üstlenir.
        }
      },
    },
  });
}
