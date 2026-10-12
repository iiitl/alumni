export interface JobCardProps {
  job: {
    title: string;
    company: string;
    location: string;
    type: string;
    postedBy: string;
  };
  className?: string;
}

export function JobCard({ job, className = "" }: JobCardProps) {
  return (
    <div
      className={`group flex flex-col justify-between gap-4 rounded-xl border border-border bg-background p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-sm sm:flex-row sm:items-center ${className}`}
    >
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="rounded bg-brand-50 px-2 py-0.5 font-semibold text-brand border border-brand/20">
            {job.type}
          </span>
          <span className="rounded bg-surface px-2 py-0.5 text-muted border border-border">
            📍 {job.location}
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-xl">
          {job.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="font-semibold text-foreground">{job.company}</span>
          <span>·</span>
          <span>Posted by {job.postedBy}</span>
        </div>
      </div>

      <div className="shrink-0 pt-2 sm:pt-0">
        <button
          type="button"
          className="inline-flex h-9 w-full sm:w-auto items-center justify-center rounded-lg bg-brand px-4 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-700 cursor-pointer"
        >
          View role
        </button>
      </div>
    </div>
  );
}
