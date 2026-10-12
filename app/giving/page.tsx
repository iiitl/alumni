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
    body: "Travel grants and lab equipment for undergraduate research across CSE, IT, and CSAI.",
  },
];

export default function GivingPage() {
  return (
    <>
      <PageHeader
        eyebrow="GIVE BACK"
        title="Causes alumni can support"
        description="Ideas for how IIITL alumni might one day contribute to current students. These are placeholders — real causes, accounting, and donation flow will be set up before this page goes live."
      />
      <Section className="py-8 sm:py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {causes.map((c) => (
            <div
              key={c.title}
              className="flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-xs"
            >
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>

              <div className="mt-6 rounded-lg border border-dashed border-border py-2 text-center text-xs text-muted">
                Coming soon
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
