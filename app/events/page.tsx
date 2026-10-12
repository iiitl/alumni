import { PageHeader, Section } from "@/components/Section";
import { EventCard } from "@/components/EventCard";
import { events } from "@/lib/data";

export const metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Alumni Events & Meetups"
        description="Reunions, fireside chats, regional meetups, and webinars organized by and for the IIIT Lucknow community."
      />
      <Section className="py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </Section>
    </>
  );
}
