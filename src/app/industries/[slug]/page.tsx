import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry, INDUSTRIES } from "../../content";
import NavLayout from "../../nav-layout";
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
} from "../../sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return { title: `AR agents for ${industry.name.toLowerCase()}`, description: industry.intro };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  return (
    <NavLayout>
      <section className="border-b border-slate-200 bg-gradient-to-b from-teal-50/60 to-white">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <Eyebrow>{industry.name}</Eyebrow>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{industry.headline}</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">{industry.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCta />
              <SecondaryCta href="#how-it-works">How it works</SecondaryCta>
            </div>
          </div>
          <CallTranscript
            lines={industry.sampleCall}
            caption={`Illustrative call with one of your ${industry.customers}.`}
          />
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The problem" title={`Following up with ${industry.customers} eats your week`} />
            <ul className="mt-6 space-y-3">
              {industry.painPoints.map((p) => (
                <li key={p} className="flex gap-3 text-slate-700">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-400" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="What the agents do" title="Consistent follow-up on every balance" />
            <div className="mt-6 space-y-4">
              {industry.useCases.map((u) => (
                <div key={u.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{u.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Texts that get paid"
            title={`Reach ${industry.customers} where they answer`}
            intro={`Most ${industry.customers} won't pick up for an unknown number, but they read texts. The messaging agent sends a short reminder with a secure pay link and handles replies.`}
          />
          <SmsPreview body={industry.sampleSms} />
        </Container>
      </section>

      <HowItWorks />
      <Guardrails />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Other industries" title="Also working receivables for" />
          <div className="mt-10">
            <IndustryGrid exclude={industry.slug} />
          </div>
        </Container>
      </section>

      <FinalCta title={`Put AR agents to work for your ${industry.customers}`} />
    </NavLayout>
  );
}
