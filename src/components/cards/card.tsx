import type { HTMLAttributes, ReactNode } from "react";

type CardProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  children: ReactNode;
  padding?: "default" | "none";
};

const paddingClasses = {
  default: "p-5 md:p-6",
  none: "p-0",
} as const;

export function Card({ children, className = "", padding = "default", ...props }: CardProps) {
  return (
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-zinc-300 hover:shadow-md focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20 motion-reduce:transition-none ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
