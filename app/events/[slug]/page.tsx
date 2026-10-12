import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <article>
      <div className="relative overflow-hidden border-b border-border bg-surface/50 bg-student-grid">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-accent to-brand opacity-80" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-1 font-mono text-xs text-brand hover:underline cursor-pointer"
          >
            ← Back to all meetups
          </Link>
          <div className="mt-3">
            <span className="rounded bg-brand-50 px-2 py-0.5 font-mono text-xs font-semibold text-brand border border-brand/20">
              {event.type}
            </span>
          </div>
          <h1 className="mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {event.title}
          </h1>
          <div className="mt-3 font-mono text-xs text-muted flex flex-wrap items-center gap-2">
            <span>
              📅{" "}
              {new Date(event.date).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>·</span>
            <span>📍 {event.location}</span>
          </div>
        </div>
      </div>
      <Section className="py-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-foreground/80">{event.excerpt}</p>
          <p className="mt-6 text-muted">
            Full event details, agenda, speakers, and RSVP form will be added
            here. This is a placeholder page generated from the events dataset.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700 cursor-pointer"
            >
              RSVP
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-md border border-border bg-background px-6 text-sm font-semibold hover:border-brand hover:text-brand cursor-pointer"
            >
              Add to calendar
            </button>
          </div>
        </div>
      </Section>
    </article>
  );
}
