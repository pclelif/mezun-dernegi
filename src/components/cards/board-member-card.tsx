import Image from "next/image";

type Props = { fullName: string; role: string; imageUrl?: string };

export function BoardMemberCard({ fullName, role, imageUrl }: Props) {
  return <article className="overflow-hidden rounded-2xl border border-black/10 bg-white">{imageUrl ? <div className="relative aspect-[4/5]"><Image src={imageUrl} alt={`${fullName} portresi`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" /></div> : <div className="aspect-[4/5] bg-[#f6f4ee]" aria-hidden="true" />}<div className="p-5"><h2 className="text-lg font-bold">{fullName}</h2><p className="mt-1 text-sm text-[#647068]">{role}</p></div></article>;
}
