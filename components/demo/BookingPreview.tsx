"use client";

import { useState } from "react";
import DevNote from "@/components/DevNote";
import {
  BOOKING_SLOTS,
  DEFAULT_CHECKLIST,
  PREPARER,
} from "@/lib/mock-data";
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Mail,
  User,
} from "lucide-react";
import { Modal } from "./ui";

interface BookingPreviewProps {
  showToast: (msg: string) => void;
}

export default function BookingPreview({ showToast }: BookingPreviewProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    returnType: "1040 Individual",
  });
  const [showChecklist, setShowChecklist] = useState(false);
  const [booked, setBooked] = useState(false);

  const returnTypes = [
    "1040 Individual",
    "Joint 1040",
    "Schedule C",
    "S-Corp (1120-S)",
    "Partnership",
  ];

  const handleBook = () => {
    setBooked(true);
    setStep(4);
    showToast(
      `Booking confirmed! Checklist email sent to ${form.email || "client@example.com"}`
    );
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setForm({ name: "", email: "", phone: "", returnType: "1040 Individual" });
    setBooked(false);
    showToast("Booking flow reset");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          Branded Booking Page
          <DevNote note="Production: public route at /book/:preparerSlug powered by Cal.com embed or custom scheduler. On booking.created webhook → insert appointment + trigger Resend checklist email with unique upload token." />
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowChecklist(true)}
            className="px-3 py-1.5 rounded-lg text-xs bg-surface-700 text-gray-300 border border-white/10 hover:bg-surface-600"
          >
            Preview Checklist Email
          </button>
          {booked && (
            <button
              type="button"
              onClick={resetBooking}
              className="px-3 py-1.5 rounded-lg text-xs bg-brand-600/20 text-brand-400 border border-brand-500/30"
            >
              Reset Demo
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Booking page preview */}
        <div className="lg:col-span-3 glass-card overflow-hidden">
          <div className="bg-gradient-to-r from-brand-800 to-brand-900 p-6">
            <p className="text-brand-200 text-sm">{PREPARER.business}</p>
            <h3 className="text-xl font-bold text-white mt-1">
              Book with {PREPARER.name}
            </h3>
            <p className="text-brand-200/80 text-sm mt-1">{PREPARER.tagline}</p>
          </div>

          <div className="p-6">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {["Select Time", "Your Info", "Confirm"].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (i + 1 < step || booked) setStep(i + 1);
                  }}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors ${
                    step === i + 1
                      ? "bg-brand-600 text-white"
                      : step > i + 1
                        ? "bg-brand-600/30 text-brand-400"
                        : "bg-surface-700 text-gray-500"
                  }`}
                >
                  {step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}
                  {label}
                </button>
              ))}
            </div>

            {step === 1 && (
              <div>
                <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Select a date and time
                </p>
                <div className="space-y-4">
                  {BOOKING_SLOTS.map((day) => (
                    <div key={day.date}>
                      <p className="text-sm font-medium text-white mb-2">
                        {day.date}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedDate(day.date);
                              setSelectedSlot(slot);
                              showToast(`Selected ${day.date} at ${slot}`);
                            }}
                            className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                              selectedDate === day.date &&
                              selectedSlot === slot
                                ? "bg-brand-600 border-brand-500 text-white"
                                : "bg-surface-700 border-white/10 text-gray-300 hover:border-brand-500/50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!selectedSlot}
                  onClick={() => setStep(2)}
                  className="mt-6 w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your information
                </p>
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-surface-700 border border-white/10 text-white placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-surface-700 border border-white/10 text-white placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone (for SMS reminders)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-surface-700 border border-white/10 text-white placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
                />
                <select
                  value={form.returnType}
                  onChange={(e) =>
                    setForm({ ...form, returnType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-surface-700 border border-white/10 text-white focus:border-brand-500 focus:outline-none"
                >
                  {returnTypes.map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && !booked && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Confirm your appointment
                </p>
                <div className="p-4 rounded-lg bg-surface-700/50 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="text-white">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="text-white">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="text-white">
                      {form.name || "Marcus Williams"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Return type</span>
                    <span className="text-white">{form.returnType}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  After booking, you&apos;ll receive a document checklist email
                  with a secure upload link.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleBook}
                    className="flex-1 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {step === 4 && booked && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-brand-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Appointment Confirmed!
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  {selectedDate} at {selectedSlot} with {PREPARER.name}
                </p>
                <button
                  type="button"
                  onClick={() => setShowChecklist(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600/20 text-brand-400 border border-brand-500/30 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  View Sent Checklist Email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-white mb-3">
              Preparer Profile
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-gray-500">Name:</span> {PREPARER.name}
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">Business:</span>{" "}
                {PREPARER.business}
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">Booking URL:</span>{" "}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `https://taxscheduler.app/book/${PREPARER.bookingSlug}`
                    );
                    showToast("Booking URL copied to clipboard");
                  }}
                  className="text-brand-400 hover:underline"
                >
                  taxscheduler.app/book/{PREPARER.bookingSlug}
                </button>
              </p>
            </div>
          </div>

          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-400" />
              Default Document Checklist
              <DevNote note="Production: checklist templates stored per return_type in Supabase. Merged with preparer custom items on booking.created webhook. Sent via Resend with upload link containing signed JWT token." />
            </h4>
            <ul className="space-y-2">
              {DEFAULT_CHECKLIST.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${item.required ? "bg-brand-500" : "bg-gray-600"}`}
                  />
                  {item.label}
                  {!item.required && (
                    <span className="text-[10px] text-gray-600">optional</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={showChecklist}
        onClose={() => setShowChecklist(false)}
        title="Document Checklist Email (Auto-sent)"
        wide
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-lg bg-surface-700/50 border border-white/5">
            <p className="text-gray-500 text-xs mb-2">From: {PREPARER.email}</p>
            <p className="text-gray-500 text-xs mb-3">
              To: {form.email || "marcus.w@williamsplumbing.com"}
            </p>
            <p className="text-white font-medium">
              Your tax appointment is confirmed — here&apos;s what to bring
            </p>
          </div>
          <p className="text-gray-400">
            Hi {form.name || "Marcus"},
          </p>
          <p className="text-gray-400">
            Your appointment with {PREPARER.name} is scheduled for{" "}
            <strong className="text-white">
              {selectedDate || "Thu, Mar 20"} at {selectedSlot || "9:00 AM"}
            </strong>
            . Please upload the following documents before your visit using your
            secure link:
          </p>
          <ul className="space-y-1">
            {DEFAULT_CHECKLIST.filter((d) => d.required).map((item) => (
              <li key={item.id} className="text-gray-300 flex items-center gap-2">
                <Check className="w-3 h-3 text-brand-500" />
                {item.label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              showToast("Client upload portal opened (mock)");
              setShowChecklist(false);
            }}
            className="w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold"
          >
            Upload Documents Securely →
          </button>
        </div>
      </Modal>
    </div>
  );
}
