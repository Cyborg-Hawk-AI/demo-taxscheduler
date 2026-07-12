"use client";

import DevNote from "@/components/DevNote";
import { SEASON_STATS } from "@/lib/mock-data";
import { BarChart3, TrendingUp, Users, FileCheck, Bell, Clock } from "lucide-react";

interface SeasonDashboardProps {
  onFilterStatus: (status: string | null) => void;
  showToast: (msg: string) => void;
}

export default function SeasonDashboard({
  onFilterStatus,
  showToast,
}: SeasonDashboardProps) {
  const stats = SEASON_STATS;
  const maxWeekly = Math.max(...stats.weeklyBookings);

  const cards = [
    {
      label: "Total Booked",
      value: stats.totalBooked,
      icon: Users,
      color: "text-white",
      action: () => {
        onFilterStatus(null);
        showToast("Showing all booked clients");
      },
    },
    {
      label: "Docs Complete",
      value: `${stats.completionRate}%`,
      icon: FileCheck,
      color: "text-brand-400",
      action: () => {
        onFilterStatus("complete");
        showToast("Filtered to clients with complete documents");
      },
    },
    {
      label: "Nudges Sent",
      value: stats.nudgesSent,
      icon: Bell,
      color: "text-amber-400",
      action: () => showToast("View Reminders tab for nudge details"),
    },
    {
      label: "Avg Days to Complete",
      value: stats.avgDaysToComplete,
      icon: Clock,
      color: "text-blue-400",
      action: () =>
        showToast("Average time from booking to full document submission"),
    },
  ];

  const breakdown = [
    { label: "Complete", count: stats.completeDocs, pct: 59.6, color: "bg-brand-500", status: "complete" },
    { label: "Partial", count: stats.partialDocs, pct: 25.5, color: "bg-amber-500", status: "partial" },
    { label: "Not Submitted", count: stats.notSubmitted, pct: 10.6, color: "bg-red-500", status: "not_submitted" },
    { label: "In Review", count: stats.inReview, pct: 4.3, color: "bg-blue-500", status: "in_review" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-400" />
            2026 Tax Season Dashboard
            <DevNote note="Production: aggregates from Supabase appointments + document_submissions tables. Refreshes on webhook events and nightly cron reconciliation." />
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Mar 1 – Apr 15, 2026 · Chen Tax &amp; Advisory
          </p>
        </div>
        <button
          type="button"
          onClick={() => showToast("Season report exported to PDF")}
          className="px-4 py-2 rounded-lg bg-surface-700 hover:bg-surface-600 text-sm text-gray-300 border border-white/10 transition-colors"
        >
          Export Report
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={card.action}
            className="glass-card p-4 text-left hover:border-brand-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            Document Completion Breakdown
            <DevNote note="Click any segment to filter the Kanban board. Production: computed from document_submissions.status grouped by appointment_id." />
          </h3>
          <div className="space-y-3">
            {breakdown.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onFilterStatus(item.status);
                  showToast(`Filtered Kanban to: ${item.label}`);
                }}
                className="w-full group"
              >
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                  <span className="text-gray-300">
                    {item.count} ({item.pct}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-surface-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all group-hover:opacity-80`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            Weekly Bookings
            <DevNote note="Production: Cal.com webhook creates appointment rows; chart queries COUNT(*) GROUP BY week. Shown in preparer timezone." />
          </h3>
          <div className="flex items-end gap-2 h-40">
            {stats.weeklyBookings.map((count, i) => (
              <button
                key={i}
                type="button"
                onClick={() =>
                  showToast(`Week ${i + 1}: ${count} new bookings`)
                }
                className="flex-1 flex flex-col items-center gap-1 group"
              >
                <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {count}
                </span>
                <div
                  className="w-full rounded-t bg-brand-600/60 group-hover:bg-brand-500 transition-colors"
                  style={{ height: `${(count / maxWeekly) * 100}%`, minHeight: 8 }}
                />
                <span className="text-[10px] text-gray-600">W{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
