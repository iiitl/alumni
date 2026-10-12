import { PageHeader, Section } from "@/components/Section";
import { Badge } from "@/components/Badge";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="feedback"
        title="Contact & Student Discussions"
        description="Got an idea for the platform, spotted a bug, or want to volunteer with the Axios team? Drop us a note."
      />
      <Section className="py-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <form className="space-y-4 rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-xs">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Aarav Sharma"
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                Email Address
              </label>
              <input
                type="email"
                placeholder="aarav@alumni.iiitl.ac.in"
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Share your thoughts, batch details, or how you would like to help…"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-brand-700 hover:shadow active:scale-95 cursor-pointer"
            >
              Send message
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
              <Badge variant="brand" dot size="sm" className="mb-2">
                Stewards
              </Badge>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Who runs this platform
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                This site is a community project maintained by{" "}
                <span className="font-medium text-foreground">Axios</span> — the
                Technical Society of IIIT Lucknow. Reach out through the form
                and a society volunteer will get back to you promptly.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
              <Badge variant="accent" dot size="sm" className="mb-2">
                Join Us
              </Badge>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Want to contribute?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                This is an open, volunteer-run project. If you&apos;re an IIIT
                Lucknow student or alumnus and want to help with frontend,
                backend, design, or alumni outreach, we&apos;d love to collaborate.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
