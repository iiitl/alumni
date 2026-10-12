import Link from "next/link";
import { NewsItem } from "@/lib/data";
import { Badge, BadgeProps } from "@/components/Badge";

export interface NewsCardProps {
  news: NewsItem;
  className?: string;
}

export function NewsCard({ news, className = "" }: NewsCardProps) {
  const formattedDate = new Date(news.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const categoryVariant: BadgeProps["variant"] =
    news.category === "Spotlight"
      ? "accent"
      : news.category === "Announcement"
        ? "brand"
        : "surface";

  return (
    <Link
      href={`/news/${news.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <Badge variant={categoryVariant} dot>
            {news.category}
          </Badge>
          <time className="text-xs text-muted" dateTime={news.date}>
            {formattedDate}
          </time>
        </div>

        <h3 className="mt-3.5 font-sans text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
          {news.title}
        </h3>

        <p className="mt-3 text-sm text-foreground/80 line-clamp-3 leading-relaxed">
          {news.excerpt}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-brand transition-colors group-hover:text-brand-700">
        <span>Read article</span>
        <svg
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}
