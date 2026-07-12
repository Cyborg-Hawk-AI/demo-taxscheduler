import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  Calendar,
  FileText,
  Kanban,
  MessageSquare,
  BarChart3,
  Webhook,
  Clock,
  Database,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Docs — TaxScheduler",
  description:
    "Feature documentation for the TaxScheduler demo: what's mocked, what's real in production, and integration notes.",
};

const features = [
  {
    icon: Calendar,
    title: "Branded Booking Page",
    demoPath: "Demo → Booking Page tab",
    tryIt:
      "Select a date/time slot, fill in client info, confirm booking, then click 'Preview Checklist Email' or 'View Sent Checklist Email'.",
    mocked:
      "All slots, form submission, and email preview are client-side React state. No Cal.com or Resend calls.",
    production: [
      "Public route: /book/:preparerSlug with Cal.com embed or custom scheduler",
      "booking.created webhook → Supabase appointments table insert",
      "Trigger Resend email with personalized checklist + signed upload JWT",
      "Return type from form selects checklist template from checklist_templates table",
    ],
  },
  {
    icon: FileText,
    title: "Per-Appointment Document Checklist",
    demoPath: "Demo → Booking Page → Preview Checklist Email",
    tryIt:
      "Complete a booking or click 'Preview Checklist Email'. View the auto-generated email with required documents and upload CTA.",
    mocked:
      "Checklist items are hardcoded in lib/mock-data.ts. Email modal is a React component, not a sent email.",
    production: [
      "checklist_templates table keyed by return_type (1040, Schedule C, etc.)",
      "On booking: merge template + preparer custom items → store appointment_checklist rows",
      "Resend sends HTML email with unique upload URL: /upload/:token",
      "Token is a signed JWT containing appointment_id, expires at appointment date",
    ],
  },
  {
    icon: Kanban,
    title: "Document Status Board",
    demoPath: "Demo → Status Board tab",
    tryIt:
      "Click any client card to open details. Use column move buttons to change status. Click stat cards on Dashboard to filter.",
    mocked:
      "12 clients with realistic data in CLIENTS array. Status changes update React state only. Drag targets are buttons, not DnD library.",
    production: [
      "Kanban columns map to document_submissions.aggregate_status enum",
      "Client upload via /upload/:token auto-advances status based on required doc count",
      "Preparer one-click status change: PATCH /api/appointments/:id/status",
      "Supabase Realtime subscription pushes board updates to all open tabs",
    ],
  },
  {
    icon: MessageSquare,
    title: "Automated SMS/Email Nudges",
    demoPath: "Demo → Client Nudges tab",
    tryIt:
      "Filter by friendly/urgent. Click a reminder to preview message. Click 'Send Now' or 'Escalate All Overdue'. View escalation timeline.",
    mocked:
      "REMINDERS array with 5 sample clients. Send/Snooze buttons update local state and show toasts.",
    production: [
      "Vercel Cron: /api/cron/nudges runs nightly at preparer-configured time",
      "Query: appointments WHERE date - NOW() <= 14 days AND status NOT IN (complete, in_review)",
      "Escalation: 14d=friendly email, 7d=friendly SMS+email, 3d=urgent both, 1d=urgent+preparer alert",
      "Twilio for SMS, Resend for email. nudge_log table tracks sent messages",
    ],
  },
  {
    icon: BarChart3,
    title: "Season Dashboard",
    demoPath: "Demo → Season Dashboard tab",
    tryIt:
      "Click stat cards to filter Kanban. Click breakdown bars to filter by status. Click weekly booking bars for details. Export Report button.",
    mocked:
      "SEASON_STATS object with hardcoded aggregates. Weekly chart is CSS bars, not a charting library.",
    production: [
      "Materialized view or nightly aggregation job computing completion % by season",
      "season_stats table: total_booked, complete_count, partial_count, etc.",
      "Dashboard refreshes on webhook events + nightly reconciliation cron",
      "Export generates PDF via @react-pdf/renderer or server-side Puppeteer",
    ],
  },
  {
    icon: Webhook,
    title: "Client Upload Webhook",
    demoPath: "Demo → Client detail → Copy Upload Link",
    tryIt:
      "Open any client on the Status Board, click 'Copy Upload Link' or use the checklist email upload button.",
    mocked:
      "Upload actions show toasts only. No file upload, S3, or webhook processing.",
    production: [
      "Client uploads to S3 presigned URL generated from upload token",
      "S3 event → Lambda or /api/webhooks/upload processes file",
      "Insert document_submissions row, recalculate aggregate status",
      "Webhook updates Kanban via Supabase, sends preparer notification email",
    ],
  },
];

const stack = [
  { layer: "Frontend", tech: "Next.js 14 App Router + Tailwind CSS", note: "This demo" },
  { layer: "Auth", tech: "Supabase Auth", note: "Magic link + Google OAuth" },
  { layer: "Database", tech: "Supabase PostgreSQL", note: "Appointments, documents, nudges" },
  { layer: "Scheduling", tech: "Cal.com API", note: "Or custom scheduler with webhooks" },
  { layer: "Email", tech: "Resend", note: "Checklists, nudges, preparer alerts" },
  { layer: "SMS", tech: "Twilio", note: "Escalating client reminders" },
  { layer: "Storage", tech: "S3 + presigned URLs", note: "Client document uploads" },
  { layer: "Billing", tech: "Stripe Checkout + Portal", note: "$25/mo or $199/yr" },
  { layer: "Cron", tech: "Vercel Cron Jobs", note: "Nightly nudge processing" },
  { layer: "Support", tech: "AI chat widget", note: "Embedded FAQ + ticket escalation" },
];

export default function DevelopersPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-brand-400 text-sm font-medium mb-2">
            Developer Documentation
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            TaxScheduler Feature Reference
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Every feature in the{" "}
            <Link href="/demo" className="text-brand-400 hover:underline">
              interactive demo
            </Link>{" "}
            is documented below: what it does, where to click, what&apos;s mocked
            vs. production, and the intended data flow.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass-card p-6 border-l-2 border-brand-500/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-600/20 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h2>
                  <p className="text-xs text-brand-400 mt-1">
                    {feature.demoPath}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Try it
                  </h3>
                  <p className="text-gray-300">{feature.tryIt}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-amber-500/80 uppercase tracking-wider mb-1">
                    Mocked in demo
                  </h3>
                  <p className="text-gray-400">{feature.mocked}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
                    Production implementation
                  </h3>
                  <ul className="space-y-1">
                    {feature.production.map((item) => (
                      <li
                        key={item}
                        className="text-gray-400 flex items-start gap-2"
                      >
                        <ArrowRight className="w-3 h-3 text-brand-600 shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-brand-400" />
            Intended Tech Stack
          </h2>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-500 font-medium">
                    Layer
                  </th>
                  <th className="text-left p-4 text-gray-500 font-medium">
                    Technology
                  </th>
                  <th className="text-left p-4 text-gray-500 font-medium hidden sm:table-cell">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {stack.map((row) => (
                  <tr
                    key={row.layer}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-4 text-white font-medium">{row.layer}</td>
                    <td className="p-4 text-brand-400">{row.tech}</td>
                    <td className="p-4 text-gray-500 hidden sm:table-cell">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-card p-6">
          <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-400" />
            Automation Data Flow
          </h2>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-700/50">
              <Mail className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Booking → Checklist</p>
                <p>
                  Cal.com webhook → create appointment → select checklist template
                  → Resend email with upload link
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-700/50">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Nightly Cron → Nudges</p>
                <p>
                  Vercel Cron queries incomplete appointments → escalating
                  Twilio SMS + Resend emails → log to nudge_log
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-700/50">
              <Webhook className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Upload → Board Update</p>
                <p>
                  Client uploads to S3 → webhook processes → update
                  document_submissions → Supabase Realtime → preparer email
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors"
          >
            Open Interactive Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </>
  );
}
