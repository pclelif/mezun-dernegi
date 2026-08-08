import type { ComponentProps, ReactNode } from "react";

type InputProps = ComponentProps<"input"> & { label: string; hint?: string };
type TextareaProps = ComponentProps<"textarea"> & { label: string; hint?: string };
type SelectProps = ComponentProps<"select"> & { label: string; children: ReactNode; hint?: string };

const controlClass = "min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base font-normal text-zinc-950 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/15";

function FieldLabel({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-semibold text-zinc-900"><span>{label}</span>{children}{hint && <span className="text-xs font-normal leading-5 text-zinc-500">{hint}</span>}</label>;
}

export function FormInput({ label, hint, className = "", ...props }: InputProps) {
  return <FieldLabel label={label} hint={hint}><input className={`${controlClass} ${className}`} {...props} /></FieldLabel>;
}

export function FormTextarea({ label, hint, className = "", ...props }: TextareaProps) {
  return <FieldLabel label={label} hint={hint}><textarea className={`${controlClass} min-h-32 resize-y ${className}`} {...props} /></FieldLabel>;
}

export function FormSelect({ label, hint, children, className = "", ...props }: SelectProps) {
  return <FieldLabel label={label} hint={hint}><select className={`${controlClass} ${className}`} {...props}>{children}</select></FieldLabel>;
}
