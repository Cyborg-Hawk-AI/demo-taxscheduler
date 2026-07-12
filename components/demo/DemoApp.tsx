"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import DevNote from "@/components/DevNote";
import {
  CLIENTS,
  Client,
  DocStatus,
  PREPARER,
} from "@/lib/mock-data";
import {
  LayoutDashboard,
  Kanban,
  Calendar,
  Bell,
  Search,
  Settings,
  ChevronDown,
} from "lucide-react";
import SeasonDashboard from "./SeasonDashboard";
import KanbanBoard from "./KanbanBoard";
import BookingPreview from "./BookingPreview";
import RemindersView from "./RemindersView";
import ActivityFeed from "./ActivityFeed";
import ClientDetail from "./ClientDetail";
import { ToastContainer, useToast } from "./ui";

type Tab = "dashboard" | "board" | "booking" | "reminders";

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Season Dashboard", icon: LayoutDashboard },
  { id: "board", label: "Status Board", icon: Kanban },
  { id: "booking", label: "Booking Page", icon: Calendar },
  { id: "reminders", label: "Client Nudges", icon: Bell },
];

export default function DemoApp() {
  const { toasts, showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [clients, setClients] = useState<Client[]>(CLIENTS);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const handleMoveClient = (clientId: string, newStatus: DocStatus) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: newStatus } : c))
    );
    if (selectedClient?.id === clientId) {
      setSelectedClient((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  const handleFilterStatus = (status: string | null) => {
    setFilterStatus(status);
    if (status) setActiveTab("board");
  };

  const searchedClients = searchQuery
    ? clients.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.company?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clients;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-900">
        {/* Demo header bar */}
        <div className="border-b border-white/10 bg-surface-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                Logged in as{" "}
                <strong className="text-white">{PREPARER.name}</strong>
              </span>
              <DevNote note="Production: Supabase Auth with magic link or Google OAuth. Preparer profile stored in preparers table with branding settings." />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) {
                      setActiveTab("board");
                      showToast(
                        `Found ${searchedClients.length} clients matching "${e.target.value}"`
                      );
                    }
                  }}
                  className="pl-9 pr-4 py-1.5 rounded-lg bg-surface-700 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:border-brand-500 focus:outline-none w-48"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSettings(!showSettings);
                  showToast(
                    showSettings ? "Settings closed" : "Settings panel opened"
                  );
                }}
                className="p-2 rounded-lg bg-surface-700 border border-white/10 text-gray-400 hover:text-white"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showSettings && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
              <div className="glass-card p-4 grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue={PREPARER.business}
                    onChange={() => showToast("Business name updated (mock)")}
                    className="w-full px-3 py-2 rounded-lg bg-surface-700 border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Nudge Schedule
                  </label>
                  <select
                    defaultValue="6am"
                    onChange={(e) =>
                      showToast(`Cron schedule set to ${e.target.value}`)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-surface-700 border border-white/10 text-white text-sm"
                  >
                    <option value="6am">Daily at 6:00 AM</option>
                    <option value="8am">Daily at 8:00 AM</option>
                    <option value="twice">Twice daily</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Stripe Plan
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      showToast("Stripe Customer Portal opened (mock)")
                    }
                    className="w-full px-3 py-2 rounded-lg bg-brand-600/20 text-brand-400 border border-brand-500/30 text-sm hover:bg-brand-600/30"
                  >
                    Manage Billing ($25/mo)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Tab navigation */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  showToast(`Switched to ${tab.label}`);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-900/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                showToast("Dropdown: Export, Import, Help Center")
              }
              className="ml-auto flex items-center gap-1 px-3 py-2 text-gray-500 hover:text-white text-sm"
            >
              More <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {activeTab === "dashboard" && (
                <SeasonDashboard
                  onFilterStatus={handleFilterStatus}
                  showToast={showToast}
                />
              )}
              {activeTab === "board" && (
                <KanbanBoard
                  clients={searchQuery ? searchedClients : clients}
                  filterStatus={filterStatus}
                  onSelectClient={(c) => {
                    setSelectedClient(c);
                    showToast(`Opened details for ${c.name}`);
                  }}
                  onMoveClient={handleMoveClient}
                  onClearFilter={() => setFilterStatus(null)}
                  showToast={showToast}
                />
              )}
              {activeTab === "booking" && (
                <BookingPreview showToast={showToast} />
              )}
              {activeTab === "reminders" && (
                <RemindersView showToast={showToast} />
              )}
            </div>

            <div className="lg:col-span-1">
              <ActivityFeed showToast={showToast} />

              <div className="glass-card p-4 mt-4">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Upcoming Appointments
                </h3>
                <div className="space-y-2">
                  {clients.slice(0, 5).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedClient(c);
                        showToast(`Opened ${c.name}'s appointment`);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-left transition-colors"
                    >
                      <div>
                        <p className="text-xs text-white">{c.name}</p>
                        <p className="text-[10px] text-gray-500">
                          {c.appointmentDate}
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {c.documentsSubmitted}/{c.documentsRequired}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ClientDetail
        client={selectedClient}
        open={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        onStatusChange={handleMoveClient}
        showToast={showToast}
      />

      <ToastContainer toasts={toasts} />
    </>
  );
}
