import Image from "next/image";

export function BoardMemberCard({ fullName, role, imageUrl }) {
  return (
    <article className="content-card">
      {imageUrl && <Image src={imageUrl} alt={`${fullName} portresi`} width={400} height={500} />}
      <h2 className="content-card__title">{fullName}</h2>
      <p className="content-card__description">{role}</p>
    </article>
  );
}
