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
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Link
            href="/news"
            className="text-sm font-medium text-brand hover:underline"
          >
            ← All news
          </Link>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-600">
            {item.category}
          </div>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <div className="mt-4 text-sm text-muted">
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
