import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Building2,
  Calendar,
  Sparkles,
  User,
  Plus,
  ArrowLeft,
} from "lucide-react";
import EditBookDialog from "@/components/EditBookDialog";
import { Book } from "@/components/common/BookCard";
import DeleteBookDialog from "@/components/DeleteBookDailog";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-4">
        <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-8 text-center max-w-md space-y-4">
          <BookOpen className="w-10 h-10 text-emerald-400 mx-auto" />
          <h2 className="text-xl font-bold">Authentication Required</h2>
          <p className="text-xs text-stone-400">
            Please log in to view and manage the books you added to BookNook.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  let myBooks: Book[] = [];
  // middleWare
  const token = await getTokenFromServer();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/user/${user.email}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.ok) {
      myBooks = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch user added books:", error);
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contributor Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
              My Added Books
            </h1>
            <p className="text-stone-400 text-sm">
              Books you have contributed to the BookNook library catalog.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 px-4 py-2.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Catalog</span>
            </Link>
            <Link
              href="/add-book"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/80 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Book</span>
            </Link>
          </div>
        </div>

        {/* BOOKS CARDS GRID */}
        {myBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myBooks.map((book) => {
              const bookTitle =
                book.bookName || book.bookName || "Untitled Book";

              return (
                <div
                  key={book._id}
                  className="group rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-md transition-all hover:border-stone-700 hover:bg-stone-900/90 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    {/* BOOK COVER IMAGE */}
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-stone-950 border border-stone-800">
                      <Image
                        src={book.image || "/placeholder-book.png"}
                        alt={bookTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 right-2.5 rounded-full border border-stone-700/80 bg-stone-950/90 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 backdrop-blur-sm">
                        {book.category}
                      </span>
                    </div>

                    {/* BOOK DETAILS */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-stone-100 text-base line-clamp-1 group-hover:text-emerald-400 transition-colors">
                        {bookTitle}
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-1">
                        by {book.author}
                      </p>
                    </div>

                    {/* METADATA GRID */}
                    <div className="grid grid-cols-2 gap-2 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
                      <div className="flex items-center gap-1.5 rounded-lg border border-stone-800/50 bg-stone-950/60 px-2.5 py-1.5 min-w-0">
                        <Building2 className="h-3.5 w-3.5 shrink-0 text-stone-500" />
                        <span className="truncate text-stone-300 font-medium">
                          {book.publisher}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-lg border border-stone-800/50 bg-stone-950/60 px-2.5 py-1.5 min-w-0">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-stone-500" />
                        <span className="truncate text-stone-300 font-medium">
                          {book.yearOfPublishing}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-lg border border-stone-800/50 bg-stone-950/60 px-2.5 py-1.5 min-w-0">
                        <BookOpen className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span className="truncate text-stone-200 font-medium">
                          {book.totalPages} Pages
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-lg border border-stone-800/50 bg-stone-950/60 px-2.5 py-1.5 min-w-0">
                        <User className="h-3.5 w-3.5 shrink-0 text-amber-400/90" />
                        <span className="text-stone-400 truncate">
                          <strong className="font-semibold text-stone-200">
                            {book.userName || "Admin"}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS (VIEW & EDIT) */}
                  <div className="pt-4 mt-2 border-t border-stone-800/80 flex items-center gap-2">
                    <div>
                      <DeleteBookDialog id={book._id || book.id || ""} />
                    </div>

                    {/* PASS INDIVIDUAL BOOK OBJECT TO EDIT DIALOG */}
                    <div className="w-1/2">
                      <EditBookDialog book={book} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="rounded-2xl border border-dashed border-stone-800 bg-stone-900/40 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-stone-200">
                You haven&apos;t added any books yet
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Share your favorite reads with the BookNook community by adding
                a new book to the library.
              </p>
            </div>
            <Link
              href="/add-book"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/80 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Book</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
