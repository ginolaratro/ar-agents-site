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
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-base font-semibold tracking-tight text-slate-900">
            <span className="text-teal-700">●</span> {BRAND.name}
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <Link href="/#agents" className="hover:text-slate-950">Agents</Link>
            <Link href="/#how-it-works" className="hover:text-slate-950">How it works</Link>
            <Link href="/#industries" className="hover:text-slate-950">Industries</Link>
            <Link href="/#compliance" className="hover:text-slate-950">Guardrails</Link>
          </nav>
          <div className="flex items-center gap-2">
            {BRAND.appUrl && (
              <a href={`${BRAND.appUrl}/login`} className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                Sign in
              </a>
            )}
            <a
              href={BRAND.demoHref}
              className="rounded-lg bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Book a demo
            </a>
          </div>
        </Container>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-slate-50 py-12 text-sm text-slate-600">
        <Container className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-900">{BRAND.name}</p>
            <p className="mt-2 max-w-xs">{BRAND.tagline}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Industries</p>
            <ul className="mt-2 space-y-1.5">
              {INDUSTRIES.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="hover:text-slate-900">{i.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Company</p>
            <ul className="mt-2 space-y-1.5">
              <li><a href={BRAND.demoHref} className="hover:text-slate-900">Book a demo</a></li>
              {BRAND.appUrl && (
                <li><a href={`${BRAND.appUrl}/login`} className="hover:text-slate-900">Customer sign in</a></li>
              )}
            </ul>
          </div>
        </Container>
        <Container className="mt-10">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. Conversations shown on this site are illustrative examples.
          </p>
        </Container>
      </footer>
    </div>
  );
}
