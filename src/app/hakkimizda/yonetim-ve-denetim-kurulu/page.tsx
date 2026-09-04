import type { Metadata } from "next";
import { BoardMemberCard } from "@/components/cards/board-member-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { associationName } from "@/config/site";
import { getBoardMembers } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim ve Denetim Kurulu",
  description: `${associationName} Yönetim ve Denetim Kurulu asil ve yedek üyeleri listesi.`,
  alternates: {
    canonical: "/hakkimizda/yonetim-ve-denetim-kurulu",
  },
  openGraph: {
    title: `Yönetim ve Denetim Kurulu | ${associationName}`,
    description: `${associationName} Yönetim ve Denetim Kurulu asil ve yedek üyeleri listesi.`,
    url: "/hakkimizda/yonetim-ve-denetim-kurulu",
  },
};

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
      <BreadcrumbJsonLd
        items={[
          { name: "Hakkımızda", href: "/hakkimizda/dernek-hakkinda" },
          { name: "Yönetim ve Denetim Kurulu", href: "/hakkimizda/yonetim-ve-denetim-kurulu" },
        ]}
      />
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
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:flex lg:flex-wrap lg:justify-start">
              {managementMembers.map((member) => (
                <BoardMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role ?? ""}
                  image={member.image_url ?? undefined}
                  imageCrop={member.image_crop}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-zinc-500">
              Henüz yönetim kurulu üyesi eklenmemiş.
            </p>
          )}
        </section>

        <section aria-labelledby="audit-board-heading">
          <div className="mb-5 border-b border-zinc-200 pb-3">
            <h2 id="audit-board-heading" className="text-lg font-bold tracking-tight text-black md:text-xl">
              Denetim Kurulu
            </h2>
          </div>
          {auditMembers.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:flex lg:flex-wrap lg:justify-start">
              {auditMembers.map((member) => (
                <BoardMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role ?? ""}
                  image={member.image_url ?? undefined}
                  imageCrop={member.image_crop}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-zinc-500">
              Henüz denetim kurulu üyesi eklenmemiş.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
