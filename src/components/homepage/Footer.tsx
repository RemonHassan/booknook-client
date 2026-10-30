"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* BRAND LOGO & NAME */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 group-hover:bg-emerald-500 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-stone-100 via-amber-100 to-emerald-400 bg-clip-text text-transparent">
              BookNook
            </span>
          </Link>

          {/* COPYRIGHT */}
          <p className="text-xs text-stone-500">
            © 2026 BookNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
