import Link from "next/link";
import {
  Star,
  Award,
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
} from "lucide-react";
import { Book } from "./common/BookCard";
import Image from "next/image";

export default async function TopRatedBooks() {
  let topBooks: Book[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);

    if (res.ok) {
      const data: Book[] = await res.json();

      // Sort books by rating descending and pick top 3
      topBooks = [...data]
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 3);
    }
  } catch (error) {
    console.error("Failed to fetch top rated books:", error);
  }

  return (
    <section className="bg-stone-950 py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 text-amber-400 border border-amber-800/60 text-xs font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>Community Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
              Top Rated Books
            </h2>
            <p className="text-stone-400 text-sm max-w-lg">
              Highest community-reviewed titles cataloged in the BookNook
              library.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Explore All Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* TOP 3 BOOKS GRID */}
        {topBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topBooks.map((book, index) => {
              const bookId = book._id || book.id || "";

              return (
                <div
                  key={bookId || index}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900 p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-amber-800/60 hover:shadow-2xl hover:shadow-amber-950/20"
                >
                  <div>
                    {/* COVER IMAGE & BADGES */}
                    <div className="relative mb-5 aspect-3/4 w-full overflow-hidden rounded-xl bg-stone-950 border border-stone-800/60">
                      <Image
                        src={book.image}
                        width={600}
                        height={500}
                        alt={book.bookName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* RANK BADGE */}
                      <span className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-stone-950/90 text-xs font-extrabold text-amber-400 border border-amber-800/80 backdrop-blur-md shadow-md">
                        #{index + 1}
                      </span>

                      {/* RATING BADGE */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-stone-950/90 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-800/80 backdrop-blur-md shadow-md">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{Number(book.rating).toFixed(1)}</span>
                      </div>
                    </div>

                    {/* BOOK CONTENT */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        {book.category}
                      </span>
                      <h3 className="line-clamp-1 text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {book.bookName}
                      </h3>
                      <p className="line-clamp-1 text-sm font-medium text-stone-400">
                        by {book.author}
                      </p>

                      {/* REVIEW SNIPPET */}
                      {book.review && (
                        <p className="mt-3 line-clamp-2 text-xs italic text-stone-400 bg-stone-950/60 p-3 rounded-xl border border-stone-800/60 leading-relaxed">
                          {book.review}
                        </p>
                      )}

                      {/* METADATA */}
                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building2 className="h-3.5 w-3.5 shrink-0 text-stone-500" />
                          <span className="truncate">{book.publisher}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-stone-500" />
                          <span>{book.yearOfPublishing}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="mt-6">
                    <Link
                      href={bookId ? `/books/${bookId}` : "/books"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-800 bg-stone-950 py-2.5 text-xs font-semibold text-stone-200 transition-all hover:border-amber-700/60 hover:bg-amber-600 hover:text-white active:scale-[0.98]"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-800 bg-stone-900/50 p-12 text-center text-stone-500 text-sm">
            No top rated books found.
          </div>
        )}
      </div>
    </section>
  );
}
