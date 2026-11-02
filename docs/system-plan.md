# AR Agents: system plan

How the product behind the marketing site works: AI text and voice agents that follow up on overdue invoices for many businesses at once, built to stay cheap.

> Status: plan, not built. Prices are rough estimates from late 2026; check current pricing before relying on them.

## Contents

1. [Build order](#1-build-order)
2. [Architecture](#2-architecture)
3. [Life of an invoice](#3-life-of-an-invoice)
4. [How a call is launched from the browser](#4-how-a-call-is-launched-from-the-browser)
5. [Multiple customers (multi-tenancy)](#5-multiple-customers-multi-tenancy)
6. [Costs](#6-costs)
7. [Database schema](#7-database-schema)
8. [Compliance checklist](#8-compliance-checklist)

---

## 1. Build order

1. **CSV upload + text message agent.** Start the 10DLC texting registration immediately, because carrier approval is the slowest step (weeks).
2. **Payment links with Stripe**, including installment plans with autopay.
3. **Voice agent** on a hosted platform (Retell or Vapi). Don't build voice infrastructure.
4. **Billing-system integration** (QuickBooks, Jobber, Buildium…) only once a paying pilot customer asks for one. CSV covers pilots.

---

## 2. Architecture

One app and one database serve every customer business.

```
                  ┌──────────────── App (Next.js on Vercel) ─────────────────────┐
 Business     →   │  Dashboard: upload CSV, set rules, approve replies, see $     │
 staff            │                                                               │
                  │  Scheduler (cron, every 5 min)                                │
                  │    "which invoices are due a touch now?" → send text / call   │
                  │                                                               │
                  │  Webhooks (incoming)                                          │
                  │    Twilio  → debtor replied by text → AI drafts/sends reply   │
                  │    Voice   → call finished → save transcript + outcome        │
                  │    Stripe  → payment made → mark paid, stop outreach          │
                  └───────────────┬───────────────────────────────────────────────┘
                                  │
          ┌───────────────┬───────┴───────┬────────────────┬──────────────────┐
          ▼               ▼               ▼                ▼                  ▼
     Postgres (Neon)   Twilio SMS     Voice platform   Stripe Connect     AI model
     every row tagged  one number     (Retell / Vapi)  money goes         small/cheap model
     with org_id       per business                    straight to each   via AI Gateway
                                                       business
```

| Piece | Choice | Why |
|---|---|---|
| App + API | Next.js on Vercel | Already used for the marketing site; pay only for active CPU |
| Database | Postgres (Neon, via Vercel Marketplace) | Free tier to start, scales to thousands of businesses |
| Scheduling | Vercel Cron every 5 min reading `next_action_at` | Simplest and nearly free; no separate queue service needed yet |
| Texting | Twilio (or Telnyx) | Programmable SMS, 10DLC registration per business |
| Voice | Retell or Vapi | Handles speech-to-text, AI turn-taking and voice; swap later if needed |
| Payments | Stripe Connect | Money goes directly to each business; you never hold funds |
| AI | Small model via Vercel AI Gateway; large model only for escalations | Text replies cost well under 1¢ |

---

## 3. Life of an invoice

1. Business uploads a CSV. Each invoice gets a `next_action_at` and cadence step 0.
2. Every 5 minutes the cron job selects invoices where `next_action_at <= now()` and `status = 'open'`.
3. For each, it runs **`canContact()`**: consent on file for that channel, inside the debtor's local quiet hours, under the weekly contact cap, not paused, not disputed. If blocked, push `next_action_at` forward. Never drop it.
4. Send the next step in the business's cadence (e.g. day 0 text, day 3 text, day 7 call, day 14 text).
5. Debtor replies by text → Twilio webhook → AI answers **only from that account's facts**, or creates an inbox task for staff (dispute, hardship, legal, anything uncertain).
6. Debtor pays → Stripe webhook → invoice marked paid, all future outreach cancelled.

---

## 4. How a call is launched from the browser

The browser never places the call. It asks **your server**, your server asks the **voice platform**, and the platform dials over the regular phone network.

```
 Staff clicks          Your server             Voice platform            Debtor's
 "Call now"            (Vercel)                (Retell / Vapi)           phone
     │── POST /api/calls ─▶│                        │                       │
     │                     │ canContact() checks    │                       │
     │                     │── create outbound ────▶│── dials ─────────────▶│ rings
     │◀── "calling…" ──────│    call (API key)      │◀══ live audio ═══════▶│
     │                     │◀── tool: get balance ──│                       │
     │                     │◀── tool: send link ────│                       │
     │                     │◀── call ended webhook ─│                       │
     │◀── shows result ────│ save transcript+outcome│                       │
```

- The **cron scheduler uses the same `/api/calls` code path**, so manual and automatic calls share one set of safety checks.
- **Tools** are endpoints on your server the agent can call mid-conversation: `get_balance`, `send_pay_link`, `record_promise_to_pay`, `escalate_to_staff`.
- **Never take card numbers by voice.** Text a Stripe link during the call instead (keeps you out of PCI scope).
- **In-browser voice** (via the Retell/Vapi web SDK and a short-lived session token from your server) is for staff testing their agent and for a "talk to our agent" demo on the marketing site. Put a time limit on public demos.

```ts
// app/api/calls/route.ts (sketch)
export async function POST(req: Request) {
  const { invoiceId } = await req.json();
  const org = await requireStaff(req);
  const inv = await getInvoice(org.id, invoiceId);

  const block = await canContact(inv, "voice");
  if (block) return Response.json({ error: block }, { status: 409 });

  const call = await voice.createPhoneCall({
    from: org.callerId,
    to: inv.customerPhone,
    agentId: org.voiceAgentId,
    variables: { name: inv.customerName, balance: inv.balance, business: org.name },
  });

  await db.contactAttempts.insert({
    orgId: org.id, invoiceId, channel: "voice", direction: "outbound",
    providerId: call.id, status: "dialing",
  });
  return Response.json({ callId: call.id });
}
```

---

## 5. Multiple customers (multi-tenancy)

- **One database, every row has `org_id`.** Every query is scoped by it (enforce with Postgres row-level security or a single query helper that requires `org_id`). New customer = new rows, not new servers.
- **Stripe Connect:** each business connects its own Stripe account; payments land there directly. Stripe handles payouts and tax forms.
- **10DLC per business:** each business you text for needs its own brand + campaign registration under your Twilio account. Small one-time fee plus a few dollars/month, approval takes days to weeks. Make it part of onboarding.
- **Idempotent webhooks:** Twilio, Stripe and the voice platform may deliver the same event twice. Store each provider event ID (`webhook_events` table, unique constraint) and skip repeats.
- **Real bottleneck:** carriers cap daily texts per registered brand. You'll hit that before any app limit, so spread outreach across the day.

---

## 6. Costs

**Fixed (before any customers): about $20–60/month**: Vercel Pro $20, Neon free → ~$20, domain ~$1.

| Variable item | Rough cost |
|---|---|
| Text message (Twilio + carrier fees) | ~1–1.5¢ each |
| Phone number | ~$1–2/month per business |
| AI reply to a text (small model) | well under 1¢ |
| AI voice call (platform + phone line) | ~7–15¢/minute |
| 10DLC registration | small one-time fee + a few $/month per business |
| Card payments (Stripe) | ~2.9% + 30¢, paid by the business, not you |

**Example business:** 300 overdue invoices/month, 3 texts each, 100 two-minute calls
→ texts ~$12 + calls ~$20 + AI & number ~$5 = **~$35–40/month cost**.
At $300–500/month (or a % of recovered), gross margin is roughly 85–90%.

**Cost rules:** lead with texts, use calls as a later cadence step; small models by default; cron over queue services; rent voice; no integrations until a paying customer needs one.

---

## 7. Database schema

Postgres. Money is stored in integer cents. Every tenant-owned table has `org_id`.

```sql
-- ─── Tenants & staff ────────────────────────────────────────────────

create table orgs (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  timezone              text not null default 'America/New_York',
  -- outreach rules (business can tighten, never loosen past legal limits)
  quiet_start           time not null default '20:00',   -- in debtor's local time
  quiet_end             time not null default '08:00',
  weekly_contact_cap    int  not null default 3,
  cadence               jsonb not null default '[{"day":0,"channel":"sms"},{"day":3,"channel":"sms"},{"day":7,"channel":"voice"},{"day":14,"channel":"sms"}]',
  plan_max_installments int  not null default 3,
  -- provider accounts
  stripe_account_id     text,          -- Stripe Connect account
  twilio_number         text,          -- E.164 sending number
  tendlc_status         text not null default 'not_started',  -- not_started | pending | approved | rejected
  voice_agent_id        text,          -- Retell/Vapi agent for this business
  caller_id             text,
  created_at            timestamptz not null default now()
);

create table staff (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references orgs(id),
  email       text not null unique,
  role        text not null default 'member',   -- owner | admin | member
  created_at  timestamptz not null default now()
);

-- ─── The people who owe money ────────────────────────────────────────

create table debtors (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references orgs(id),
  external_ref text,                 -- id from CSV / billing system
  name         text not null,
  phone        text,                 -- E.164
  email        text,
  timezone     text,                 -- derived from address/area code; falls back to org tz
  do_not_contact boolean not null default false,
  created_at   timestamptz not null default now(),
  unique (org_id, external_ref)
);

-- One row per channel grant. Revocation is a new timestamp, never a delete.
create table consents (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references orgs(id),
  debtor_id   uuid not null references debtors(id),
  channel     text not null,         -- sms | voice | email
  source      text not null,         -- e.g. 'signed service agreement 2026-03-02', 'web form'
  granted_at  timestamptz not null,
  revoked_at  timestamptz,           -- set on STOP / "don't call me"
  revoked_via text
);
create index on consents (debtor_id, channel) where revoked_at is null;

-- ─── Invoices & the outreach engine ──────────────────────────────────

create table invoices (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references orgs(id),
  debtor_id       uuid not null references debtors(id),
  number          text not null,
  description     text,
  amount_cents    int  not null,
  balance_cents   int  not null,
  due_date        date not null,
  status          text not null default 'open',  -- open | promised | plan | paid | disputed | paused | written_off
  cadence_step    int  not null default 0,
  next_action_at  timestamptz,                   -- null = nothing scheduled
  promised_date   date,
  created_at      timestamptz not null default now(),
  unique (org_id, number)
);
-- The cron job's only query:
create index invoices_due on invoices (next_action_at) where status = 'open' and next_action_at is not null;

-- Every text, call and email, both directions. One table so caps are easy to count.
create table contact_attempts (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references orgs(id),
  invoice_id    uuid references invoices(id),
  debtor_id     uuid not null references debtors(id),
  channel       text not null,        -- sms | voice | email
  direction     text not null,        -- outbound | inbound
  status        text not null,        -- queued | sent | delivered | failed | dialing | answered | voicemail | no_answer | completed
  sent_by       text not null,        -- agent | staff:<staff_id> | debtor
  body          text,                 -- SMS/email text
  provider_id   text,                 -- Twilio SID / voice call id
  duration_sec  int,                  -- voice only
  transcript    jsonb,                -- voice only: [{who, text, t}]
  recording_url text,                 -- voice only
  outcome       text,                 -- paid | promise | plan | dispute | hardship | wrong_person | callback | none
  cost_cents    int,                  -- provider cost, for per-org margin reporting
  created_at    timestamptz not null default now()
);
create index on contact_attempts (debtor_id, created_at);   -- weekly cap check
create index on contact_attempts (org_id, created_at);

-- ─── Payments ────────────────────────────────────────────────────────

create table payment_plans (
  id                  uuid primary key default gen_random_uuid(),
  org_id              uuid not null references orgs(id),
  invoice_id          uuid not null references invoices(id),
  installments        int  not null,
  installment_cents   int  not null,
  stripe_subscription_id text,
  status              text not null default 'active',  -- active | completed | defaulted | cancelled
  created_at          timestamptz not null default now()
);

create table payments (
  id                 uuid primary key default gen_random_uuid(),
  org_id             uuid not null references orgs(id),
  invoice_id         uuid not null references invoices(id),
  plan_id            uuid references payment_plans(id),
  amount_cents       int  not null,
  stripe_payment_id  text not null unique,
  status             text not null,   -- succeeded | failed | refunded
  paid_at            timestamptz not null default now()
);

-- ─── Humans in the loop ──────────────────────────────────────────────

-- Shared inbox: anything the AI shouldn't handle alone.
create table tasks (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references orgs(id),
  invoice_id      uuid references invoices(id),
  debtor_id       uuid references debtors(id),
  kind            text not null,     -- dispute | hardship | legal | approve_reply | callback | other
  summary         text not null,     -- AI-written summary
  suggested_reply text,
  status          text not null default 'open',  -- open | done | dismissed
  assigned_to     uuid references staff(id),
  created_at      timestamptz not null default now(),
  resolved_at     timestamptz
);

-- ─── Plumbing ────────────────────────────────────────────────────────

-- Idempotency: providers may send the same webhook twice.
create table webhook_events (
  provider     text not null,        -- stripe | twilio | voice
  event_id     text not null,
  received_at  timestamptz not null default now(),
  primary key (provider, event_id)
);

-- Append-only audit log. App role gets INSERT/SELECT only, no UPDATE/DELETE.
create table audit_log (
  id         bigserial primary key,
  org_id     uuid not null references orgs(id),
  actor      text not null,          -- agent | staff:<id> | system | debtor
  action     text not null,          -- e.g. 'invoice.paused', 'consent.revoked', 'sms.sent'
  subject    text,                   -- e.g. 'invoice:<id>'
  data       jsonb,
  created_at timestamptz not null default now()
);
```

**`canContact(invoice, channel)` reads:** `debtors.do_not_contact` → active row in `consents` for that channel → debtor's local time vs `orgs.quiet_start/end` → count of outbound `contact_attempts` in the last 7 days vs `orgs.weekly_contact_cap` → `invoices.status = 'open'`. Any failure returns a reason, and the scheduler moves `next_action_at` forward instead of sending.

---

## 8. Compliance checklist

Talk to a collections/TCPA lawyer for an hour or two before the first real call.

- **TCPA:** AI-generated voices count as "artificial voice" (FCC, 2024). You need prior express consent before automated calls; texts need consent and opt-out handling. Record the consent source per debtor and channel.
- **FDCPA / Reg F:** mainly for third-party collectors. Calling as the business, under the business's name, keeps you closer to first-party collections, but the line can blur. Get advice.
- **Opt-outs:** STOP (and variants) on text, "don't call me" on voice → revoke consent instantly and permanently.
- **Identity before details:** confirm you're talking to the right person before mentioning any debt.
- **Healthcare:** requires a HIPAA BAA with each practice and with your providers. Defer this vertical.
- **PCI:** never take card numbers by voice or text; always use Stripe-hosted payment links.
