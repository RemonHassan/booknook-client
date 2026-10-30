import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import BookCard, { Book } from "../common/BookCard";
import BannerSwiper from "../BannerSwiper";
import TopRatedBooks from "../TopRatedBooks";

export default async function Banner() {
  let books: Book[] = [];

  try {
    const res = await fetch(`http://localhost:4000/books`, {
      cache: "no-store",
    });

    if (res.ok) {
      books = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }

  // New Arrivals (Latest 6 books from database)
  const newArrivals = [...books].slice(-6).reverse();

  return (
    <div className="space-y-0">
      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-stone-950 text-stone-100 border-b border-stone-800/80 py-16 sm:py-24">
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
                  <p className="text-2xl font-bold text-stone-100">
                    {books.length || 1200}+
                  </p>
                  <p className="text-xs text-stone-500 mt-1">Books Available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">100%</p>
                  <p className="text-xs text-stone-500 mt-1">Free Community</p>
                </div>
              </div>
            </div>

            {/* RIGHT VISUAL DISPLAY (TOP RATED SWIPER SLIDER) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <BannerSwiper />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800/80 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fresh Additions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
                New Arrivals
              </h2>
              <p className="text-stone-400 text-sm max-w-lg">
                Explore the latest books added to our library collection.
              </p>
            </div>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>View All Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* NEW ARRIVALS GRID (CARDS) */}
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-800 bg-stone-900/50 p-12 text-center text-stone-500 text-sm">
              No new arrivals available yet.
            </div>
          )}
        </div>
      </section>
      <section>
        <TopRatedBooks></TopRatedBooks>
      </section>
    </div>
  );
}
