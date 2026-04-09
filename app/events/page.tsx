import Link from "next/link";
import { PageHeader, Section } from "@/components/Section";
import { events } from "@/lib/data";

export const metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Alumni Events"
        description="Reunions, fireside chats, regional meetups, and webinars organized by and for the IIIT Lucknow community."
      />
      <Section className="py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((e) => (
            <Link
              key={e.slug}
              href={`/events/${e.slug}`}
              className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-brand"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-brand-50 px-2 py-1 font-medium text-brand">
                  {e.type}
                </span>
                <time className="text-muted">
                  {new Date(e.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-semibold group-hover:text-brand">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{e.location}</p>
              <p className="mt-3 text-sm text-foreground/80">{e.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
