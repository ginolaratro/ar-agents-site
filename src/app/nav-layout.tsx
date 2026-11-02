import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BRAND, INDUSTRIES } from "./content";
import { Container } from "./sections";

export const marketingMetadata: Metadata = {
  title: { default: `${BRAND.name}: AI agents for accounts receivable`, template: `%s · ${BRAND.name}` },
  description: BRAND.tagline,
};

export default function NavLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-20 border-b border-ink-200/70 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-[17px] font-medium tracking-tight text-ink-900">
            <span className="text-brand-700">●</span> {BRAND.name}
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-ink-700 md:flex">
            <Link href="/#agents" className="hover:text-ink-950">Agents</Link>
            <Link href="/#how-it-works" className="hover:text-ink-950">How it works</Link>
            <Link href="/#industries" className="hover:text-ink-950">Industries</Link>
            <Link href="/#compliance" className="hover:text-ink-950">Guardrails</Link>
          </nav>
          <div className="flex items-center gap-2">
            {BRAND.appUrl && (
              <a href={`${BRAND.appUrl}/login`} className="rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-ink-100">
                Sign in
              </a>
            )}
            <a
              href={BRAND.demoHref}
              className="rounded-lg bg-brand-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-800"
            >
              Book a demo
            </a>
          </div>
        </Container>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-ink-200 bg-white py-16 text-sm text-ink-600">
        <Container className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-medium text-ink-900">{BRAND.name}</p>
            <p className="mt-2 max-w-xs">{BRAND.tagline}</p>
          </div>
          <div>
            <p className="font-medium text-ink-900">Industries</p>
            <ul className="mt-2 space-y-1.5">
              {INDUSTRIES.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="hover:text-ink-900">{i.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-ink-900">Company</p>
            <ul className="mt-2 space-y-1.5">
              <li><a href={BRAND.demoHref} className="hover:text-ink-900">Book a demo</a></li>
              {BRAND.appUrl && (
                <li><a href={`${BRAND.appUrl}/login`} className="hover:text-ink-900">Customer sign in</a></li>
              )}
            </ul>
          </div>
        </Container>
        <Container className="mt-10">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} {BRAND.name}. Conversations shown on this site are illustrative examples.
          </p>
        </Container>
      </footer>
    </div>
  );
}
