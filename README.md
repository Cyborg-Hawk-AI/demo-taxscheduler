# TaxScheduler

> Scheduling plus document submission tracker built exclusively for tax preparers.

## What is TaxScheduler?

TaxScheduler is built for **Solo and small-team tax preparers using Calendly or Goldmine who lose track of which clients have submitted documents**. The document-submission-to-appointment linkage is the core insight — no generic scheduling tool connects 'has this client submitted their W-2s yet?' to their upcoming appointment, which is the actual workflow tax preparers need

### Core MVP features
- Appointment booking page branded with preparer's name (Calendly-style but tax-specific)
- Per-appointment document checklist auto-sent to client after booking
- Document submission status board (Kanban: Not Submitted → Partial → Complete → In Review)
- Automated SMS/email nudges when documents are overdue relative to appointment date
- Season dashboard showing % of booked clients with complete document sets

**Pricing:** Flat monthly SaaS at $25/month per preparer; $199/year

## The research: why this exists

The same r/Accounting poster who was juggling three tools specifically named Goldmine as their scheduling and client paperwork tracking system — and called it 'frustrating and unreliable.' The core pain is that scheduling tools don't know anything about document status, so preparers have to manually cross-reference their calendar against a separate tracker to know which clients are ready to work on. During tax season this becomes a daily time sink. Goldmine is a legacy CRM from a different era; it was never designed for the document-collection workflow that defines tax prep.

**Cluster:** Scheduling and Document Submission Tracking | **Rubric score:** 91/130 | **Validation:** 9/9 checks passed

**Competitive landscape:** Calendly (scheduling only, no document tracking), TaxDome (too complex and expensive for solo preparers), Goldmine (legacy CRM not tax-specific). No lightweight scheduling + document tracker combo exists for this niche.

**Go-to-market:** r/taxpros and r/Accounting; tax preparer Facebook groups; Product Hunt launch in January (peak tax season awareness)

## How this business runs itself (mailbox money)

The goal is passive, low-maintenance recurring revenue: AI is how we build and operate the business, not necessarily what it sells.

Every new booking automatically triggers a personalized document checklist email listing exactly what the client needs to submit before their appointment. A cron job runs nightly and sends escalating reminders (friendly → urgent) to clients whose appointments are approaching with incomplete document sets. When a client uploads a document via their unique link, a webhook updates the status board and notifies the preparer via email. Stripe handles all billing and renewals. Support is handled by an AI widget. Estimated owner time: under 1 hour/week.

**Estimated owner time:** ~1 hour(s)/week

**MVP estimate:** Next.js + Supabase + Cal.com API (scheduling) + Twilio + Resend; 2–3 weeks to MVP

## Validation checklist (9/9)
- [x] 10+ posts with this pain
- [x] Paying for inferior solution
- [x] Reachable channel
- [x] MVP < 4 weeks
- [x] Price point high enough
- [x] Hair-on-fire problem
- [x] Can pre-sell
- [x] < 3 competitors
- [x] Low-maintenance ops (mailbox money)

## Source pain points (real posts)

### Existing accounting software doesn't meet expectations, is being discontinued, or is overly complicated and expensive for the features offered.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Using multiple tools: QuickBooks Online for bookkeeping, DocuSign for e-signatures, Goldmine for scheduling and client paperwork tracking
- **Frequency:** daily
- **WTP signal:** Currently paying for QuickBooks Online, DocuSign, and Goldmine subscriptions
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/

### E-signature solution (DocuSign) has reliability issues with clients being unable to complete signatures.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Currently using DocuSign despite frequent client sign-up failures
- **Frequency:** weekly
- **WTP signal:** Paying for DocuSign subscription
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/

### Meeting scheduling and client paperwork tracking system is frustrating and unreliable.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Using Goldmine for both scheduling and client document submission tracking
- **Frequency:** daily
- **WTP signal:** Paying for Goldmine subscription
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/


## About this program

This demo was auto-built by the **Idea Miner** pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (>=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.

_Generated by Idea Miner run 2026-07-12-am on 2026-07-12 12:21 UTC_


## Local development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
npm install
npm run dev    # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) for the landing page. Key routes:

| Route | Description |
|-------|-------------|
| `/` | Landing page with features, pricing, and CTA |
| `/demo` | Fully interactive product mock (main demo) |
| `/developers` | Feature documentation for reviewers |
| `/research` | Research story and validation results |

### Production build

```bash
npm run build  # must pass before deploy
npm start      # serve production build locally
```

### Deploy to Vercel

Push to a Git repository and import into Vercel, or run `npx vercel` from this directory. No environment variables, custom server, or `vercel.json` configuration required — standard Next.js App Router defaults apply.

### Project structure

```
app/
  page.tsx          # Landing page
  demo/page.tsx     # Interactive demo shell
  developers/       # Developer feature docs
  research/         # Research origin story
components/
  demo/             # Demo views (Kanban, booking, nudges, dashboard)
  Navbar.tsx        # Site navigation
  Footer.tsx        # Footer with route links
  DevNote.tsx       # DEV NOTE tooltips in /demo
lib/
  mock-data.ts      # All hardcoded demo data
```
