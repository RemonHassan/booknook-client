import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface BorrowedBook {
  _id: string;
  bookId?: string;
  bookName: string;
  title: string;
  coverImage?: string;
  image?: string;
  author?: string;
  borrowDate?: string;
  returnDate?: string;
  borrowingDate?: string;
}

const MyBorrowPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  let borrowedBooks: BorrowedBook[] = [];
  // middleWare
  const token = await getTokenFromServer();

  if (user?.email) {
    try {
      const res = await fetch(
        `http://localhost:4000/my-borrowing/${user.email}`,
        {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        borrowedBooks = await res.json();
      }
    } catch (error) {
      console.error("Failed to fetch borrowed books:", error);
    }
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
              <span>Personal Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
              My Borrowed Books
            </h1>
            <p className="text-stone-400 text-sm">
              Manage and track all books currently borrowed under your account.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 px-4 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Browse More Books</span>
          </Link>
        </div>

        {/* BORROWED BOOKS TABLE */}
        {borrowedBooks.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/60 backdrop-blur-md shadow-2xl">
            <table className="w-full text-left text-sm text-stone-300">
              <thead className="bg-stone-950/80 text-xs uppercase tracking-wider text-stone-400 border-b border-stone-800">
                <tr>
                  <th scope="col" className="py-4 px-6">
                    Book Cover
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Title & Details
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Borrow Date
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Return Date
                  </th>
                  <th scope="col" className="py-4 px-6 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {borrowedBooks.map((item) => {
                  const bookImage =
                    item.coverImage || item.image || "/placeholder-book.png";
                  const borrowDateFormatted = item.borrowingDate
                    ? new Date(item.borrowingDate).toLocaleDateString()
                    : "N/A";

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-stone-800/40 transition-colors"
                    >
                      {/* IMAGE */}
                      <td className="py-4 px-6">
                        <div className="relative h-16 w-12 rounded-lg overflow-hidden border border-stone-700 shadow-sm bg-stone-950">
                          <Image
                            src={bookImage}
                            alt={item.title || "Book cover"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* TITLE */}
                      <td className="py-4 px-6">
                        <p className="font-semibold text-stone-100 text-sm">
                          {item.bookName}
                        </p>
                        {item.author && (
                          <p className="text-xs text-stone-400 mt-0.5">
                            by {item.author}
                          </p>
                        )}
                      </td>

                      {/* BORROW DATE */}
                      <td className="py-4 px-6 text-xs text-stone-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{borrowDateFormatted}</span>
                        </div>
                      </td>

                      {/* RETURN DATE */}
                      <td className="py-4 px-6 text-xs text-stone-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            {item.returnDate || item.borrowDate || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* RETURN BUTTON */}
                      <td className="py-4 px-6 text-right">
                        <Button
                          variant="outline"
                          className="rounded-xl border-rose-900/40 bg-rose-950/30 px-3.5 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-800/60 transition-all cursor-pointer"
                        >
                          Return Book
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="rounded-2xl border border-dashed border-stone-800 bg-stone-900/40 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-stone-200">
                No borrowed books found
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                You haven&apos;t borrowed any books from BookNook yet. Explore
                our catalog and start reading today!
              </p>
            </div>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/80 transition-all"
            >
              <span>Explore Books</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowPage;
