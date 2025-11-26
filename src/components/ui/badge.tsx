import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "accent";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
  secondary:
    "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
  destructive:
    "border-transparent bg-red-500 text-white",
  outline:
    "border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))]",
  accent:
    "border-transparent bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";

export { Badge };


