"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import { REMINDERS, STATUS_COLORS, STATUS_LABELS, DocStatus } from "@/lib/mock-data";
import { Bell, Mail, MessageSquare, Send, Clock } from "lucide-react";

interface RemindersViewProps {
  showToast: (msg: string) => void;
}

export default function RemindersView({ showToast }: RemindersViewProps) {
  const [reminders, setReminders] = useState(REMINDERS);
  const [selectedId, setSelectedId] = useState<string | null>("r1");
  const [filter, setFilter] = useState<"all" | "friendly" | "urgent">("all");

  const filtered = reminders.filter(
    (r) => filter === "all" || r.nudgeLevel === filter
  );

  const selected = reminders.find((r) => r.id === selectedId);

  const sendNudge = (id: string) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, lastSent: "Just now", nudgeLevel: "urgent" as const }
          : r
      )
    );
    const client = reminders.find((r) => r.id === id)?.client;
    showToast(`Urgent nudge sent to ${client} via SMS + email`);
  };

  const escalateAll = () => {
    setReminders((prev) =>
      prev.map((r) =>
        r.status !== "complete" && r.status !== "in_review"
          ? { ...r, nudgeLevel: "urgent" as const, lastSent: "Just now" }
          : r
      )
    );
    showToast("Escalated all overdue reminders to urgent level");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          Automated Client Nudges
          <DevNote note="Production: Vercel Cron runs nightly at 6 AM preparer timezone. Queries appointments WHERE date - NOW() <= 7 days AND status != 'complete'. Escalation: friendly at 14d, urgent at 7d, both at 3d. Twilio SMS + Resend email." />
        </h2>
        <button
          type="button"
          onClick={escalateAll}
          className="px-4 py-2 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30 text-sm hover:bg-amber-600/30 transition-colors flex items-center gap-2"
        >
          <Bell className="w-4 h-4" />
          Escalate All Overdue
        </button>
      </div>

      <div className="flex gap-2">
        {(["all", "friendly", "urgent"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              showToast(
                f === "all"
                  ? "Showing all reminders"
                  : `Filtered to ${f} nudges`
              );
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "bg-brand-600 text-white"
                : "bg-surface-700 text-gray-400 hover:text-white"
            }`}
          >
            {f === "all" ? "All Reminders" : `${f} Only`}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card divide-y divide-white/5">
          {filtered.map((reminder) => (
            <button
              key={reminder.id}
              type="button"
              onClick={() => {
                setSelectedId(reminder.id);
                showToast(`Viewing reminder for ${reminder.client}`);
              }}
              className={`w-full p-4 text-left hover:bg-white/5 transition-colors ${
                selectedId === reminder.id ? "bg-brand-600/10" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {reminder.client}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Appointment {reminder.appointmentDate} ·{" "}
                    {reminder.daysUntil} days away
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border ${STATUS_COLORS[reminder.status as DocStatus]}`}
                  >
                    {STATUS_LABELS[reminder.status as DocStatus]}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      reminder.nudgeLevel === "urgent"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {reminder.nudgeLevel}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                {reminder.channel === "email" || reminder.channel === "both" ? (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </span>
                ) : null}
                {reminder.channel === "sms" || reminder.channel === "both" ? (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> SMS
                  </span>
                ) : null}
                <span>Last sent: {reminder.lastSent}</span>
              </div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Message Preview — {selected.client}
            </h3>
            <div className="p-4 rounded-lg bg-surface-700/50 border border-white/5 mb-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                {selected.message}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => sendNudge(selected.id)}
                className="flex-1 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Now
              </button>
              <button
                type="button"
                onClick={() =>
                  showToast("Reminder scheduled for tomorrow 8:00 AM")
                }
                className="px-4 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm"
              >
                Snooze 24h
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Escalation Timeline
              </h4>
              <div className="space-y-2">
                {[
                  { days: 14, level: "Friendly email", done: true },
                  { days: 7, level: "Friendly SMS + email", done: selected.daysUntil <= 7 },
                  { days: 3, level: "Urgent SMS + email", done: selected.daysUntil <= 3 },
                  { days: 1, level: "Final urgent + preparer alert", done: false },
                ].map((step) => (
                  <div
                    key={step.days}
                    className="flex items-center gap-3 text-xs"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${step.done ? "bg-brand-500" : "bg-gray-600"}`}
                    />
                    <span className="text-gray-500 w-16">{step.days}d out</span>
                    <span className={step.done ? "text-gray-300" : "text-gray-600"}>
                      {step.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
