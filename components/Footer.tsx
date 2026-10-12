import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/Badge";

const cols: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Network",
    links: [
      { href: "/directory", label: "Alumni Directory" },
      { href: "/jobs", label: "Job Board" },
    ],
  },
  {
    title: "Engage",
    links: [
      { href: "/events", label: "Events" },
      { href: "/news", label: "News & Stories" },
      { href: "/gallery", label: "Photo Gallery" },
      { href: "/giving", label: "Give Back" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About this project" },
      { href: "/contact", label: "Contact & Feedback" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-border bg-surface/50 bg-student-grid">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background ring-1 ring-border shadow-2xs">
                <Image
                  src="/IIITL_LOGO.svg"
                  alt="IIIT Lucknow Alumni Network Logo"
                  width={34}
                  height={34}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <div className="font-sans text-base font-bold tracking-tight text-foreground">
                  IIITL Alumni Hub
                </div>
                <div className="font-mono text-[10px] text-muted">
                  ⚡ Axios Society · Chak Ganjaria
                </div>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted">
              A community-built hub for IIIT Lucknow alumni and students.
              Connecting graduates, sharing opportunities, and preserving memories across batches.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="brand" dot size="sm">
                Maintained by Axios Society
              </Badge>
              <span className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[11px] text-muted shadow-2xs">
                <span>⚡</span> student open source
              </span>
            </div>

            <p className="text-xs text-muted/80 pt-0.5">
              📍 Chak Ganjaria Campus, Lucknow · Built by students
            </p>
          </div>

          {/* Navigation columns */}
          {cols.map((col) => (
            <div key={col.title} className="space-y-3.5">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brand/50" />
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted transition-all duration-150 hover:text-brand hover:translate-x-0.5"
                    >
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row">
          <p className="text-xs text-muted text-center sm:text-left">
            © {new Date().getFullYear()} IIITL Alumni — an open community project. Not an official college body.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
            <Link href="/privacy" className="hover:text-brand transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-brand transition-colors">
              Contact
            </Link>
            <a
              href="https://github.com/iiitl/alumni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted hover:border-brand/40 hover:text-foreground transition-all shadow-2xs"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Society Credit & Hostel Project Note */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-border/50 pt-5 text-center text-xs text-muted sm:flex-row">
          <p className="flex items-center justify-center gap-1.5">
            <span>Crafted with</span>
            <span className="text-amber-500 font-bold">☕</span>
            <span>& late nights by</span>
            <span className="font-semibold text-foreground">Axios</span>
            <span>— The Technical Society of IIIT Lucknow</span>
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="rounded bg-background/80 px-2 py-0.5 border border-border/70">
              v1.0 (student beta)
            </span>
            <span>·</span>
            <span>CSE · IT · CSAI · CSB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
