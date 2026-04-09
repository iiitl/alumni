import { PageHeader, Section } from "@/components/Section";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Memories"
        title="Gallery"
        description="Photographs from reunions, events, campus moments, and milestones across IIITL history."
      />
      <Section className="py-12">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border border-dashed border-border bg-surface"
            />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Photo gallery coming soon. Have memories to share? Send them through
          the contact page.
        </p>
      </Section>
    </>
  );
}
