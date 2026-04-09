import { PageHeader, Section } from "@/components/Section";

export const metadata = { title: "Give Back" };

const causes = [
  {
    title: "Student Innovation Fund",
    body: "Seed funding for student-led prototypes, hackathons, and early-stage product ideas.",
  },
  {
    title: "Need-based Scholarships",
    body: "Tuition and living-expense support for students from under-resourced backgrounds.",
  },
  {
    title: "Research Grants",
    body: "Travel grants and lab equipment for undergraduate research across CSE, IT, and ECE.",
  },
];

export default function GivingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Give Back"
        title="Causes alumni can support"
        description="Ideas for how IIITL alumni might one day contribute to current students. These are placeholders — real causes, accounting, and donation flow will be set up before this page goes live."
      />
      <Section className="py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {causes.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="font-serif text-xl font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-muted">{c.body}</p>
              <button
                type="button"
                disabled
                className="mt-5 inline-flex h-10 w-full cursor-not-allowed items-center justify-center rounded-md border border-dashed border-border text-sm font-medium text-muted"
              >
                Coming soon
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          Donations are not yet accepted. When we wire up a proper account and
          reporting, this page will be the place.
        </div>
      </Section>
    </>
  );
}
