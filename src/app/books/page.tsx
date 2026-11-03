import BookCard, { Book } from "@/components/common/BookCard";
import { Library } from "lucide-react";

const AllBooksPage = async () => {
  let books: Book[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store",
    });

    if (res.ok) {
      books = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }

  return (
    <main className="min-h-screen bg-stone-950 px-4 sm:px-6 lg:px-8 py-12 text-stone-100">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-medium">
              <Library className="w-3.5 h-3.5" />
              <span>Catalog Browser</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
              All Books
            </h1>
            <p className="text-stone-400 text-sm max-w-lg">
              Explore the entire community collection available for reading and
              borrowing.
            </p>
          </div>

          <div className="text-xs text-stone-400 font-medium">
            Showing{" "}
            <span className="text-emerald-400 font-bold">{books.length}</span>{" "}
            titles
          </div>
        </div>

        {/* BOOKS GRID */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
            {books.map((book, index) => (
              <BookCard key={book._id || book.id || index} book={book} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-800 bg-stone-900/50 p-12 text-center space-y-3">
            <Library className="h-10 w-10 text-stone-600" />
            <h3 className="text-lg font-bold text-stone-300">No Books Found</h3>
            <p className="text-xs text-stone-500 max-w-sm">
              Make sure your backend server is running on{" "}
              <code className="text-emerald-400">http://localhost:4000</code> or
              add some books first.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllBooksPage;
