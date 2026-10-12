import Image from "next/image";
import Link from "next/link";
import { PageHeader, Section } from "@/components/Section";
import { Badge } from "@/components/Badge";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="memories"
        title="Campus & Community Gallery"
        description="Chak Ganjaria grounds, hackathon nights, cafeteria talks, and batch reunions across IIIT Lucknow history."
      />
      <Section className="py-8 sm:py-12">
        {/* Featured Campus Photo Card */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-background shadow-xs">
          <div className="relative aspect-[21/9] min-h-[260px] w-full overflow-hidden bg-surface sm:min-h-[360px]">
            <Image
              src="/iiitl-campus.png"
              alt="IIIT Lucknow Academic Block and Central Green Lawns, Chak Ganjaria"
              fill
              className="object-cover transition-transform duration-500 hover:scale-102"
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-amber-300 border border-white/20 mb-2">
                  <span>📍</span> Chak Ganjaria Landmark
                </span>
                <h2 className="font-sans text-2xl font-bold sm:text-3xl text-white">
                  Academic Block & Central Lawns
                </h2>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">
                  IIIT Lucknow Campus · Chak Ganjaria, Lucknow
                </p>
              </div>
              <span className="inline-flex self-start sm:self-auto items-center rounded-lg bg-black/40 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md border border-white/20">
                Permanent Campus
              </span>
            </div>
          </div>
        </div>

        {/* Community Submission Banner */}
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center sm:p-12">
          <Badge variant="brand" dot size="sm" className="mb-3">
            Community Archive
          </Badge>
          <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Have campus photos or reunion moments to share?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            We are curating a digital time capsule for all batches of IIIT Lucknow.
            Send your batch photos, club memories, and festival snapshots to be featured in the alumni archive.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-xs hover:bg-brand-700 transition-colors"
            >
              Submit photographs
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
