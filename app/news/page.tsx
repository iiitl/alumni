import { PageHeader, Section } from "@/components/Section";
import { NewsCard } from "@/components/NewsCard";
import { news } from "@/lib/data";

export const metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="From the desk"
        title="News & Announcements"
        description="Updates from the IIIT Lucknow community — alumni milestones, student initiatives, research grants, and notes from campus."
      />
      <Section className="py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.slug} news={n} />
          ))}
        </div>
      </Section>
    </>
  );
}
