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
    members = all.filter((member) => member.board_type === "management");
  } catch {
    members = [];
  }

  return (
    <>
      <PageHero
        eyebrow="DERNEĞİMİZİN KURULLARI"
        title="Yönetim Kurulu"
        description="Derneğimizin yönetim ve denetim çalışmalarını yürüten kurul üyelerimiz."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      {members.length > 0 ? (
        <section className="container-site section-space grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Yönetim kurulu üyeleri">
          {members.map((member) => (
            <BoardMemberCard
              key={member.id}
              name={member.name}
              role={member.role ?? ""}
              image={member.image_url ?? undefined}
            />
          ))}
        </section>
      ) : null}
    </>
  );
}
