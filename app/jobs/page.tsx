import { PageHeader, Section } from "@/components/Section";
import { jobs } from "@/lib/data";

export const metadata = { title: "Jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Alumni Job Board"
        description="Roles and internships shared by IIIT Lucknow alumni — filtered for the IIITL family. Sign in to apply or post."
      />
      <Section className="py-12">
        <div className="space-y-4">
          {jobs.map((j, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-serif text-lg font-semibold">
                  {j.title}
                </div>
                <div className="mt-1 text-sm text-muted">
                  {j.company} · {j.location} ·{" "}
                  <span className="text-foreground/80">{j.type}</span>
                </div>
                <div className="mt-2 text-xs text-muted">
                  Posted by {j.postedBy}
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center rounded-md bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                View role
              </button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
