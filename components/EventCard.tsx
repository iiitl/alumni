import Link from "next/link";
import { EventItem } from "@/lib/data";
import { Badge, BadgeProps } from "@/components/Badge";

export interface EventCardProps {
  event: EventItem;
  className?: string;
}

export function EventCard({ event, className = "" }: EventCardProps) {
  const eventDate = new Date(event.date);
  const monthStr = eventDate.toLocaleDateString("en-US", { month: "short" });
  const dayStr = eventDate.toLocaleDateString("en-US", { day: "numeric" });
  const fullDateStr = eventDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const badgeVariant: BadgeProps["variant"] =
    event.type === "Reunion"
      ? "accent"
      : event.type === "Meetup"
        ? "brand"
        : "surface";

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <Badge variant={badgeVariant} dot>
            {event.type}
          </Badge>
          <time className="text-xs font-medium text-muted" dateTime={event.date}>
            {fullDateStr}
          </time>
        </div>

        <div className="mt-4 flex items-start gap-4">
          <div className="hidden sm:flex flex-col items-center justify-center rounded-lg border border-border/80 bg-surface px-3 py-2 text-center min-w-[54px] shrink-0 font-mono">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
              {monthStr}
            </span>
            <span className="text-xl font-bold leading-none text-foreground">
              {dayStr}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
              {event.title}
            </h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <svg
                className="h-3.5 w-3.5 shrink-0 text-muted/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-foreground/80 line-clamp-3 leading-relaxed">
          {event.excerpt}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-brand transition-colors group-hover:text-brand-700">
        <span>View event details</span>
        <svg
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}
