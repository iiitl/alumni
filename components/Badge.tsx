import { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "brand" | "accent" | "surface" | "outline" | "success";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "brand",
  size = "sm",
  dot = false,
  className = "",
}: BadgeProps) {
  const variantStyles = {
    brand: "bg-brand-50 text-brand border-brand/20",
    accent: "bg-accent/15 text-accent-600 border-accent/30",
    surface: "bg-surface text-muted border-border",
    outline: "bg-background text-foreground/80 border-border",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  }[variant];

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs font-semibold",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide transition-colors ${variantStyles} ${sizeStyles} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${variant === "accent"
              ? "bg-accent"
              : variant === "brand"
                ? "bg-brand"
                : variant === "success"
                  ? "bg-emerald-500"
                  : "bg-muted"
            }`}
        />
      )}
      {children}
    </span>
  );
}
