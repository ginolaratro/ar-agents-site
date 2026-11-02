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
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 py-3 text-[15px] font-medium text-white transition hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

export function SecondaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg border border-ink-200 bg-white px-5 py-3 text-[15px] font-medium text-ink-900 transition hover:border-ink-300 hover:bg-ink-50"
    >
      {children}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-700" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-medium leading-tight text-ink-900 sm:text-[2.75rem] sm:leading-[1.1]">{title}</h2>
      {intro && <p className="mt-4 text-lg text-ink-600">{intro}</p>}
    </div>
  );
}

export function CallTranscript({ lines, caption }: { lines: Industry["sampleCall"]; caption: string }) {
  return (
    <figure className="rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_1px_2px_rgba(8,9,10,0.04),0_12px_32px_-12px_rgba(35,84,145,0.18)]">
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-600" />
          </span>
          <span className="text-sm font-medium text-ink-800">Voice agent · live call</span>
        </div>
        <span className="text-xs text-ink-500">Example</span>
      </div>
      <ul className="mt-4 space-y-3">
        {lines.map((l, i) => (
          <li key={i} className={`flex ${l.who === "agent" ? "justify-start" : "justify-end"}`}>
            <p
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                l.who === "agent" ? "bg-brand-50 text-brand-950" : "bg-ink-100 text-ink-800"
              }`}
            >
              <span className="mb-0.5 block text-[11px] font-medium uppercase tracking-wide opacity-60">
                {l.who === "agent" ? "Agent" : "Customer"}
              </span>
              {l.text}
            </p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-xs text-ink-500">{caption}</figcaption>
    </figure>
  );
}

export function SmsPreview({ body }: { body: string }) {
  return (
    <div className="mx-auto w-full max-w-xs rounded-[2rem] border-8 border-ink-900 bg-ink-50 p-4 shadow-[0_24px_48px_-16px_rgba(8,9,10,0.25)]">
      <p className="text-center text-[11px] text-ink-500">Text message · Example</p>
      <p className="mt-3 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm text-ink-800 shadow-sm">{body}</p>
      <p className="ml-auto mt-3 w-fit rounded-2xl rounded-br-sm bg-brand-700 px-3.5 py-2 text-sm text-white">
        Can I do half now?
      </p>
      <p className="mt-3 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm text-ink-800 shadow-sm">
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
    <section id="how-it-works" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading
          center
          eyebrow="How it works"
          title="From aging report to paid, in four steps"
          intro="No new workflow for your staff. They only step in when a conversation needs a human."
        />
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-ink-200 bg-ink-50 p-6">
              <span className="text-sm font-medium text-brand-700">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-medium text-ink-900">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
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
    <section id="compliance" className="scroll-mt-20 border-y border-ink-200 bg-ink-50 py-24">
      <Container>
        <SectionHeading
          center
          eyebrow="Guardrails built in"
          title="Firm on balances, careful with people"
          intro="Your agents work inside the rules you set. They can't widen them."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUARDRAILS.map((g) => (
            <div key={g.title} className="rounded-2xl border border-ink-200 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700" aria-hidden>
                ✓
              </span>
              <h3 className="mt-5 text-lg font-medium text-ink-900">{g.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{g.body}</p>
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
          className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-[0_12px_32px_-12px_rgba(35,84,145,0.25)]"
        >
          <h3 className="text-lg font-medium text-ink-900">{i.name}</h3>
          <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{i.headline}</p>
          <p className="mt-6 text-sm font-medium text-brand-700">
            See how it works <span aria-hidden className="inline-block transition group-hover:translate-x-0.5">→</span>
          </p>
        </Link>
      ))}
    </div>
  );
}

export function FinalCta({ title = "Let the agents make the calls" }: { title?: string }) {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 max-w-2xl rounded-full bg-brand-600/40 blur-3xl"
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-medium leading-tight sm:text-[2.75rem] sm:leading-[1.1]">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-ink-300">
            Bring an aging report. We&apos;ll show you how agents would work it, in your voice and within your rules.
          </p>
          <a
            href={BRAND.demoHref}
            className="relative mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-ink-900 transition hover:bg-ink-100"
          >
            Book a demo <span aria-hidden>→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
