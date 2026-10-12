import Link from "next/link";
import { AlumnusItem } from "@/lib/data";

export interface AlumniCardProps {
  alumnus: AlumnusItem;
  className?: string;
}

export function AlumniCard({ alumnus, className = "" }: AlumniCardProps) {
  const initials = alumnus.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-sm ${className}`}
    >
      {/* Top identity strip */}
      <div className="flex items-start gap-3.5">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50/70 font-mono text-sm font-bold text-brand ring-1 ring-brand/20 transition-transform duration-150 group-hover:scale-105 dark:bg-brand-50/20">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
            {alumnus.name}
          </h3>
          <div className="mt-1 flex items-center font-mono text-[11px]">
            <span className="inline-flex items-center rounded-md bg-surface px-2 py-0.5 font-medium text-muted border border-border">
              Batch &apos;{alumnus.batch.slice(-2)} · {alumnus.branch}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-dashed border-border/80 pt-3.5">
        <div className="flex items-start gap-2">
          <svg
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground leading-snug">
              {alumnus.role}
            </div>
            <div className="text-xs text-muted">
              at {alumnus.company}
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1 text-[11px]">
            <svg
              className="h-3.5 w-3.5 text-muted shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{alumnus.city}</span>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-1 font-medium text-xs text-brand hover:text-brand-700 transition-colors cursor-pointer"
          >
            <span>Connect</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
