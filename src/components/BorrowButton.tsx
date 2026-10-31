"use client";

import { useState } from "react";
import { BookmarkPlus, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

interface BorrowButtonProps {
  bookName: string;
}

export default function BorrowButton({ bookName }: BorrowButtonProps) {
  const [isBorrowed, setIsBorrowed] = useState<boolean>(false);

  const handleBorrow = () => {
    setIsBorrowed(true);
    toast.success(`You have successfully borrowed "${bookName}"!`);
  };

  return (
    <button
      type="button"
      onClick={handleBorrow}
      disabled={isBorrowed}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 shadow-lg ${
        isBorrowed
          ? "bg-stone-800 text-stone-400 border border-stone-700 cursor-not-allowed"
          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/80 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      }`}
    >
      {isBorrowed ? (
        <>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Borrowed</span>
        </>
      ) : (
        <>
          <BookmarkPlus className="w-5 h-5" />
          <span>Borrow This Book</span>
        </>
      )}
    </button>
  );
}
