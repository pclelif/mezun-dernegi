import { NextResponse } from "next/server";
import { createServerAnonClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { table, action, data, match } = body;

    if (!table || !action) {
      return NextResponse.json({ error: "Eksik parametre." }, { status: 400 });
    }

    const supabase = createServerAnonClient();
    let result;

    if (action === "insert") {
      result = await supabase.from(table).insert(data).select();
    } else if (action === "upsert") {
      result = await supabase.from(table).upsert(data, { onConflict: body.onConflict }).select();
    } else if (action === "update") {
      result = await supabase.from(table).update(data).match(match || {}).select();
    } else if (action === "delete") {
      result = await supabase.from(table).delete().match(match || {});
    } else {
      return NextResponse.json({ error: "Geçersiz işlem tipi." }, { status: 400 });
    }

    if (result?.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json({ data: result?.data ?? null });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sunucu hatası." },
      { status: 500 }
    );
  }
}
