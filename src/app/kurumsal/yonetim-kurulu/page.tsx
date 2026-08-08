import type { Metadata } from "next";
import { BoardMemberCard } from "@/components/cards/board-member-card";
import { PageHero } from "@/components/shared/page-hero";
import { boardMembers } from "@/content/sample-data";

export const metadata: Metadata = { title: "Yönetim Kurulu" };

export default function BoardPage() {
  return (
    <>
      <PageHero title="Yönetim Kurulu" description="Derneğimiz için gönüllü olarak çalışan yönetim ekibimiz." />
      <section className="container-site section-space grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Yönetim kurulu üyeleri">
        {boardMembers.map((member) => <BoardMemberCard key={`${member.role}-${member.name}`} {...member} />)}
      </section>
    </>
  );
}
