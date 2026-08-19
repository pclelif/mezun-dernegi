import type { Metadata } from "next";
import { BoardMemberCard } from "@/components/cards/board-member-card";
import { PageHero } from "@/components/shared/page-hero";
import { getBoardMembers } from "@/lib/supabase/queries";

export const metadata: Metadata = { title: "Yönetim ve Denetim Kurulu" };
export const dynamic = "force-dynamic";

export default async function BoardsPage() {
  let allMembers: Awaited<ReturnType<typeof getBoardMembers>> = [];
  try {
    allMembers = await getBoardMembers();
  } catch {
    allMembers = [];
  }

  const managementMembers = allMembers.filter((member) => member.board_type === "management");
  const auditMembers = allMembers.filter((member) => member.board_type === "audit");

  return (
    <>
      <PageHero
        eyebrow="DERNEĞİMİZİN KURULLARI"
        title="Yönetim ve Denetim Kurulu"
        description="Derneğimizin yönetim ve denetim çalışmalarını yürüten kurul üyelerimiz."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      <div className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16 space-y-10 md:space-y-12">
        <section aria-labelledby="management-board-heading">
          <div className="mb-5 border-b border-zinc-200 pb-3">
            <h2 id="management-board-heading" className="text-lg font-bold tracking-tight text-black md:text-xl">
              Yönetim Kurulu
            </h2>
          </div>
          {managementMembers.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {managementMembers.map((member) => (
                <BoardMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role ?? ""}
                  image={member.image_url ?? undefined}
                />
              ))}
            </div>
          ) : null}
        </section>

        <section aria-labelledby="audit-board-heading">
          <div className="mb-5 border-b border-zinc-200 pb-3">
            <h2 id="audit-board-heading" className="text-lg font-bold tracking-tight text-black md:text-xl">
              Denetim Kurulu
            </h2>
          </div>
          {auditMembers.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {auditMembers.map((member) => (
                <BoardMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role ?? ""}
                  image={member.image_url ?? undefined}
                />
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}
