"use client";

import { User as UserIcon, Mail, BookOpen } from "lucide-react";
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
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

interface PopoverBtnProps {
  book: Book;
}

const PopoverBtn = ({ book }: PopoverBtnProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBorrowing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userBorrowData = Object.fromEntries(formData.entries()) as {
      borrowDate: string;
    };
    const { _id, ...bookDetails } = book;
    const data = {
      userName: user?.name,
      email: user?.email,
      UserImage: user?.image,
      ...bookDetails,
      borrowDate: userBorrowData?.borrowDate,
      borrowingDate: new Date(),
    };
    const res = await fetch(`http://localhost:4000/borrowing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const borrowing = await res.json();
    if (res) {
      toast.success(`${bookDetails.bookName} added to your borrow list`);
      redirect("/books");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-950/60 hover:bg-emerald-500 active:scale-[0.98] transition-all cursor-pointer">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Borrow Book</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        className="w-72 rounded-2xl border-stone-800 bg-stone-900/95 p-5 text-stone-100 shadow-2xl backdrop-blur-md"
      >
        <PopoverHeader className="space-y-4">
          <PopoverTitle className="text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>Confirm Borrow Details</span>
            </div>

            {/* USER INFO DETAILS */}
            <div className="rounded-xl border border-stone-800 bg-stone-950 p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold text-xs">
                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon className="w-3.5 h-3.5" />
                  )}
                </div>
                <p className="text-sm font-bold text-stone-100 truncate">
                  {user?.name || "Guest Reader"}
                </p>
              </div>

              {user?.email && (
                <p className="text-xs text-stone-400 truncate flex items-center gap-1.5 pt-0.5">
                  <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{user.email}</span>
                </p>
              )}
            </div>
          </PopoverTitle>

          {/* BORROW ACTION BUTTON */}
          <form onSubmit={handleBorrowing}>
            <div className="pt-2">
              <h3>How long do you wanna keep?</h3>
              <Input
                id="borrowDate"
                type="date"
                name="borrowDate"
                aria-label="Borrow date"
                className="mt-4"
              />
              <Button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-950/60 hover:bg-emerald-500 active:scale-[0.98] transition-all cursor-pointer"
              >
                {" "}
                Borrow this book
              </Button>
              {/* <BorrowButton book={book} /> */}
            </div>
          </form>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverBtn;
