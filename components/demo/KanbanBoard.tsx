"use client";

import DevNote from "@/components/DevNote";
import {
  Client,
  DocStatus,
  KANBAN_COLUMNS,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/lib/mock-data";
import { GripVertical, MoreHorizontal } from "lucide-react";

interface KanbanBoardProps {
  clients: Client[];
  filterStatus: string | null;
  onSelectClient: (client: Client) => void;
  onMoveClient: (clientId: string, newStatus: DocStatus) => void;
  onClearFilter: () => void;
  showToast: (msg: string) => void;
}

export default function KanbanBoard({
  clients,
  filterStatus,
  onSelectClient,
  onMoveClient,
  onClearFilter,
  showToast,
}: KanbanBoardProps) {
  const filtered = filterStatus
    ? clients.filter((c) => c.status === filterStatus)
    : clients;

  const columns = filterStatus
    ? KANBAN_COLUMNS.filter((col) => col === filterStatus)
    : KANBAN_COLUMNS;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          Document Status Board
          <DevNote note="Production: Supabase realtime subscription on document_submissions. Drag-and-drop triggers PATCH /api/appointments/:id/status. Client uploads via unique token link auto-advance columns." />
        </h2>
        {filterStatus && (
          <button
            type="button"
            onClick={() => {
              onClearFilter();
              showToast("Filter cleared — showing all columns");
            }}
            className="text-xs px-3 py-1 rounded-full bg-brand-600/20 text-brand-400 border border-brand-500/30"
          >
            Filter active: {STATUS_LABELS[filterStatus as DocStatus]} ×
          </button>
        )}
      </div>

      <div
        className={`grid gap-4 ${
          columns.length === 1 ? "grid-cols-1 max-w-md" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
        }`}
      >
        {columns.map((status) => {
          const columnClients = filtered.filter((c) => c.status === status);
          return (
            <div key={status} className="glass-card p-3 min-h-[320px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded border ${STATUS_COLORS[status]}`}
                >
                  {STATUS_LABELS[status]}
                </span>
                <span className="text-xs text-gray-500">
                  {columnClients.length}
                </span>
              </div>

              <div className="space-y-2">
                {columnClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-3 rounded-lg bg-surface-700/60 border border-white/5 hover:border-brand-500/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectClient(client)}
                        className="text-left flex-1"
                      >
                        <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">
                          {client.name}
                        </p>
                        {client.company && (
                          <p className="text-xs text-gray-500">{client.company}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {client.appointmentDate} · {client.appointmentTime}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-surface-600 overflow-hidden">
                            <div
                              className="h-full bg-brand-500 rounded-full"
                              style={{
                                width: `${(client.documentsSubmitted / client.documentsRequired) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-500">
                            {client.documentsSubmitted}/{client.documentsRequired}
                          </span>
                        </div>
                      </button>
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => onSelectClient(client)}
                          className="p-1 text-gray-500 hover:text-white"
                          aria-label="More options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex gap-1 flex-wrap">
                      {KANBAN_COLUMNS.filter((s) => s !== client.status).map(
                        (targetStatus) => (
                          <button
                            key={targetStatus}
                            type="button"
                            onClick={() => {
                              onMoveClient(client.id, targetStatus);
                              showToast(
                                `${client.name} moved to ${STATUS_LABELS[targetStatus]}`
                              );
                            }}
                            className="text-[10px] px-2 py-0.5 rounded bg-surface-600 hover:bg-surface-500 text-gray-400 hover:text-white transition-colors flex items-center gap-0.5"
                          >
                            <GripVertical className="w-2.5 h-2.5" />
                            {STATUS_LABELS[targetStatus]}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
