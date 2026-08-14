import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

/** RSC / Server Actions için anon istemci */
export function createServerAnonClient() {
  const { url, anonKey } = getPublicEnv();
  return createSupabaseJsClient(url, anonKey);
}

/** Cookie tabanlı Supabase Auth istemcisi (Server Components / Actions). */
export async function createServerSessionClient() {
  const { url, anonKey } = getPublicEnv();
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

