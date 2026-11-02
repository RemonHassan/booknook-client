"use client";

import {
  User as UserIcon,
  Mail,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Book } from "../common/BookCard";
import { authClient } from "@/lib/auth-client";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface PopoverBtnProps {
  book: Book;
  isAlreadyBorrowed?: boolean;
}

const PopoverBtn = ({ book, isAlreadyBorrowed = false }: PopoverBtnProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBorrowing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAlreadyBorrowed) return;

    const formData = new FormData(e.currentTarget);
    const userBorrowData = Object.fromEntries(formData.entries()) as {
      borrowDate: string;
    };
    const { _id, ...bookDetails } = book;

    const data = {
      bookId: _id || book.id,
      userName: user?.name,
      email: user?.email,
      UserImage: user?.image,
      ...bookDetails,
      borrowDate: userBorrowData?.borrowDate,
      borrowingDate: new Date(),
    };

    try {
      const token = await getTokenFromClient();
      const res = await fetch(`http://localhost:4000/borrowing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(`${bookDetails.bookName} added to your borrow list`);
        router.push("/books");
        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to borrow book");
      }
    } catch (error) {
      toast.error("An error occurred while borrowing");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          disabled={isAlreadyBorrowed}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wide transition-all duration-200 ${
            isAlreadyBorrowed
              ? "bg-stone-800/80 text-stone-500 border border-stone-700/50 cursor-not-allowed opacity-60 shadow-none"
              : "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 hover:bg-emerald-500 hover:shadow-emerald-900/50 active:scale-[0.98] cursor-pointer"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isAlreadyBorrowed ? "Already Borrowed" : "Borrow Book"}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 rounded-2xl border border-stone-800 bg-stone-900/95 p-5 text-stone-100 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
      >
        <PopoverHeader className="space-y-4">
          <PopoverTitle className="text-left space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Confirm Reservation</span>
              </div>
            </div>

            {/* USER INFO DETAILS CARD */}
            <div className="rounded-xl border border-stone-800/80 bg-stone-950/80 p-3.5 space-y-2 shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold text-xs shadow-sm">
                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-stone-100 truncate">
                    {user?.name || "Guest Reader"}
                  </p>
                  {user?.email && (
                    <p className="text-[11px] text-stone-400 truncate flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </PopoverTitle>

          {/* BORROW ACTION FORM */}
          <form onSubmit={handleBorrowing} className="space-y-4">
            <div className="space-y-2 pt-1">
              <label
                htmlFor="borrowDate"
                className="text-xs font-semibold text-stone-300 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-green-400" />
                <span>Return Date</span>
              </label>
              <Input
                id="borrowDate"
                type="date"
                name="borrowDate"
                required
                aria-label="Borrow date"
                className="mt-4 text-xs font-semibold bg-stone-500 border-stone-800 text-stone-100 placeholder:text-stone-400 focus-visible:ring-emerald-500 focus-visible:border-emerald-500/80 transition-all scheme-dark [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>

            <Button
              type="submit"
              disabled={isAlreadyBorrowed}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-950/60 hover:bg-emerald-500 active:scale-[0.98] transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-green-500" />
              <span>
                {isAlreadyBorrowed ? "Already Borrowed" : "Confirm & Borrow"}
              </span>
            </Button>
          </form>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverBtn;
