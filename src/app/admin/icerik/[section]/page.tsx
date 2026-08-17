import { notFound } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { contentSections, isContentSection } from "@/config/content";
import { createServerSessionClient } from "@/lib/supabase/server";

export default async function ContentPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: key } = await params;
  if (!isContentSection(key)) notFound();
  const definition = contentSections[key];
  const supabase = await createServerSessionClient();
  const { data } = await supabase.from("site_content").select("content").eq("section", key).maybeSingle();
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold text-zinc-950">{definition.title}</h1><p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{definition.description}</p></div><ContentEditor sectionKey={key} section={definition} initial={(data?.content as Record<string, string> | null) ?? {}} /></div>;
}
