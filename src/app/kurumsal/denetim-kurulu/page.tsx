import type { Metadata } from "next";
import { ContentPage } from "@/components/shared/content-page";

export const metadata: Metadata = { title: "Denetim Kurulu" };

export default function AuditBoardPage() {
  return <ContentPage title="Denetim Kurulu" description="Derneğimizin denetim çalışmalarını yürüten kurul üyeleri." />;
}
