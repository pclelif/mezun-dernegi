import Image from "next/image";
import { Card } from "./card";

type BoardMemberCardProps = { fullName: string; role: string; imageUrl?: string };

export function BoardMemberCard({ fullName, role, imageUrl }: BoardMemberCardProps) {
  return <Card className="p-0">{imageUrl && <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100"><Image src={imageUrl} alt={`${fullName} portresi`} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" /></div>}<div className="p-5"><h2 className="text-lg font-bold text-zinc-950">{fullName}</h2><p className="mt-1 text-sm text-zinc-600">{role}</p></div></Card>;
}
