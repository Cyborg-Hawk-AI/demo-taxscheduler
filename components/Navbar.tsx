"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileCheck, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/demo", label: "Demo" },
  { href: "/developers", label: "Developers" },
  { href: "/research", label: "Research" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-900/30">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white group-hover:text-brand-400 transition-colors">
              TaxScheduler
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-brand-600/20 text-brand-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo"
              className="ml-3 px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-brand-900/40"
            >
              Try Demo
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? "bg-brand-600/20 text-brand-400"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-lg bg-brand-600 text-white text-sm font-semibold text-center"
            >
              Try Demo
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
