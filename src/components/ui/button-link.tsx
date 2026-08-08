import Link from "next/link";

type ButtonLinkProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" };

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const style = variant === "primary" ? "bg-[#EC1C24] text-white" : "border border-[#EC1C24] text-[#EC1C24]";
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 font-semibold transition hover:opacity-85 ${style}`}>{children}</Link>;
}
