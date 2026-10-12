import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import { events, news, featuredAlumni } from "@/lib/data";
import { AlumniCard } from "@/components/AlumniCard";
import { EventCard } from "@/components/EventCard";
import { NewsCard } from "@/components/NewsCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface/30 bg-student-grid py-14 sm:py-20 lg:py-24">
        {/* Top subtle blueprint accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-accent to-brand opacity-75" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {/* Student badge banner */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/90 bg-blue-50/40 px-3.5 py-1 text-xs font-medium text-blue-900 shadow-2xs backdrop-blur-xs dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-blue-700 dark:bg-blue-400" />
                <span>A community project by Axios, IIITL</span>
              </div>

              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                A home for{" "}
                <span className="text-brand">IIIT Lucknow</span>{" "}
                alumni and students.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                IIITL doesn&apos;t have a central alumni platform yet. This is a
                community-built effort to bridge that gap — a space for graduates
                and current students to connect, share job opportunities, and
                stay in touch for life.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-brand-700 active:scale-95 cursor-pointer"
                >
                  Join the network
                </Link>
                <Link
                  href="/directory"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-2xs transition-all duration-150 hover:border-brand/60 hover:bg-surface active:scale-95 cursor-pointer"
                >
                  <span>Browse directory</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Student status highlights */}
              <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-dashed border-border/80 pt-5 font-mono text-xs text-muted sm:gap-7">
                <div>
                  <span className="font-bold text-foreground">500+</span> Alumni Grads
                </div>
                <div className="h-3 w-px bg-border" />
                <div>
                  <span className="font-bold text-foreground">Batches</span> &apos;15 → &apos;26
                </div>
                <div className="h-3 w-px bg-border" />
                <div>
                  <span className="font-bold text-foreground">CSE · IT · CSAI · CSB</span>
                </div>
              </div>
            </div>

            {/* Campus Polaroid Card with student stickers */}
            <div className="relative lg:col-span-5">
              <div className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-200 hover:shadow-md">
                {/* Campus Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                  <Image
                    src="/iiitl-campus.png"
                    alt="IIIT Lucknow Academic Campus and Green Lawns, Chak Ganjaria"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top campus badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-xs border border-white/20">
                      <span>📍</span> Chak Ganjaria Campus
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <div className="font-mono text-[10px] text-amber-300">
                        estd. 2015 · where it all started
                      </div>
                      <div className="font-sans text-base font-bold leading-tight text-white">
                        Academic Block &amp; Central Lawns
                      </div>
                    </div>
                    <span className="rounded bg-white/20 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-xs border border-white/30">
                      Axios Hub
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between pb-2.5 border-b border-dashed border-border/80 font-mono text-[11px]">
                    <span className="font-bold text-brand uppercase">
                      Campus Directory v1.0
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      open source ●
                    </span>
                  </div>

                  <ul className="mt-3 space-y-2 font-mono text-xs">
                    {[
                      { tag: "DIR", text: "Find seniors across Bengaluru, US & Europe" },
                      { tag: "REF", text: "Direct referral links posted by verified grads" },
                      { tag: "AMA", text: "Placement & grad-school advice from seniors" },
                      { tag: "MEM", text: "Chak Ganjaria memories, reunions & meetups" },
                    ].map((f) => (
                      <li key={f.tag} className="flex items-center gap-2 text-muted">
                        <span className="rounded bg-surface px-1.5 py-0.5 font-bold text-foreground border border-border text-[10px]">
                          {f.tag}
                        </span>
                        <span className="text-foreground/90">{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3.5 rounded-lg border border-dashed border-border/80 bg-surface/50 p-2.5 text-center font-mono text-[11px] text-muted">
                    ⚡ Built between lab deadlines &amp; 2 AM canteen chai sessions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Student Pillars */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 bg-blue-50/50 px-3 py-0.5 text-xs font-medium text-blue-900 shadow-2xs backdrop-blur-xs dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-700 dark:bg-blue-400" />
                  Our Mission
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[40px] leading-[1.18]">
                A lifelong community of builders, scholars, and leaders.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Built to ensure that the connections made during college grow
                stronger with every passing year.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {[
              {
                number: "01",
                title: "Connect",
                body: "Find batchmates, mentors, and alumni across cities and global tech hubs through the verified directory.",
              },
              {
                number: "02",
                title: "Hire",
                body: "Post open roles, refer talent, and discover internships with high-impact startups and leading engineering teams.",
              },
              {
                number: "03",
                title: "Contribute",
                body: "Support student innovation, competitive programming, research grants, and need-based scholarships.",
              },
              {
                number: "04",
                title: "Celebrate",
                body: "Annual reunions, founders nights, city meetups, and celebrating milestones together across batches.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group relative rounded-2xl border border-border bg-background p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-xs"
              >
                <div className="font-mono text-xs font-bold text-brand">
                  {p.number}
                </div>
                <div className="mt-2.5 font-serif text-xl font-bold text-foreground">
                  {p.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Upcoming events */}
      <section className="border-y border-border bg-surface/40 bg-student-grid py-16 sm:py-20">
        <Section>
          <SectionHeading
            eyebrow="Campus & City Meetups"
            title="Events on the calendar"
            description="Reunions, placement AMAs, and city chai meetups — organized by students and alumni."
            action={
              <Link
                href="/events"
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-brand hover:text-brand-700 transition-colors cursor-pointer"
              >
                <span>View all events</span>
                <span>→</span>
              </Link>
            }
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </Section>
      </section>

      {/* Featured alumni */}
      <Section className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 bg-blue-50/50 px-3 py-0.5 text-xs font-medium text-blue-900 shadow-2xs backdrop-blur-xs dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-700 dark:bg-blue-400" />
                Spotlight
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[40px] leading-[1.18]">
              Alumni doing remarkable work
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              A glimpse of the global IIITL family making impact across tech,
              research, and entrepreneurship.
            </p>
          </div>
          <Link
            href="/directory"
            className="inline-flex items-center gap-1 font-medium text-xs text-brand hover:text-brand-700 transition-colors cursor-pointer shrink-0"
          >
            <span>Explore full directory</span>
            <span>→</span>
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAlumni.map((a) => (
            <AlumniCard key={a.name} alumnus={a} />
          ))}
        </div>
      </Section>

      {/* News */}
      <section className="border-y border-border bg-surface/40 bg-student-grid py-16 sm:py-20">
        <Section>
          <SectionHeading
            eyebrow="Campus Wire"
            title="Latest stories & campus notes"
            description="Milestones, hackathon wins, and stories from the IIIT Lucknow student and alumni community."
            action={
              <Link
                href="/news"
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-brand hover:text-brand-700 transition-colors cursor-pointer"
              >
                <span>All announcements</span>
                <span>→</span>
              </Link>
            }
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {news.map((n) => (
              <NewsCard key={n.slug} news={n} />
            ))}
          </div>
        </Section>
      </section>

      {/* Student Project / Fuel Prototypes Banner */}
      <Section className="py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand via-brand-700 to-slate-900 p-7 text-white shadow-sm sm:p-10">
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-0.5 font-mono text-xs font-medium text-amber-300 border border-white/20">
                ⚡ Axios Student Innovation
              </span>
              <h2 className="mt-3.5 font-sans text-2xl font-bold tracking-tight sm:text-3xl">
                Fuel student hackathons, prototypes, and conference travel.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
                Help student teams from Equinox hackathons, open source projects,
                and research scholars presenting papers. 100% goes directly to student
                activities on campus.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/giving"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 font-mono text-xs font-bold text-slate-950 shadow-xs transition-all hover:bg-amber-400 active:scale-95 cursor-pointer"
              >
                Support Causes
              </Link>
              <Link
                href="/directory"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 font-mono text-xs font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20 cursor-pointer"
              >
                Find Grads
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
