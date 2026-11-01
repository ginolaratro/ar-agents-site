// All brand copy and industry data. Swap names/slugs here; no layout code needs to change.

export const BRAND = {
  name: "AR Reminders",
  tagline: "AI agents that call and text your past-due customers, so you get paid.",
  // NEXT_PUBLIC_DEMO_URL: where "Book a demo" goes (Calendly, HubSpot, etc.)
  demoHref: process.env.NEXT_PUBLIC_DEMO_URL ?? "mailto:sales@example.com?subject=Demo%20request",
  // NEXT_PUBLIC_APP_URL: your app's address. "Sign in" appears only when set.
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "",
};

export type Industry = {
  slug: string;
  name: string;
  customers: string;
  headline: string;
  intro: string;
  painPoints: string[];
  useCases: { title: string; body: string }[];
  sampleCall: { who: "agent" | "customer"; text: string }[];
  sampleSms: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare & dental",
    customers: "patients",
    headline: "Collect patient balances without tying up your front desk",
    intro:
      "Patient responsibility keeps growing while staff time shrinks. Our agents follow up on every open balance by phone and text, in your practice's voice, and hand off anything clinical or insurance-related to your team.",
    painPoints: [
      "Front-desk staff spend hours each week on balance calls",
      "Statements go unread and balances age past 90 days",
      "Patients have insurance questions your billing team needs to see",
    ],
    useCases: [
      { title: "Post-visit balance reminders", body: "Friendly texts with a secure pay link a few days after the EOB posts." },
      { title: "Aging-balance calls", body: "Voice agents call 60+ day balances, offer a payment plan and take payment on the spot." },
      { title: "Insurance hand-offs", body: "Questions about coverage or claims are flagged and routed to your billing staff, never guessed at." },
    ],
    sampleCall: [
      { who: "agent", text: "Hi, this is the billing assistant calling for Riverside Family Dental. Is this Jordan?" },
      { who: "customer", text: "Yes, this is Jordan." },
      { who: "agent", text: "Thanks, Jordan. You have a $184 balance from your March visit. Would you like to take care of it today, or set up a few smaller payments?" },
      { who: "customer", text: "Can I split it up?" },
      { who: "agent", text: "Of course. I can do three payments of about $61. I'll text you a secure link to set that up now." },
    ],
    sampleSms:
      "Hi Jordan, this is Riverside Family Dental. You have a balance of $184.00. Pay or set up a plan here: pay.example.com/r/8hd2. Reply STOP to opt out.",
  },
  {
    slug: "property-management",
    name: "Property management",
    customers: "tenants",
    headline: "Rent reminders and past-due follow-up on autopilot",
    intro:
      "Late rent is a cash-flow problem and a staffing problem. Our agents remind tenants before rent is due, follow up the day it's late, and set up payment arrangements within the rules you define.",
    painPoints: [
      "Property managers chase the same late payers every month",
      "Tenants ignore portal notifications and email",
      "Payment arrangements get agreed verbally and never tracked",
    ],
    useCases: [
      { title: "Pre-due reminders", body: "A text three days before rent is due cuts late payments before they start." },
      { title: "Late-rent follow-up", body: "Agents call and text on day one, explain late fees, and take payment by link." },
      { title: "Tracked arrangements", body: "Partial-payment plans are recorded and followed up automatically." },
    ],
    sampleCall: [
      { who: "agent", text: "Hi, this is the leasing office assistant for Maple Court Apartments. Am I speaking with Sam?" },
      { who: "customer", text: "Yeah, that's me." },
      { who: "agent", text: "Hi Sam, a quick call about November rent, which still shows $1,450 open. Are you able to pay today?" },
      { who: "customer", text: "I get paid Friday. Can I pay then?" },
      { who: "agent", text: "That works. I've noted Friday the 8th and will text you a payment link that morning." },
    ],
    sampleSms:
      "Hi Sam, Maple Court Apartments here. November rent of $1,450 is now past due. Pay securely: pay.example.com/r/k3m9. Reply STOP to opt out.",
  },
  {
    slug: "home-services",
    name: "Home services & contractors",
    customers: "customers",
    headline: "Get paid for the job without chasing invoices",
    intro:
      "The work is done, the invoice is out, and the money hasn't arrived. Our agents follow up on open invoices by text and phone so your techs can stay on the next job.",
    painPoints: [
      "Owners chase invoices at night after a full day of jobs",
      "Customers 'forget' once the work is finished",
      "Small invoices aren't worth a person's time to follow up",
    ],
    useCases: [
      { title: "Same-day invoice texts", body: "A pay link goes out when the job closes, while the customer is happy." },
      { title: "Overdue invoice calls", body: "Agents call at 15 and 30 days past due and take card payment over a secure link." },
      { title: "Dispute routing", body: "Complaints about the work go straight to the owner instead of a collections script." },
    ],
    sampleCall: [
      { who: "agent", text: "Hi, I'm calling from Summit Plumbing about invoice 2207 for the water heater install. Is this Alex?" },
      { who: "customer", text: "Yes. I thought I paid that." },
      { who: "agent", text: "I'm showing $640 still open. I'll text you a link with the invoice so you can check it, and pay there if it's still due." },
      { who: "customer", text: "Okay, send it over." },
    ],
    sampleSms:
      "Hi Alex, Summit Plumbing here. Invoice #2207 ($640.00) is 15 days past due. View and pay: pay.example.com/r/p4x1. Reply STOP to opt out.",
  },
  {
    slug: "b2b",
    name: "B2B & wholesale",
    customers: "accounts",
    headline: "Shorten DSO with agents that work your AR aging report",
    intro:
      "Your AR team can't call every account every week. Our agents work the long tail: confirming invoices were received, finding the right AP contact, and getting a payment date on record.",
    painPoints: [
      "Invoices sit in AP inboxes with no owner",
      "Collectors spend their day on small balances instead of key accounts",
      "Promise-to-pay dates live in someone's notes",
    ],
    useCases: [
      { title: "Invoice receipt confirmation", body: "Agents confirm the invoice reached AP and capture any missing PO numbers." },
      { title: "Promise-to-pay capture", body: "Payment dates are logged automatically and followed up if they slip." },
      { title: "Escalation to your team", body: "Disputes, short-pays and strategic accounts route to a named collector." },
    ],
    sampleCall: [
      { who: "agent", text: "Hi, I'm calling from Northline Supply's accounts receivable team about invoice 10482. Is this accounts payable?" },
      { who: "customer", text: "It is. Let me look it up. We're waiting on the PO number." },
      { who: "agent", text: "The PO is 55-1931. I'll email it over with a copy of the invoice. Once that's in, when should we expect payment?" },
      { who: "customer", text: "Our next run is the 15th." },
      { who: "agent", text: "Great, I've noted the 15th. Thanks for your help." },
    ],
    sampleSms:
      "Northline Supply AR: invoice 10482 ($3,210.00) was due Oct 30. Copy of invoice and payment options: pay.example.com/r/n7c4. Reply STOP to opt out.",
  },
  {
    slug: "professional-services",
    name: "Professional services",
    customers: "clients",
    headline: "Protect client relationships while you collect what you're owed",
    intro:
      "Law firms, accountants and agencies hate making collection calls to clients they want to keep. Our agents handle the reminders politely and consistently, and know when to step back and loop you in.",
    painPoints: [
      "Partners avoid awkward conversations about overdue fees",
      "Retainer top-ups slip and work continues unbilled",
      "Follow-up is inconsistent from client to client",
    ],
    useCases: [
      { title: "Polite invoice reminders", body: "Courteous, on-brand texts and calls that keep the relationship intact." },
      { title: "Retainer replenishment", body: "Automatic reminders when a retainer balance drops below your threshold." },
      { title: "Payment plans within your rules", body: "Offer installments you've pre-approved; anything else goes to a partner." },
    ],
    sampleCall: [
      { who: "agent", text: "Hi, this is the billing assistant for Hart & Lowe. Is this Taylor?" },
      { who: "customer", text: "Speaking." },
      { who: "agent", text: "A quick courtesy call: the September statement for $2,400 is past due. Would it help to split it over two months?" },
      { who: "customer", text: "That would help, yes." },
      { who: "agent", text: "Done. I'll text you a link to confirm the plan." },
    ],
    sampleSms:
      "Hi Taylor, Hart & Lowe billing here. Your September statement ($2,400.00) is past due. Pay or set up a plan: pay.example.com/r/h2l8. Reply STOP to opt out.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
