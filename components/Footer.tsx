import Link from "next/link";
import { Calendar, FileCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <FileCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-white">
              TaxScheduler
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <Link
              href="/demo"
              className="hover:text-brand-400 transition-colors"
            >
              Live Demo
            </Link>
            <Link
              href="/developers"
              className="hover:text-brand-400 transition-colors"
            >
              Developer Docs
            </Link>
            <Link
              href="/research"
              className="hover:text-brand-400 transition-colors"
            >
              How we found this idea
            </Link>
          </nav>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Built for tax season 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
