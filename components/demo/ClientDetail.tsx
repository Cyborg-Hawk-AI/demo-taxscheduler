"use client";

import DevNote from "@/components/DevNote";
import {
  Client,
  DEFAULT_CHECKLIST,
  DocStatus,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/lib/mock-data";
import { Mail, Phone, Calendar, FileText, Upload } from "lucide-react";
import { Modal } from "./ui";

interface ClientDetailProps {
  client: Client | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (clientId: string, status: DocStatus) => void;
  showToast: (msg: string) => void;
}

export default function ClientDetail({
  client,
  open,
  onClose,
  onStatusChange,
  showToast,
}: ClientDetailProps) {
  if (!client) return null;

  const submittedDocs = DEFAULT_CHECKLIST.slice(
    0,
    client.documentsSubmitted
  );
  const pendingDocs = DEFAULT_CHECKLIST.slice(client.documentsSubmitted);

  return (
    <Modal open={open} onClose={onClose} title={client.name} wide>
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="w-4 h-4 text-gray-500" />
            <a
              href={`mailto:${client.email}`}
              onClick={(e) => {
                e.preventDefault();
                showToast(`Email compose opened for ${client.email}`);
              }}
              className="hover:text-brand-400"
            >
              {client.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4 text-gray-500" />
            <button
              type="button"
              onClick={() => showToast(`Calling ${client.phone} (mock)`)}
              className="hover:text-brand-400"
            >
              {client.phone}
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 text-gray-500" />
            {client.appointmentDate} at {client.appointmentTime}
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FileText className="w-4 h-4 text-gray-500" />
            {client.returnType}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs px-3 py-1 rounded border ${STATUS_COLORS[client.status]}`}
          >
            {STATUS_LABELS[client.status]}
          </span>
          <span className="text-xs text-gray-500">
            Est. refund: ${client.estimatedRefund.toLocaleString()}
          </span>
          <DevNote note="Production: client detail drawer loads from GET /api/appointments/:id with joined document_submissions. Status changes PATCH and emit preparer notification via Resend." />
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Change Status
          </h4>
          <div className="flex flex-wrap gap-2">
            {(
              Object.keys(STATUS_LABELS) as DocStatus[]
            ).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  onStatusChange(client.id, status);
                  showToast(
                    `${client.name} status updated to ${STATUS_LABELS[status]}`
                  );
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  client.status === status
                    ? STATUS_COLORS[status]
                    : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Submitted ({submittedDocs.length})
            </h4>
            <ul className="space-y-1">
              {submittedDocs.map((doc) => (
                <li
                  key={doc.id}
                  className="text-sm text-brand-400 flex items-center gap-2"
                >
                  <Upload className="w-3 h-3" />
                  {doc.label}
                </li>
              ))}
              {submittedDocs.length === 0 && (
                <li className="text-sm text-gray-600">No documents yet</li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Pending ({pendingDocs.length})
            </h4>
            <ul className="space-y-1">
              {pendingDocs.map((doc) => (
                <li
                  key={doc.id}
                  className="text-sm text-gray-500 flex items-center gap-2"
                >
                  <FileText className="w-3 h-3" />
                  {doc.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-surface-700/50">
          <p className="text-xs text-gray-500 mb-1">Preparer Notes</p>
          <p className="text-sm text-gray-300">{client.preparerNotes}</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              showToast(`Checklist reminder sent to ${client.name}`)
            }
            className="flex-1 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold"
          >
            Send Reminder
          </button>
          <button
            type="button"
            onClick={() =>
              showToast(`Upload portal link copied for ${client.name}`)
            }
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm"
          >
            Copy Upload Link
          </button>
        </div>
      </div>
    </Modal>
  );
}
