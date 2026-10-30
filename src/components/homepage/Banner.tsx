import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  BookMarked,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-stone-950 text-stone-100 border-b border-stone-800/80 py-16 sm:py-24">
      {/* BACKGROUND DECORATIVE GRADIENTS */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-medium shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Ultimate Personal Digital Library</span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-100 leading-[1.15]">
              Discover, Share, and Borrow Your Next{" "}
              <span className="bg-linear-to-r from-emerald-400 via-amber-200 to-emerald-200 bg-clip-text text-transparent">
                Great Read
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-base sm:text-lg text-stone-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              BookNook makes cataloging your personal collection and borrowing
              books seamless. Track your reading journey and connect with a
              community of passionate readers.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/books"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
              >
                <span>Explore All Books</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/add-book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 transition-all duration-150"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Add a Book</span>
              </Link>
            </div>

            {/* METRICS / HIGHLIGHTS */}
            <div className="pt-8 border-t border-stone-900 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-stone-100">1,200+</p>
                <p className="text-xs text-stone-500 mt-1">Books Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">100%</p>
                <p className="text-xs text-stone-500 mt-1">Free Community</p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL DISPLAY */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* FEATURED CARD STACK */}
            <div className="relative w-full max-w-sm">
              {/* BACK CARD ACCENT */}
              <div className="absolute inset-0 bg-emerald-600/20 rounded-2xl transform rotate-6 scale-95 blur-sm" />

              {/* MAIN BOOK CARD */}
              <div className="relative bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Featured Pick
                    </span>
                  </div>
                  <span className="text-[10px] font-medium bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-800/60">
                    Available Now
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-20 h-28 bg-stone-800 rounded-lg shrink-0 flex items-center justify-center border border-stone-700/60 shadow-md">
                    <BookOpen className="w-8 h-8 text-stone-500" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-stone-100 leading-snug">
                      The Great Gatsby
                    </h3>
                    <p className="text-xs text-stone-400">
                      F. Scott Fitzgerald
                    </p>
                    <p className="text-xs text-emerald-400 font-medium">
                      Classic Literature
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Owner</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>4 Borrows</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
