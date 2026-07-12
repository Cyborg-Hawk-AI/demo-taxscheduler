export type DocStatus = "not_submitted" | "partial" | "complete" | "in_review";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  appointmentDate: string;
  appointmentTime: string;
  returnType: string;
  estimatedRefund: number;
  status: DocStatus;
  documentsSubmitted: number;
  documentsRequired: number;
  lastNudge: string;
  nudgeLevel: "none" | "friendly" | "urgent";
  preparerNotes: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  type: "upload" | "booking" | "nudge" | "status" | "review";
  client: string;
  message: string;
}

export interface ReminderItem {
  id: string;
  client: string;
  appointmentDate: string;
  daysUntil: number;
  status: DocStatus;
  lastSent: string;
  channel: "email" | "sms" | "both";
  nudgeLevel: "friendly" | "urgent";
  message: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  category: string;
}

export const PREPARER = {
  name: "Sarah Chen, EA",
  business: "Chen Tax & Advisory",
  tagline: "Personal & Small Business Tax Prep",
  bookingSlug: "chen-tax-advisory",
  email: "sarah@chentax.com",
  phone: "(503) 555-0142",
};

export const SEASON_STATS = {
  totalBooked: 47,
  completeDocs: 28,
  partialDocs: 12,
  notSubmitted: 5,
  inReview: 2,
  completionRate: 59.6,
  weeklyBookings: [3, 5, 8, 12, 9, 7, 3],
  nudgesSent: 34,
  avgDaysToComplete: 4.2,
};

export const CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Marcus Williams",
    email: "marcus.w@williamsplumbing.com",
    phone: "(503) 555-2891",
    company: "Williams Plumbing LLC",
    appointmentDate: "2026-03-18",
    appointmentTime: "10:00 AM",
    returnType: "S-Corp + Personal",
    estimatedRefund: 4200,
    status: "not_submitted",
    documentsSubmitted: 0,
    documentsRequired: 8,
    lastNudge: "2026-03-11",
    nudgeLevel: "urgent",
    preparerNotes: "Called twice — promised docs by Friday",
  },
  {
    id: "c2",
    name: "Jennifer Okonkwo",
    email: "j.okonkwo@gmail.com",
    phone: "(971) 555-3344",
    appointmentDate: "2026-03-19",
    appointmentTime: "2:30 PM",
    returnType: "1040 + Schedule C",
    estimatedRefund: 1850,
    status: "partial",
    documentsSubmitted: 4,
    documentsRequired: 7,
    lastNudge: "2026-03-10",
    nudgeLevel: "friendly",
    preparerNotes: "Missing 1099-NEC from Upwork",
  },
  {
    id: "c3",
    name: "Robert & Linda Hayes",
    email: "rhayes@hayesfamily.net",
    phone: "(503) 555-7721",
    appointmentDate: "2026-03-20",
    appointmentTime: "9:00 AM",
    returnType: "Joint 1040",
    estimatedRefund: 6200,
    status: "complete",
    documentsSubmitted: 6,
    documentsRequired: 6,
    lastNudge: "—",
    nudgeLevel: "none",
    preparerNotes: "All docs received — ready to prep",
  },
  {
    id: "c4",
    name: "David Park",
    email: "dpark@parkconsulting.io",
    phone: "(503) 555-9012",
    company: "Park Consulting",
    appointmentDate: "2026-03-21",
    appointmentTime: "11:30 AM",
    returnType: "1120-S + Personal",
    estimatedRefund: 8900,
    status: "in_review",
    documentsSubmitted: 11,
    documentsRequired: 11,
    lastNudge: "—",
    nudgeLevel: "none",
    preparerNotes: "Reviewing K-1 allocations",
  },
  {
    id: "c5",
    name: "Angela Torres",
    email: "atorres@torresbakery.com",
    phone: "(503) 555-4456",
    company: "Torres Bakery",
    appointmentDate: "2026-03-22",
    appointmentTime: "3:00 PM",
    returnType: "Schedule C + 1040",
    estimatedRefund: 2100,
    status: "partial",
    documentsSubmitted: 5,
    documentsRequired: 9,
    lastNudge: "2026-03-11",
    nudgeLevel: "friendly",
    preparerNotes: "Needs Q4 bank statements",
  },
  {
    id: "c6",
    name: "Michael Brennan",
    email: "mbrennan@brennanlaw.com",
    phone: "(971) 555-6678",
    company: "Brennan Law Group",
    appointmentDate: "2026-03-23",
    appointmentTime: "1:00 PM",
    returnType: "Partnership + Personal",
    estimatedRefund: 12400,
    status: "complete",
    documentsSubmitted: 14,
    documentsRequired: 14,
    lastNudge: "—",
    nudgeLevel: "none",
    preparerNotes: "Partnership docs complete",
  },
  {
    id: "c7",
    name: "Priya Sharma",
    email: "priya.sharma@outlook.com",
    phone: "(503) 555-2233",
    appointmentDate: "2026-03-24",
    appointmentTime: "4:30 PM",
    returnType: "1040 + HSA",
    estimatedRefund: 980,
    status: "not_submitted",
    documentsSubmitted: 0,
    documentsRequired: 5,
    lastNudge: "2026-03-09",
    nudgeLevel: "urgent",
    preparerNotes: "New client — sent welcome packet",
  },
  {
    id: "c8",
    name: "James & Susan Okafor",
    email: "jokafor@gmail.com",
    phone: "(503) 555-8890",
    appointmentDate: "2026-03-25",
    appointmentTime: "10:30 AM",
    returnType: "Joint 1040 + Rental",
    estimatedRefund: 3400,
    status: "partial",
    documentsSubmitted: 6,
    documentsRequired: 10,
    lastNudge: "2026-03-10",
    nudgeLevel: "friendly",
    preparerNotes: "Rental property docs pending",
  },
  {
    id: "c9",
    name: "Elena Vasquez",
    email: "elena@vasquezdesigns.com",
    phone: "(971) 555-1122",
    company: "Vasquez Designs",
    appointmentDate: "2026-03-26",
    appointmentTime: "2:00 PM",
    returnType: "Schedule C",
    estimatedRefund: 1650,
    status: "complete",
    documentsSubmitted: 7,
    documentsRequired: 7,
    lastNudge: "—",
    nudgeLevel: "none",
    preparerNotes: "Freelance designer — straightforward",
  },
  {
    id: "c10",
    name: "Thomas Wright",
    email: "twright@wrightauto.com",
    phone: "(503) 555-5567",
    company: "Wright Auto Repair",
    appointmentDate: "2026-03-27",
    appointmentTime: "9:30 AM",
    returnType: "S-Corp + 1040",
    estimatedRefund: 7800,
    status: "in_review",
    documentsSubmitted: 12,
    documentsRequired: 12,
    lastNudge: "—",
    nudgeLevel: "none",
    preparerNotes: "Vehicle expense audit in progress",
  },
  {
    id: "c11",
    name: "Karen Mitchell",
    email: "kmitchell@mitchellcpa.net",
    phone: "(503) 555-3345",
    appointmentDate: "2026-03-28",
    appointmentTime: "11:00 AM",
    returnType: "1040 + Stock Sales",
    estimatedRefund: 5200,
    status: "partial",
    documentsSubmitted: 3,
    documentsRequired: 8,
    lastNudge: "2026-03-11",
    nudgeLevel: "urgent",
    preparerNotes: "Brokerage 1099-B missing",
  },
  {
    id: "c12",
    name: "Daniel & Amy Foster",
    email: "fosters@fosterfamily.org",
    phone: "(971) 555-7789",
    appointmentDate: "2026-03-29",
    appointmentTime: "3:30 PM",
    returnType: "Joint 1040 + Adoption Credit",
    estimatedRefund: 9100,
    status: "not_submitted",
    documentsSubmitted: 1,
    documentsRequired: 9,
    lastNudge: "2026-03-08",
    nudgeLevel: "friendly",
    preparerNotes: "Adoption credit docs needed",
  },
];

export const ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    time: "2 min ago",
    type: "upload",
    client: "Angela Torres",
    message: "Uploaded Q3 bank statement (Chase Business)",
  },
  {
    id: "a2",
    time: "18 min ago",
    type: "nudge",
    client: "Marcus Williams",
    message: "Urgent SMS reminder sent — appointment in 7 days",
  },
  {
    id: "a3",
    time: "45 min ago",
    type: "booking",
    client: "Daniel & Amy Foster",
    message: "New appointment booked for Mar 29 — checklist email sent",
  },
  {
    id: "a4",
    time: "1 hr ago",
    type: "upload",
    client: "Jennifer Okonkwo",
    message: "Uploaded W-2 from Portland State University",
  },
  {
    id: "a5",
    time: "2 hrs ago",
    type: "status",
    client: "Robert & Linda Hayes",
    message: "Status moved to Complete — all 6 documents received",
  },
  {
    id: "a6",
    time: "3 hrs ago",
    type: "review",
    client: "David Park",
    message: "Preparer marked as In Review — K-1 verification started",
  },
  {
    id: "a7",
    time: "4 hrs ago",
    type: "nudge",
    client: "Karen Mitchell",
    message: "Urgent email sent — 1099-B still missing",
  },
  {
    id: "a8",
    time: "5 hrs ago",
    type: "upload",
    client: "Michael Brennan",
    message: "Uploaded partnership K-1 (Brennan Law Group LLP)",
  },
];

export const REMINDERS: ReminderItem[] = [
  {
    id: "r1",
    client: "Marcus Williams",
    appointmentDate: "Mar 18",
    daysUntil: 7,
    status: "not_submitted",
    lastSent: "Mar 11, 8:00 AM",
    channel: "both",
    nudgeLevel: "urgent",
    message:
      "Hi Marcus — your tax appointment is in 7 days and we haven't received any documents yet. Please upload your W-2s, 1099s, and business records using your secure link.",
  },
  {
    id: "r2",
    client: "Jennifer Okonkwo",
    appointmentDate: "Mar 19",
    daysUntil: 8,
    status: "partial",
    lastSent: "Mar 10, 6:00 PM",
    channel: "email",
    nudgeLevel: "friendly",
    message:
      "Hi Jennifer — you're almost there! We have 4 of 7 documents. Still need your 1099-NEC from Upwork and mortgage interest statement.",
  },
  {
    id: "r3",
    client: "Angela Torres",
    appointmentDate: "Mar 22",
    daysUntil: 11,
    status: "partial",
    lastSent: "Mar 11, 6:00 AM",
    channel: "sms",
    nudgeLevel: "friendly",
    message:
      "Angela — missing Q4 bank statements for Torres Bakery. Upload here before your Mar 22 appointment.",
  },
  {
    id: "r4",
    client: "Priya Sharma",
    appointmentDate: "Mar 24",
    daysUntil: 13,
    status: "not_submitted",
    lastSent: "Mar 9, 8:00 AM",
    channel: "both",
    nudgeLevel: "urgent",
    message:
      "Priya — welcome to Chen Tax! Your appointment is Mar 24. Please start uploading your tax documents using the link in your welcome email.",
  },
  {
    id: "r5",
    client: "Karen Mitchell",
    appointmentDate: "Mar 28",
    daysUntil: 17,
    status: "partial",
    lastSent: "Mar 11, 8:00 AM",
    channel: "email",
    nudgeLevel: "urgent",
    message:
      "Karen — your brokerage 1099-B is still missing. Without it we can't finalize your stock sale calculations.",
  },
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: "d1", label: "W-2 (all employers)", required: true, category: "Income" },
  { id: "d2", label: "1099-NEC / 1099-MISC", required: true, category: "Income" },
  { id: "d3", label: "1099-INT / 1099-DIV", required: false, category: "Income" },
  { id: "d4", label: "1099-B (brokerage)", required: false, category: "Investments" },
  { id: "d5", label: "Mortgage interest (1098)", required: false, category: "Deductions" },
  { id: "d6", label: "Property tax receipts", required: false, category: "Deductions" },
  { id: "d7", label: "Business bank statements (Q1–Q4)", required: true, category: "Business" },
  { id: "d8", label: "Prior year tax return", required: true, category: "Reference" },
];

export const BOOKING_SLOTS = [
  { date: "Mon, Mar 17", slots: ["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"] },
  { date: "Tue, Mar 18", slots: ["9:00 AM", "11:00 AM", "1:30 PM"] },
  { date: "Wed, Mar 19", slots: ["10:00 AM", "2:30 PM", "3:30 PM"] },
  { date: "Thu, Mar 20", slots: ["9:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"] },
  { date: "Fri, Mar 21", slots: ["9:30 AM", "11:30 AM", "2:00 PM"] },
];

export const STATUS_LABELS: Record<DocStatus, string> = {
  not_submitted: "Not Submitted",
  partial: "Partial",
  complete: "Complete",
  in_review: "In Review",
};

export const STATUS_COLORS: Record<DocStatus, string> = {
  not_submitted: "bg-red-500/20 text-red-400 border-red-500/30",
  partial: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  complete: "bg-brand-500/20 text-brand-400 border-brand-500/30",
  in_review: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export const KANBAN_COLUMNS: DocStatus[] = [
  "not_submitted",
  "partial",
  "complete",
  "in_review",
];
