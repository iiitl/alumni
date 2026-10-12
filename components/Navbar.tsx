"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/directory", label: "Directory" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/jobs", label: "Jobs" },
  { href: "/giving", label: "Give Back" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md transition-colors supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand logo & title */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
          onClick={closeMobileMenu}
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/IIITL_LOGO.svg"
              alt="IIIT Lucknow Alumni Network Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="font-serif text-lg font-bold tracking-tight text-foreground group-hover:text-brand transition-colors">
              IIITL Alumni
            </span>
            <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-muted">
              A COMMUNITY HUB FOR IIIT LUCKNOW
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main navigation">
          {navLinks.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href + "/"));

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${isActive
                    ? "bg-brand-50 text-brand font-semibold"
                    : "text-foreground/80 hover:bg-surface hover:text-brand"
                  }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Mobile menu toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden sm:inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-brand"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-brand-700 hover:shadow active:scale-95"
          >
            <span>Join Network</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-surface lg:hidden focus:outline-none focus:ring-2 focus:ring-brand/40 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background/98 backdrop-blur-md px-4 py-5 shadow-lg lg:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((l) => {
              const isActive =
                pathname === l.href ||
                (l.href !== "/" && pathname.startsWith(l.href + "/"));

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                      ? "bg-brand-50 text-brand font-semibold"
                      : "text-foreground hover:bg-surface hover:text-brand"
                    }`}
                >
                  <span>{l.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-border/80 pt-4 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="flex h-10 w-full items-center justify-center rounded-lg border border-border text-sm font-medium text-foreground transition-colors hover:bg-surface hover:text-brand"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={closeMobileMenu}
              className="flex h-10 w-full items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Join Network
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
