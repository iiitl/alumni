import Image from "next/image";
import { PageHeader, Section } from "@/components/Section";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT"
        title="What this is"
        description="A community-built hub for IIIT Lucknow alumni and students. A place for the IIITL family to find each other."
      />

      <Section className="pt-6 pb-12 sm:pt-8 sm:pb-16">
        {/* Main story grid */}
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="space-y-3.5 text-base leading-relaxed text-muted lg:col-span-7">
            <p>
              IIIT Lucknow is still a young institute, and there isn&apos;t a central alumni platform yet. As batches graduate and spread across companies, cities, and countries, it gets harder to stay in touch and harder for current students to learn from those who came before them.
            </p>

            <p>
              This site is a small attempt to fix that. It&apos;s a directory, a place to share events and news, a job board for alumni-posted roles, and a way for the IIITL community to support its own.
            </p>

            <p>
              It is built and maintained by <strong className="text-foreground">Axios</strong>, the Technical Society of IIIT Lucknow. Anyone from the IIITL community is welcome to contribute, suggest changes, or help run it.
            </p>
          </div>

          {/* Student polaroid-style campus card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-background/95 p-3 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface">
                <Image
                  src="/iiitl-campus.png"
                  alt="IIIT Lucknow Academic Block and Lawns, Chak Ganjaria"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute top-2.5 right-2.5 rounded-md bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-xs">
                  estd. 2015
                </div>
              </div>
              <div className="p-2 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">
                    📍 Chak Ganjaria Campus
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    where it all started
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  From late-night hackathons to endless cafeteria chai talks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-6 transition-all hover:border-brand/50 hover:shadow-xs">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Why
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              So that no IIITLite has to lose touch with their batch — and no current student has to figure out their career alone.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 transition-all hover:border-brand/50 hover:shadow-xs">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Who it&apos;s for
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Every IIIT Lucknow graduate, current student, and faculty member. Verification is via IIITL email or roll number.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 transition-all hover:border-brand/50 hover:shadow-xs">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Who runs it
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Volunteers from Axios — the Technical Society of IIITL. Open to contributions from anyone in the community.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
