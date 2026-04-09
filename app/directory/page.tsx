import { PageHeader, Section } from "@/components/Section";
import { featuredAlumni } from "@/lib/data";

export const metadata = { title: "Alumni Directory" };

export default function DirectoryPage() {
  // Repeat the seed list a couple of times so the layout looks populated
  const directory = [...featuredAlumni, ...featuredAlumni, ...featuredAlumni];

  return (
    <>
      <PageHeader
        eyebrow="Network"
        title="Alumni Directory"
        description="Search and connect with verified IIIT Lucknow alumni across batches, branches, companies, and cities."
      />
      <Section className="py-12">
        <div className="rounded-xl border border-border bg-background p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-4">
            <input
              type="search"
              placeholder="Search by name, company, city…"
              className="h-10 rounded-md border border-border bg-background px-3 text-sm sm:col-span-2"
            />
            <select className="h-10 rounded-md border border-border bg-background px-3 text-sm">
              <option>All branches</option>
              <option>CSE</option>
              <option>IT</option>
              <option>ECE</option>
            </select>
            <select className="h-10 rounded-md border border-border bg-background px-3 text-sm">
              <option>All batches</option>
              <option>2015</option>
              <option>2016</option>
              <option>2017</option>
            </select>
          </div>
          <p className="mt-3 text-xs text-muted">
            Sign in to see contact details and message alumni directly.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {directory.map((a, i) => (
            <div
              key={`${a.name}-${i}`}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 font-serif text-xl font-semibold text-brand">
                  {a.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-serif text-lg font-semibold">
                    {a.name}
                  </div>
                  <div className="text-xs text-muted">
                    Batch of {a.batch} · {a.branch}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-foreground/80">
                {a.role}
                <br />
                <span className="text-muted">
                  {a.company} · {a.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
