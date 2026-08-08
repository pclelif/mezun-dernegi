import Image from "next/image";

type Props = { fullName: string; role: string; imageUrl?: string };

export function BoardMemberCard({ fullName, role, imageUrl }: Props) {
  return <article className="overflow-hidden rounded-lg border border-[#6C757D]/20 bg-white">{imageUrl ? <div className="relative aspect-[4/5]"><Image src={imageUrl} alt={`${fullName} portresi`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" /></div> : <div className="aspect-[4/5] bg-[#F1F3F5]" aria-hidden="true" />}<div className="p-5"><h2 className="text-lg font-bold">{fullName}</h2><p className="mt-1 text-sm text-[#6C757D]">{role}</p></div></article>;
}
