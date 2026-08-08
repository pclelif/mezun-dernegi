import Link from "next/link";

type ButtonLinkProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" };

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const style = variant === "primary" ? "bg-[#143d2b] text-white" : "border border-[#143d2b] text-[#143d2b]";
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 font-bold transition hover:opacity-85 ${style}`}>{children}</Link>;
}
