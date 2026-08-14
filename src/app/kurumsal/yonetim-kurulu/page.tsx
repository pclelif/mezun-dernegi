import type { Metadata } from "next";
import { BoardMemberCard } from "@/components/cards/board-member-card";
import { PageHero } from "@/components/shared/page-hero";
import { getBoardMembers } from "@/lib/supabase/queries";

export const metadata: Metadata = { title: "Yönetim Kurulu" };
export const dynamic = "force-dynamic";

export default async function BoardPage() {
  let members: Awaited<ReturnType<typeof getBoardMembers>> = [];
  try {
    const all = await getBoardMembers();
    members = all.filter((member) => !/denetim/i.test(member.role ?? ""));
  } catch {
    members = [];
  }

  return (
    <>
      <PageHero title="Yönetim Kurulu" description="Derneğimiz için gönüllü olarak çalışan yönetim ekibimiz." />
      <section className="container-site section-space grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Yönetim kurulu üyeleri">
        {members.length === 0 ? (
          <p className="col-span-full rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Yönetim kurulu üyeleri henüz eklenmemiş.
          </p>
        ) : (
          members.map((member) => (
            <BoardMemberCard
              key={member.id}
              name={member.name}
              role={member.role ?? ""}
              image={member.image_url ?? undefined}
            />
          ))
        )}
      </section>
    </>
  );
}
