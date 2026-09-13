import { NextResponse } from "next/server";
import { validateAndSanitizeContactInput } from "@/lib/contact/validate-contact-message";
import { createServerAnonClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Geçersiz JSON gövdesi." }, { status: 400 });
    }

    const validated = validateAndSanitizeContactInput(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const supabase = createServerAnonClient();
    const { error } = await supabase.from("contact_messages").insert({
      ...validated.data,
      is_read: false,
    });

    if (error) {
      return NextResponse.json(
        { error: "Mesaj kaydedilemedi. Lütfen daha sonra tekrar deneyin." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
