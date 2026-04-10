import { PageHeader, Section } from "@/components/Section";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="What this is"
        description="A community-built hub for IIIT Lucknow alumni and students. A place for the IIITL family to find each other."
      />
      <Section className="py-16">
        <div className="max-w-3xl space-y-5 text-lg text-muted">
          <p>
            IIIT Lucknow is still a young institute, and there isn&apos;t a
            central alumni platform yet. As batches graduate and spread across
            companies, cities, and countries, it gets harder to stay in touch
            and harder for current students to learn from those who came
            before them.
          </p>
          <p>
            This site is a small attempt to fix that. It&apos;s a directory, a
            place to share events and news, a job board for alumni-posted
            roles, and a way for the IIITL community to support its own.
          </p>
          <p>
            It is built and maintained by{" "}
            <span className="font-medium text-foreground">Axios</span>, the
            Technical Society of IIIT Lucknow. Anyone from the IIITL community
            is welcome to contribute, suggest changes, or help run it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Why",
              body: "So that no IIITLite has to lose touch with their batch — and no current student has to figure out their career alone.",
            },
            {
              title: "Who it's for",
              body: "Every IIIT Lucknow graduate, current student, and faculty member. Verification is via IIITL email or roll number.",
            },
            {
              title: "Who runs it",
              body: "Volunteers from Axios — the Technical Society of IIITL. Open to contributions from anyone in the community.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="font-serif text-xl font-semibold">{b.title}</div>
              <p className="mt-3 text-sm text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
