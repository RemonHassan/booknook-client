import Image from "next/image";
import Link from "next/link";
import { Star, BookOpen, Calendar, Building2 } from "lucide-react";

export interface Book {
  _id?: string;
  id?: string;
  bookName: string;
  author: string;
  image: string;
  review?: string;
  totalPages: number;
  rating: number;
  category: string;
  publisher: string;
  yearOfPublishing: number;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const bookId = book._id || book.id || "";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900 p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-emerald-800/60 hover:shadow-2xl hover:shadow-emerald-950/30">
      <div>
        {/* COVER IMAGE CONTAINER */}
        <div className="relative mb-5 aspect-3/4 w-full overflow-hidden rounded-xl bg-stone-950 border border-stone-800/60">
          <Image
            src={book.image}
            alt={book.bookName}
            width={500}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* CATEGORY BADGE */}
          <span className="absolute top-3 left-3 rounded-full bg-stone-950/80 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md border border-stone-800">
            {book.category}
          </span>

          {/* RATING BADGE */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-stone-950/90 px-2.5 py-1 text-xs font-semibold text-amber-400 backdrop-blur-md border border-stone-800">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{book.rating}</span>
          </div>
        </div>

        {/* BOOK DETAILS */}
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-lg font-bold text-stone-100 group-hover:text-emerald-400 transition-colors">
            {book.bookName}
          </h3>
          <p className="line-clamp-1 text-sm font-medium text-stone-400">
            by {book.author}
          </p>

          {/* METADATA GRID */}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
            <div className="flex items-center gap-1.5 truncate">
              <Building2 className="h-3.5 w-3.5 shrink-0 text-stone-500" />
              <span className="truncate">{book.publisher}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-stone-500" />
              <span>{book.yearOfPublishing}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <BookOpen className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>{book.totalPages} Pages</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="mt-6">
        <Link
          href={bookId ? `/books/${bookId}` : "#"}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-800 bg-stone-950 py-2.5 text-xs font-semibold text-stone-200 transition-all hover:border-emerald-700/60 hover:bg-emerald-600 hover:text-white active:scale-[0.98]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
