import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  Kanban,
  Mail,
  MessageSquare,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Branded Booking Page",
    description:
      "Calendly-style scheduling with your name, logo, and tax-specific intake questions — not generic meeting links.",
  },
  {
    icon: FileText,
    title: "Auto Document Checklists",
    description:
      "Every booking triggers a personalized checklist email listing exactly what each client needs to submit.",
  },
  {
    icon: Kanban,
    title: "Document Status Board",
    description:
      "Kanban workflow: Not Submitted → Partial → Complete → In Review. See who's ready at a glance.",
  },
  {
    icon: MessageSquare,
    title: "Smart Client Nudges",
    description:
      "Escalating SMS and email reminders when documents are overdue relative to appointment date.",
  },
  {
    icon: BarChart3,
    title: "Season Dashboard",
    description:
      "Track % of booked clients with complete document sets. Know your pipeline before tax season peaks.",
  },
  {
    icon: Shield,
    title: "Secure Client Uploads",
    description:
      "Unique upload links per appointment. Webhooks update your board and notify you instantly.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-sm font-medium mb-8">
                <Clock className="w-4 h-4" />
                Built for solo &amp; small-team tax preparers
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Stop cross-referencing your calendar against{" "}
                <span className="gradient-text">document trackers</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                TaxScheduler connects appointment booking to document submission
                status — so you always know which clients are ready before tax
                season hits.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all shadow-lg shadow-brand-900/50 hover:shadow-brand-800/60"
                >
                  Explore Live Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 hover:border-brand-500/50 text-gray-300 hover:text-white font-medium transition-colors"
                >
                  How we found this idea
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
                <div>
                  <p className="text-3xl font-bold text-white">47</p>
                  <p className="text-sm text-gray-500 mt-1">Clients booked</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-brand-400">60%</p>
                  <p className="text-sm text-gray-500 mt-1">Docs complete</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">34</p>
                  <p className="text-sm text-gray-500 mt-1">Auto-nudges sent</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  Calendly doesn&apos;t know if your client sent their W-2s
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Tax preparers juggle Calendly or Goldmine for scheduling, plus
                  a separate tracker for document status. During tax season, manually
                  cross-referencing becomes a daily time sink.
                </p>
                <ul className="space-y-3">
                  {[
                    "Goldmine called 'frustrating and unreliable' by r/Accounting users",
                    "No lightweight scheduling + document tracker combo exists",
                    "TaxDome is too complex and expensive for solo preparers",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6">
                <div className="space-y-3">
                  {[
                    { client: "Marcus Williams", status: "Not Submitted", color: "text-red-400" },
                    { client: "Jennifer Okonkwo", status: "Partial (4/7)", color: "text-amber-400" },
                    { client: "Robert & Linda Hayes", status: "Complete", color: "text-brand-400" },
                    { client: "David Park", status: "In Review", color: "text-blue-400" },
                  ].map((row) => (
                    <div
                      key={row.client}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-700/50"
                    >
                      <span className="text-sm text-gray-300">{row.client}</span>
                      <span className={`text-xs font-medium ${row.color}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  One board. Every client. Every appointment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-surface-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Everything tax preparers need in one place
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Scheduling, document collection, and status tracking — linked to
                every appointment automatically.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="glass-card p-6 hover:border-brand-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center mb-4 group-hover:bg-brand-600/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-white mb-4">
                    Runs itself during tax season
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Bookings trigger checklist emails. A nightly cron sends
                    escalating reminders. Uploads update your board via webhook.
                    Stripe handles billing. AI handles support.
                  </p>
                  <p className="text-brand-400 font-semibold">
                    Estimated owner time: under 1 hour/week
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Calendar, text: "Client books → checklist email sent" },
                    { icon: Mail, text: "Nightly cron → friendly → urgent nudges" },
                    { icon: FileText, text: "Client uploads → board updates + preparer notified" },
                  ].map((step) => (
                    <div
                      key={step.text}
                      className="flex items-center gap-4 p-4 rounded-lg bg-surface-700/50"
                    >
                      <step.icon className="w-5 h-5 text-brand-400 shrink-0" />
                      <span className="text-sm text-gray-300">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-surface-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Simple pricing for solo preparers
              </h2>
              <p className="text-gray-400">
                No per-client fees. No enterprise upsells.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="glass-card p-8 text-center border-brand-500/30">
                <p className="text-sm text-brand-400 font-medium mb-2">Monthly</p>
                <p className="text-4xl font-bold text-white mb-1">
                  $25<span className="text-lg text-gray-500 font-normal">/mo</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">per preparer</p>
                <ul className="text-sm text-gray-400 space-y-2 mb-8 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    Unlimited clients &amp; appointments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    SMS + email nudges included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    Branded booking page
                  </li>
                </ul>
                <Link
                  href="/demo"
                  className="block w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors"
                >
                  Try the Demo
                </Link>
              </div>

              <div className="glass-card p-8 text-center">
                <p className="text-sm text-gray-400 font-medium mb-2">Annual</p>
                <p className="text-4xl font-bold text-white mb-1">
                  $199<span className="text-lg text-gray-500 font-normal">/yr</span>
                </p>
                <p className="text-sm text-brand-400 mb-6">Save $101/year</p>
                <ul className="text-sm text-gray-400 space-y-2 mb-8 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    Everything in Monthly
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    Early access to new features
                  </li>
                </ul>
                <Link
                  href="/demo"
                  className="block w-full py-3 rounded-lg border border-white/20 hover:border-brand-500/50 text-gray-300 hover:text-white font-semibold transition-colors"
                >
                  See It in Action
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              See TaxScheduler in action
            </h2>
            <p className="text-gray-400 mb-8">
              Fully interactive demo with realistic tax season data. Every
              button works. No signup required.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all"
            >
              Launch Interactive Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
