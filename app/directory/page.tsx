import { PageHeader, Section } from "@/components/Section";
import { AlumniCard } from "@/components/AlumniCard";
import { featuredAlumni } from "@/lib/data";

export const metadata = { title: "Alumni Directory" };

export default function DirectoryPage() {
  // Repeat the seed list a couple of times so the layout looks populated
  const directory = [...featuredAlumni, ...featuredAlumni, ...featuredAlumni];

  return (
    <>
      <PageHeader
        eyebrow="directory"
        title="Alumni & Grads Directory"
        description="Search by batch, branch, company, or city. Connect with seniors for mock interviews, grad school advice, or off-campus referrals."
      />
      <Section className="py-8 sm:py-12">
        {/* Search & Filter Bar */}
        <div className="rounded-xl border border-border bg-background p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search seniors by name, company (Google, Uber...), city, or role…"
                className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select className="h-10 rounded-lg border border-border bg-background px-3 font-mono text-xs text-foreground/90 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer">
                <option>All branches</option>
                <option>CSE</option>
                <option>IT</option>
                <option>CSAI</option>
                <option>CSB</option>
              </select>

              <select className="h-10 rounded-lg border border-border bg-background px-3 font-mono text-xs text-foreground/90 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer">
                <option>All batches</option>
                <option>Batch &apos;24</option>
                <option>Batch &apos;23</option>
                <option>Batch &apos;22</option>
                <option>Batch &apos;21</option>
                <option>Batch &apos;20</option>
                <option>Batch &apos;19</option>
                <option>Batch &apos;18</option>
                <option>Batch &apos;17</option>
              </select>
            </div>
          </div>

          <div className="mt-3.5 border-t border-dashed border-border/80 pt-3 text-xs text-muted sm:text-sm">
            Sign in to see contact details and message alumni directly.
          </div>
        </div>

        {/* Directory Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {directory.map((a, i) => (
            <AlumniCard key={`${a.name}-${i}`} alumnus={a} />
          ))}
        </div>
      </Section>
    </>
  );
}
