import Image from "next/image";
import { Card } from "./card";

type BoardMemberCardProps = { fullName: string; role: string; imageUrl?: string };

export function BoardMemberCard({ fullName, role, imageUrl }: BoardMemberCardProps) {
  return <Card padding="none">{imageUrl && <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100"><Image src={imageUrl} alt={`${fullName} portresi`} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw" /></div>}<div className="min-w-0 p-5 md:p-6"><h2 className="text-lg font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]">{fullName}</h2><p className="mt-1 text-sm leading-6 text-zinc-600 [overflow-wrap:anywhere]">{role}</p></div></Card>;
}
