import { NextResponse } from "next/server";
import { ADMIN_MUTATION_TABLES, isAdminUser } from "@/lib/supabase/admin-auth";
import { createServerSessionClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSessionClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !isAdminUser(user)) {
      return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
    }

    const body = await request.json();
    const { table, action, data, match, onConflict } = body as {
      table?: string;
      action?: string;
      data?: Record<string, unknown> | Record<string, unknown>[];
      match?: Record<string, unknown>;
      onConflict?: string;
    };

    if (!table || !action) {
      return NextResponse.json({ error: "Eksik parametre." }, { status: 400 });
    }

    if (!ADMIN_MUTATION_TABLES.has(table)) {
      return NextResponse.json({ error: "Bu tablo için işlem yasak." }, { status: 403 });
    }

    let result;

    if (action === "insert") {
      result = await supabase.from(table).insert(data ?? {}).select();
    } else if (action === "upsert") {
      result = await supabase.from(table).upsert(data ?? {}, { onConflict }).select();
    } else if (action === "update") {
      result = await supabase
        .from(table)
        .update((data as Record<string, unknown>) ?? {})
        .match(match || {})
        .select();
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
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
