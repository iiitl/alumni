import { PageHeader, Section } from "@/components/Section";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Get in touch"
        description="Questions, feedback, or want to help run this? Drop us a note."
      />
      <Section className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <form className="space-y-4 rounded-xl border border-border bg-background p-6">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={5}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Send message
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-serif text-lg font-semibold">
                Who runs this
              </div>
              <p className="mt-2 text-sm text-muted">
                This site is a community project by{" "}
                <span className="font-medium text-foreground">Axios</span> —
                the Technical Society of IIIT Lucknow. Reach out through the
                form and a volunteer will get back to you.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-serif text-lg font-semibold">
                Want to help?
              </div>
              <p className="mt-2 text-sm text-muted">
                This is a volunteer-run project. If you&apos;re an IIIT Lucknow
                student or alumnus and want to contribute — writing, design,
                code, outreach — drop a note here.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
