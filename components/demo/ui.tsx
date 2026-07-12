"use client";

import { useCallback, useState } from "react";
import { X } from "lucide-react";

export interface ToastMessage {
  id: number;
  text: string;
  type?: "success" | "info" | "warning";
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (text: string, type: ToastMessage["type"] = "success") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  return { toasts, showToast };
}

export function ToastContainer({ toasts }: { toasts: ToastMessage[] }) {
  if (toasts.length === 0) return null;

  const colors = {
    success: "border-brand-500/40 bg-brand-900/90",
    info: "border-blue-500/40 bg-blue-900/90",
    warning: "border-amber-500/40 bg-amber-900/90",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-lg border shadow-xl text-sm text-white animate-in slide-in-from-right ${
            colors[toast.type ?? "success"]
          }`}
        >
          <span className="flex-1">{toast.text}</span>
        </div>
      ))}
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`relative glass-card w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="font-semibold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
