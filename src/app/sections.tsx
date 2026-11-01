import Link from "next/link";
import type { ReactNode } from "react";
import { BRAND, INDUSTRIES, type Industry } from "./content";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PrimaryCta({ children = "Book a demo" }: { children?: ReactNode }) {
  return (
    <a
      href={BRAND.demoHref}
      className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}

export function SecondaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">{children}</p>;
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
      {intro && <p className="mt-3 text-lg text-slate-600">{intro}</p>}
    </div>
  );
}

export function CallTranscript({ lines, caption }: { lines: Industry["sampleCall"]; caption: string }) {
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-600" />
          </span>
          <span className="text-sm font-medium text-slate-800">Voice agent · live call</span>
        </div>
        <span className="text-xs text-slate-500">Example</span>
      </div>
      <ul className="mt-4 space-y-3">
        {lines.map((l, i) => (
          <li key={i} className={`flex ${l.who === "agent" ? "justify-start" : "justify-end"}`}>
            <p
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                l.who === "agent" ? "bg-teal-50 text-teal-950" : "bg-slate-100 text-slate-800"
              }`}
            >
              <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wide opacity-60">
                {l.who === "agent" ? "Agent" : "Customer"}
              </span>
              {l.text}
            </p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-xs text-slate-500">{caption}</figcaption>
    </figure>
  );
}

export function SmsPreview({ body }: { body: string }) {
  return (
    <div className="mx-auto w-full max-w-xs rounded-[2rem] border-8 border-slate-900 bg-slate-50 p-4 shadow-lg">
      <p className="text-center text-[11px] text-slate-500">Text message · Example</p>
      <p className="mt-3 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm">{body}</p>
      <p className="ml-auto mt-3 w-fit rounded-2xl rounded-br-sm bg-teal-600 px-3.5 py-2 text-sm text-white">
        Can I do half now?
      </p>
      <p className="mt-3 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm">
        Yes! Use the same link and pick &ldquo;Pay part now&rdquo;. We&apos;ll remind you about the rest.
      </p>
    </div>
  );
}

const STEPS = [
  { title: "Connect your receivables", body: "Upload an aging report or sync from your billing system. Balances, contacts and consent come in together." },
  { title: "Set the rules", body: "Choose channels, cadence, quiet hours, payment-plan limits and the tone your agents use." },
  { title: "Agents call and text", body: "AI agents reach out, answer common questions, take payment by secure link and set up plans." },
  { title: "Your team handles exceptions", body: "Disputes, hardship and anything unusual land in a shared inbox with a summary, ready for a person." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From aging report to paid, in four steps"
          intro="No new workflow for your staff. They only step in when a conversation needs a human."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

const GUARDRAILS = [
  { title: "Consent first", body: "Agents only call or text contacts with a consent record. Opt-outs are honored instantly and permanently." },
  { title: "Quiet hours", body: "Outreach waits for the customer's local daytime window. Deferred, never dropped." },
  { title: "Frequency caps", body: "Weekly contact limits per customer, so nobody feels hounded." },
  { title: "Approved language", body: "Templates are checked against a banned-phrase list before they're saved and again before sending." },
  { title: "Human hand-off", body: "Disputes, hardship and legal questions are flagged for your staff instead of answered by AI." },
  { title: "Full audit trail", body: "Every call, message, payment and staff action is logged and can't be edited after the fact." },
];

export function Guardrails() {
  return (
    <section id="compliance" className="scroll-mt-20 bg-slate-900 py-20 text-white">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">Guardrails built in</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Firm on balances, careful with people</h2>
          <p className="mt-3 text-lg text-slate-300">Your agents work inside the rules you set. They can&apos;t widen them.</p>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {GUARDRAILS.map((g) => (
            <div key={g.title}>
              <h3 className="font-semibold text-teal-200">{g.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{g.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function IndustryGrid({ exclude }: { exclude?: string }) {
  const items = INDUSTRIES.filter((i) => i.slug !== exclude);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <Link
          key={i.slug}
          href={`/industries/${i.slug}`}
          className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal-600 hover:shadow-sm"
        >
          <h3 className="font-semibold text-slate-900 group-hover:text-teal-800">{i.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{i.headline}</p>
          <p className="mt-4 text-sm font-medium text-teal-700">
            See how it works <span aria-hidden>→</span>
          </p>
        </Link>
      ))}
    </div>
  );
}

export function FinalCta({ title = "Let the agents make the calls" }: { title?: string }) {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-2xl bg-teal-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-teal-50">
            Bring an aging report. We&apos;ll show you how agents would work it, in your voice and within your rules.
          </p>
          <a
            href={BRAND.demoHref}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-50"
          >
            Book a demo
          </a>
        </div>
      </Container>
    </section>
  );
}
