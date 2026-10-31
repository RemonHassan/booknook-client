import Link from "next/link";
import { BookX, ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-stone-950 text-stone-100 px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden flex flex-col items-center justify-center">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-md mx-auto text-center space-y-8 relative z-10">
        {/* ICON & 404 BADGE CONTAINER */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Glowing back-layer accent */}
          <div className="absolute w-24 h-24 rounded-3xl bg-emerald-500/10 blur-xl animate-pulse" />

          {/* Central 404 Icon Card */}
          <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-stone-900 border border-emerald-800/80 text-emerald-400 shadow-2xl shadow-emerald-950/80 mb-4">
            <BookX className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Error 404 • Lost Page</span>
          </div>
        </div>

        {/* HEADLINE & DESCRIPTIVE TEXT */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
            This Chapter Doesn&apos;t Exist
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed max-w-sm mx-auto">
            The page you are looking for seems to have been misplaced, removed,
            or never written in the BookNook catalog.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/80 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Explore All Books</span>
          </Link>
        </div>

        {/* FOOTER NOTE */}
        <div className="pt-8 border-t border-stone-900/80">
          <p className="text-[11px] text-stone-600">
            Need help? Double-check your URL or return to the library dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
