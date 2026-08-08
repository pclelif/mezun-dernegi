import Link from "next/link";

export function ButtonLink({ href, children, variant = "primary" }) {
  return <Link href={href} className={`button button--${variant}`}>{children}</Link>;
}
