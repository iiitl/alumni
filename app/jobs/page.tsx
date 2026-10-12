import { PageHeader, Section } from "@/components/Section";
import { JobCard } from "@/components/JobCard";
import { jobs } from "@/lib/data";

export const metadata = { title: "Jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="CAREERS"
        title="Alumni Job Board"
        description="Roles and internships shared by IIIT Lucknow alumni — filtered for the IIITL family. Sign in to apply or post."
      />
      <Section className="py-8 sm:py-12">
        <div className="space-y-4">
          {jobs.map((j, i) => (
            <JobCard key={`${j.company}-${i}`} job={j} />
          ))}
        </div>
      </Section>
    </>
  );
}
