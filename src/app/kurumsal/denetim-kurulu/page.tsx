import type { Metadata } from "next";
import { BoardMemberCard } from "@/components/cards/board-member-card";
import { PageHero } from "@/components/shared/page-hero";
import { auditBoardMembers } from "@/content/sample-data";

export const metadata: Metadata = { title: "Denetim Kurulu" };

export default function AuditBoardPage() {
  return (
    <>
      <PageHero title="Denetim Kurulu" description="Derneğimizin denetim çalışmalarını yürüten kurul üyeleri." />
      <section className="container-site section-space grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Denetim kurulu üyeleri">
        {auditBoardMembers.map((member) => <BoardMemberCard key={`${member.role}-${member.name}`} {...member} />)}
      </section>
    </>
  );
}
