import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { parseAdminMutation } from "@/lib/supabase/admin-validation";

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) return NextResponse.json({ error: "Yetkisiz işlem." }, { status: auth.status });
    // Browser mutations must originate from this site and use JSON.
    const origin = request.headers.get("origin");
    if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
      return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
    }
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
      return NextResponse.json({ error: "JSON gerekli." }, { status: 415 });
    }
    let mutation;
    try {
      mutation = parseAdminMutation(await request.json());
    } catch {
      return NextResponse.json({ error: "Geçersiz veri veya kayıt filtresi." }, { status: 400 });
    }
    const { table, action, data, match, onConflict } = mutation;
    const { supabase } = auth;
    let result;

    if (action === "insert") {
      result = await supabase.from(table).insert(data ?? {}).select();
    } else if (action === "upsert") {
      result = await supabase.from(table).upsert(data ?? {}, { onConflict }).select();
    } else if (action === "update") {
      result = await supabase
        .from(table)
        .update((data as Record<string, unknown>) ?? {})
        .match(match!)
        .select();
    } else if (action === "delete") {
      result = await supabase.from(table).delete().match(match!);
    } else {
      return NextResponse.json({ error: "Geçersiz işlem tipi." }, { status: 400 });
    }

    if (result?.error) {
      return NextResponse.json({ error: "İşlem gerçekleştirilemedi. Alanları ve yetkinizi kontrol edin." }, { status: 400 });
    }
    return NextResponse.json({ data: result?.data ?? null });
  } catch {
    return NextResponse.json({ error: "İşlem gerçekleştirilemedi." }, { status: 500 });
  }
}
