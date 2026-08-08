import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <article className={`border border-zinc-200 bg-white p-5 shadow-sm ${className}`}>{children}</article>;
}
