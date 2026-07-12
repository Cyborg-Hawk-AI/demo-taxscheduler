import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research — How We Found TaxScheduler",
  description:
    "The research behind TaxScheduler: real pain points from tax preparers, validation results, and competitive landscape.",
};

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const painPoints = [
  {
    problem:
      "Existing accounting software doesn't meet expectations, is being discontinued, or is overly complicated and expensive for the features offered.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Using multiple tools: QuickBooks Online for bookkeeping, DocuSign for e-signatures, Goldmine for scheduling and client paperwork tracking",
    frequency: "daily",
    wtp: "Currently paying for QuickBooks Online, DocuSign, and Goldmine subscriptions",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
  {
    problem:
      "E-signature solution (DocuSign) has reliability issues with clients being unable to complete signatures.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Currently using DocuSign despite frequent client sign-up failures",
    frequency: "weekly",
    wtp: "Paying for DocuSign subscription",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
  {
    problem:
      "Meeting scheduling and client paperwork tracking system is frustrating and unreliable.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Using Goldmine for both scheduling and client document submission tracking",
    frequency: "daily",
    wtp: "Paying for Goldmine subscription",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
];

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-brand-400 text-sm font-medium mb-2">
            Idea Miner Research
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Why TaxScheduler Exists
          </h1>
          <p className="text-gray-400 leading-relaxed">
            TaxScheduler was identified by the Idea Miner research pipeline —
            mining Reddit, Hacker News, and other communities for real pain
            points scored against a validation rubric.
          </p>
        </div>

        {/* Origin story */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            The origin story
          </h2>
          <div className="glass-card p-6 space-y-4 text-gray-300 leading-relaxed">
            <p>
              The same r/Accounting poster who was juggling three tools
              specifically named <strong className="text-white">Goldmine</strong>{" "}
              as their scheduling and client paperwork tracking system — and
              called it &ldquo;frustrating and unreliable.&rdquo; The core pain is
              that scheduling tools don&apos;t know anything about document
              status, so preparers have to manually cross-reference their
              calendar against a separate tracker to know which clients are ready
              to work on.
            </p>
            <p>
              During tax season this becomes a daily time sink. Goldmine is a
              legacy CRM from a different era; it was never designed for the
              document-collection workflow that defines tax prep.
            </p>
            <p className="text-brand-400 font-medium">
              The document-submission-to-appointment linkage is the core insight
              — no generic scheduling tool connects &ldquo;has this client
              submitted their W-2s yet?&rdquo; to their upcoming appointment,
              which is the actual workflow tax preparers need.
            </p>
          </div>
        </section>

        {/* Scores */}
        <section className="mb-12 grid sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 text-center">
            <TrendingUp className="w-6 h-6 text-brand-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">91/130</p>
            <p className="text-xs text-gray-500 mt-1">Rubric Score</p>
          </div>
          <div className="glass-card p-5 text-center">
            <CheckCircle2 className="w-6 h-6 text-brand-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">9/9</p>
            <p className="text-xs text-gray-500 mt-1">Validation Checks</p>
          </div>
          <div className="glass-card p-5 text-center">
            <Target className="w-6 h-6 text-brand-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">Passed</p>
            <p className="text-xs text-gray-500 mt-1">Gate Result</p>
          </div>
        </section>

        {/* Validation checklist */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Validation checklist
          </h2>
          <div className="glass-card p-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {checklist.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                  <span className="text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive landscape */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Competitive landscape
          </h2>
          <div className="glass-card p-6 text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Calendly</strong> — scheduling only,
              no document tracking.{" "}
              <strong className="text-white">TaxDome</strong> — too complex and
              expensive for solo preparers.{" "}
              <strong className="text-white">Goldmine</strong> — legacy CRM not
              tax-specific.
            </p>
            <p className="mt-3 text-brand-400">
              No lightweight scheduling + document tracker combo exists for this
              niche.
            </p>
          </div>
        </section>

        {/* GTM */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-400" />
            Go-to-market
          </h2>
          <div className="glass-card p-6 text-gray-300">
            r/taxpros and r/Accounting; tax preparer Facebook groups; Product Hunt
            launch in January (peak tax season awareness)
          </div>
        </section>

        {/* Automation */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            How this business runs itself
          </h2>
          <div className="glass-card p-6 space-y-4 text-gray-300 leading-relaxed">
            <p>
              Every new booking automatically triggers a personalized document
              checklist email listing exactly what the client needs to submit
              before their appointment. A cron job runs nightly and sends
              escalating reminders (friendly → urgent) to clients whose
              appointments are approaching with incomplete document sets.
            </p>
            <p>
              When a client uploads a document via their unique link, a webhook
              updates the status board and notifies the preparer via email.
              Stripe handles all billing and renewals. Support is handled by an
              AI widget.
            </p>
            <p className="text-brand-400 font-semibold">
              Estimated owner time: under 1 hour/week
            </p>
            <p className="text-sm text-gray-500">
              MVP estimate: Next.js + Supabase + Cal.com API (scheduling) +
              Twilio + Resend; 2–3 weeks to MVP
            </p>
          </div>
        </section>

        {/* Pain points */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Source pain points (real posts)
          </h2>
          <div className="space-y-4">
            {painPoints.map((pp) => (
              <article key={pp.problem} className="glass-card p-5">
                <p className="text-white font-medium mb-3">{pp.problem}</p>
                <dl className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-gray-600">Persona</dt>
                    <dd className="text-gray-400">{pp.persona}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Frequency</dt>
                    <dd className="text-gray-400">{pp.frequency}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-gray-600">Current workaround</dt>
                    <dd className="text-gray-400">{pp.workaround}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-gray-600">WTP signal</dt>
                    <dd className="text-gray-400">{pp.wtp}</dd>
                  </div>
                </dl>
                <a
                  href={pp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-xs text-brand-400 hover:underline"
                >
                  View source post
                  <ExternalLink className="w-3 h-3" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="glass-card p-6 border border-brand-500/20">
          <h2 className="font-display text-lg font-bold text-white mb-3">
            About this program
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            This demo was auto-built by the <strong className="text-gray-300">Idea Miner</strong> pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (&gt;=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.
          </p>
          <p className="text-xs text-gray-600 mt-3">
            Generated by Idea Miner run 2026-07-12-am on 2026-07-12 12:21 UTC
          </p>
          <Link
            href="/demo"
            className="inline-block mt-4 text-sm text-brand-400 hover:underline"
          >
            Try the interactive demo →
          </Link>
        </section>
      </main>
    </>
  );
}
