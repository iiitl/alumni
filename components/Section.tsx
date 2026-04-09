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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <div
          className={`text-xs font-semibold uppercase tracking-[0.18em] text-brand ${
            center ? "" : ""
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base text-muted ${
            center ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
