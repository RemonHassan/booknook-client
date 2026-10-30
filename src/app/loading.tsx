import { BookOpen, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden flex flex-col justify-center">
      {/* AMBIENT BACKGROUND GLOWS WITH PULSE & ROTATION */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none animate-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:1000ms]"
      />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        {/* CENTERED HERO SPINNER & BRANDING */}
        <div className="flex flex-col items-center justify-center text-center space-y-5">
          {/* ANIMATED LOGO WITH EXPANDING RINGS */}
          <div className="relative flex items-center justify-center">
            {/* Outer expanding ring */}
            <div className="absolute -inset-3 rounded-3xl bg-emerald-500/20 blur-md animate-ping animation-duration-[2s]" />
            {/* Inner glowing halo */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-emerald-500 to-amber-400 blur-lg opacity-40 animate-pulse" />

            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-900 border border-emerald-700/80 text-emerald-400 shadow-2xl shadow-emerald-950/80">
              <BookOpen className="w-8 h-8 animate-bounce animation-duration-[1.5s]" />
            </div>
          </div>

          {/* BRAND TEXT & BADGE */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-medium shadow-inner animate-pulse">
              <Sparkles className="w-3.5 h-3.5 animate-spin animation-duration-[3s]" />
              <span>BookNook Digital Library</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-stone-200">
              Gathering Literary Gems...
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Curating titles, ratings, and reviews for your shelf.
            </p>
          </div>

          {/* SLIDING SHIMMER PROGRESS BAR */}
          <div className="w-56 h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800 relative">
            <div className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-emerald-400 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>

        {/* SKELETON CARDS GRID WITH SHIMMER SWEEP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 border-t border-stone-900">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/60 p-5 shadow-xl space-y-4"
            >
              {/* SHIMMER LIGHT OVERLAY */}
              <div
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-stone-800/20 to-transparent animate-[shimmer_2s_infinite]"
                style={{ animationDelay: `${i * 200}ms` }}
              />

              {/* IMAGE SKELETON */}
              <div className="aspect-3/4 w-full rounded-xl bg-stone-950/80 border border-stone-800/60 flex items-center justify-center relative overflow-hidden">
                <BookOpen className="w-8 h-8 text-stone-800 animate-pulse" />
              </div>

              {/* CONTENT SKELETON */}
              <div className="space-y-3 pt-1">
                {/* Title skeleton */}
                <div className="h-4 bg-stone-800/80 rounded-md w-3/4 animate-pulse" />
                {/* Author skeleton */}
                <div className="h-3 bg-stone-800/50 rounded-md w-1/2 animate-pulse" />

                {/* METADATA SKELETON GRID */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-800/80">
                  <div className="h-3 bg-stone-800/40 rounded-md animate-pulse" />
                  <div className="h-3 bg-stone-800/40 rounded-md animate-pulse" />
                </div>
              </div>

              {/* BUTTON SKELETON */}
              <div className="h-9 bg-stone-950 border border-stone-800/80 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
