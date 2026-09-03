import { UserRound } from "lucide-react";
import Image from "next/image";
import { Card } from "./card";

export type BoardMemberCardProps = {
  name: string;
  role: string;
  image?: string;
};

export function BoardMemberCard({ name, role, image }: BoardMemberCardProps) {
  return (
    <Card padding="none" className="w-full lg:w-[15.5rem]">
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        {image ? (
          <Image
            src={image}
            alt={`${name}, ${role}`}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          />
        ) : (
          <div className="grid size-full place-items-center bg-zinc-100 text-zinc-400" aria-hidden="true">
            <UserRound className="size-14 stroke-[1.25] md:size-16" />
          </div>
        )}
      </div>
      <div className="min-w-0 p-4 md:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-red-600 [overflow-wrap:anywhere]">{role}</p>
        <h2 className="mt-2 text-lg font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]">{name}</h2>
      </div>
    </Card>
  );
}
