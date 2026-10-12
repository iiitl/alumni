import { ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const center = align === "center";

  const content = (
    <div className={center ? "text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div className={`mb-2.5 inline-flex ${center ? "justify-center" : ""}`}>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-brand/20 bg-brand-50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-brand dark:border-brand/30 dark:bg-brand-50/50">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-[1.2]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base leading-relaxed text-muted ${center ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
        >
          {description}
        </p>
      )}
    </div>
  );

  if (action && !center) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        {content}
        <div className="shrink-0">{action}</div>
      </div>
    );
  }

  return content;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-b border-border bg-surface/50 bg-student-grid ${className}`}
    >
      {/* Subtle campus blueprint accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-accent to-brand opacity-80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {eyebrow && (
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
            {eyebrow}
          </div>
        )}

        <div className={eyebrow ? "mt-3" : ""}>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3.5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}
        </div>

        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
