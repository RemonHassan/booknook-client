import Link from "next/link";
import {
  BookOpen,
  Flame,
  Compass,
  BookmarkCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Book } from "./common/BookCard";

export default async function CommunityStats() {
  let books: Book[] = [];

  try {
    const res = await fetch(`http://localhost:4000/books`, {
      cache: "no-store",
    });

    if (res.ok) {
      books = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch books for stats:", error);
  }

  // Calculate dynamic metrics from catalog
  const totalBooks = books.length;
  const totalPages = books.reduce(
    (acc, book) => acc + (Number(book.totalPages) || 0),
    0,
  );

  // Calculate top category breakdown
  const categoryCounts = books.reduce((acc: Record<string, number>, book) => {
    const cat = book.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const topCategory =
    Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "Classic";

  return (
    <section className="bg-stone-950 py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-medium">
              <Compass className="w-3.5 h-3.5" />
              <span>Community Pulse</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
              BookNook Reading Velocity
            </h2>
            <p className="text-stone-400 text-sm max-w-lg">
              Real-time snapshot of the pages shared, collected, and cataloged
              across our reader ecosystem.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Contribute a Title</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* STATS & METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: CATALOG VOLUME */}
          <div className="relative overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Shared Collection
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-stone-100">
                {totalBooks}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Active titles listed in the library
              </p>
            </div>
            <div className="pt-3 border-t border-stone-800/80 flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available for local borrowing</span>
            </div>
          </div>

          {/* CARD 2: TOTAL PAGES SHARED */}
          <div className="relative overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Collective Pages
              </span>
              <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-stone-100">
                {totalPages.toLocaleString()}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Pages cataloged for community access
              </p>
            </div>
            <div className="pt-3 border-t border-stone-800/80 flex items-center gap-2 text-xs text-stone-500">
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Ready for reading milestones</span>
            </div>
          </div>

          {/* CARD 3: DOMINANT GENRE */}
          <div className="relative overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Trending Genre
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-emerald-400 truncate">
                {topCategory}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Most cataloged genre this season
              </p>
            </div>
            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span>Community Favorite</span>
              <Link href="/books" className="text-emerald-400 hover:underline">
                Explore genre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
