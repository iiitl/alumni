import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { events } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage(
  props: PageProps<"/events/[slug]">
) {
  const { slug } = await props.params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <article>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Link
            href="/events"
            className="text-sm font-medium text-brand hover:underline"
          >
            ← All events
          </Link>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand">
            {event.type}
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {event.title}
          </h1>
          <div className="mt-4 text-sm text-muted">
            {new Date(event.date).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {event.location}
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
              className="inline-flex h-11 items-center rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700"
            >
              RSVP
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-md border border-border bg-background px-6 text-sm font-semibold hover:border-brand hover:text-brand"
            >
              Add to calendar
            </button>
          </div>
        </div>
      </Section>
    </article>
  );
}
