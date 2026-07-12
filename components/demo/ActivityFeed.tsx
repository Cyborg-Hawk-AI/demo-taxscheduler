"use client";

import DevNote from "@/components/DevNote";
import { ACTIVITY, ActivityItem } from "@/lib/mock-data";
import {
  Upload,
  Calendar,
  Bell,
  ArrowRightLeft,
  Eye,
} from "lucide-react";

const typeIcons: Record<ActivityItem["type"], typeof Upload> = {
  upload: Upload,
  booking: Calendar,
  nudge: Bell,
  status: ArrowRightLeft,
  review: Eye,
};

const typeColors: Record<ActivityItem["type"], string> = {
  upload: "text-brand-400 bg-brand-500/20",
  booking: "text-blue-400 bg-blue-500/20",
  nudge: "text-amber-400 bg-amber-500/20",
  status: "text-purple-400 bg-purple-500/20",
  review: "text-cyan-400 bg-cyan-500/20",
};

interface ActivityFeedProps {
  showToast: (msg: string) => void;
}

export default function ActivityFeed({ showToast }: ActivityFeedProps) {
  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        Recent Activity
        <DevNote note="Production: activity_log table fed by webhooks (booking.created, document.uploaded, nudge.sent, status.changed). Realtime via Supabase subscriptions." />
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {ACTIVITY.map((item) => {
          const Icon = typeIcons[item.type];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                showToast(`Activity: ${item.client} — ${item.message}`)
              }
              className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${typeColors[item.type]}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300 truncate">{item.message}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  {item.client} · {item.time}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
