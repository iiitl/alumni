import Link from "next/link";
import Image from "next/image";

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
      { href: "/news", label: "News" },
      { href: "/gallery", label: "Gallery" },
      { href: "/giving", label: "Give Back" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About this project" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/IIITL_LOGO.svg"
                alt="IIIT Lucknow Alumni Network Logo"
                width={36}
                height={36}
                className="rounded-md"
                style={{height: "auto" }}
              />
              <div className="font-serif text-lg font-semibold">
                IIITL Alumni
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              A community-built hub for IIIT Lucknow alumni and students. Not an
              official body — just a place to stay connected.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} IIITL Alumni — a community project.
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link href="/privacy" className="hover:text-brand">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-brand">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            Made with <span className="text-accent">♦</span> by{" "}
            <span className="font-semibold text-foreground">Axios</span> — The
            Technical Society of IIIT Lucknow
          </p>
        </div>
      </div>
    </footer>
  );
}
