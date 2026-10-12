import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { news } from "@/lib/data";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export default async function NewsDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <article>
      <div className="relative overflow-hidden border-b border-border bg-surface/50 bg-student-grid">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-accent to-brand opacity-80" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 font-mono text-xs text-brand hover:underline cursor-pointer"
          >
            ← Back to campus wire
          </Link>
          <div className="mt-3">
            <span className="rounded bg-brand-50 px-2 py-0.5 font-mono text-xs font-semibold text-brand border border-brand/20">
              {item.category}
            </span>
          </div>
          <h1 className="mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {item.title}
          </h1>
          <div className="mt-3 font-mono text-xs text-muted">
            📅{" "}
            {new Date(item.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
      <Section className="py-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-foreground/80">{item.excerpt}</p>
          <p className="mt-6 text-muted">
            Full article body, embedded media, and author byline will live
            here. This is a placeholder generated from the news dataset.
          </p>
        </div>
      </Section>
    </article>
  );
}
