import type { Metadata } from "next";
import { BRAND, INDUSTRIES } from "./content";
import NavLayout from "./nav-layout";
import {
  CallTranscript,
  Container,
  Eyebrow,
  FinalCta,
  Guardrails,
  HowItWorks,
  IndustryGrid,
  PrimaryCta,
  SecondaryCta,
  SectionHeading,
  SmsPreview,
} from "./sections";

export const metadata: Metadata = {
  title: `${BRAND.name}: AI agents for accounts receivable`,
  description: BRAND.tagline,
};

const HERO_CALL = INDUSTRIES.find((i) => i.slug === "home-services")!.sampleCall;
const HERO_SMS = INDUSTRIES.find((i) => i.slug === "property-management")!.sampleSms;

const AGENTS = [
  {
    name: "Voice agent",
    title: "Calls customers like your best collector would",
    body: "Natural phone conversations that confirm the balance, answer common questions, offer the payment plans you allow, and text a secure pay link mid-call.",
    points: ["Outbound calls on your cadence", "Takes promise-to-pay dates", "Leaves compliant voicemails"],
  },
  {
    name: "Messaging agent",
    title: "Texts and emails that people actually answer",
    body: "Short, friendly reminders with a one-tap pay link. When customers reply, the agent responds in seconds, or drafts a reply for your team to approve.",
    points: ["SMS and email", "Two-way replies, 24/7", "STOP / opt-out handled automatically"],
  },
  {
    name: "Payments",
    title: "One link to pay in full or set up a plan",
    body: "Customers verify their identity, then pay by card or enroll in installments within limits you set. Autopay handles the rest.",
    points: ["Pay in full or in part", "Installment plans with autopay", "Every payment reconciled to the account"],
  },
];

export default function HomePage() {
  return (
    <NavLayout>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-teal-50/60 to-white">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Eyebrow>AI agents for accounts receivable</Eyebrow>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Agents that call and text your past-due customers, so you get paid.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              {BRAND.name} works your aging report around the clock. AI voice and messaging agents follow up on every open
              balance, take payment, set up plans, and hand the hard conversations to your team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCta />
              <SecondaryCta href="#how-it-works">See how it works</SecondaryCta>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              <li>✓ Phone, SMS and email</li>
              <li>✓ Your brand, your rules</li>
              <li>✓ Humans approve the exceptions</li>
            </ul>
          </div>
          <CallTranscript lines={HERO_CALL} caption="Illustrative call. Agents identify the business they're calling for." />
        </Container>
      </section>

      <section id="agents" className="scroll-mt-20 py-20">
        <Container>
          <SectionHeading
            eyebrow="Meet the agents"
            title="A collections team that never runs out of hours"
            intro="Every open balance gets consistent, polite follow-up on the channel your customer actually answers."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {AGENTS.map((a) => (
              <div key={a.name} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-teal-700">{a.name}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{a.body}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-teal-700" aria-hidden>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Two-way messaging"
              title="Reminders that turn into payments"
              intro="Customers reply to texts with questions. Agents answer instantly with the facts on the account. Anything outside the rules goes to your inbox with a summary and a suggested reply."
            />
            <ul className="mt-6 space-y-3 text-slate-700">
              <li>• Pay links that open straight to the balance after a quick identity check</li>
              <li>• Replies in seconds, day or night, within your quiet hours for outbound</li>
              <li>• Staff approve, edit or take over any conversation</li>
            </ul>
          </div>
          <SmsPreview body={HERO_SMS} />
        </Container>
      </section>

      <HowItWorks />

      <section id="industries" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Built for any business that sends invoices"
            intro="Same agents, tuned to how your customers expect to be spoken to."
          />
          <div className="mt-10">
            <IndustryGrid />
          </div>
        </Container>
      </section>

      <Guardrails />
      <FinalCta />
    </NavLayout>
  );
}
