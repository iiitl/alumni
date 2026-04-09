import Link from "next/link";
import { PageHeader, Section } from "@/components/Section";
import { news } from "@/lib/data";

export const metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="From the desk"
        title="News & Announcements"
        description="Updates from the IIIT Lucknow community — alumni milestones, student initiatives, and notes from the campus."
      />
      <Section className="py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-brand"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                {n.category}
              </div>
              <h3 className="mt-3 font-serif text-xl font-semibold group-hover:text-brand">
                {n.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{n.excerpt}</p>
              <div className="mt-4 text-xs text-muted">
                {new Date(n.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
