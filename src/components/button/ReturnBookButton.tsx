"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, AlertTriangle, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface ReturnBookButtonProps {
  bookId: string;
  email: string;
}

export default function ReturnBookButton({
  bookId,
  email,
}: ReturnBookButtonProps) {
  const [isReturning, setIsReturning] = useState<boolean>(false);
  const router = useRouter();

  const handleReturnBook = async () => {
    setIsReturning(true);
    const token = await getTokenFromClient();

    try {
      const res = await fetch(`http://localhost:4000/return`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Book returned successfully!");
        router.refresh();
      } else {
        toast.error(data.error || "Failed to return book.");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      toast.error("An error occurred while returning the book.");
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="outline"
          className="inline-flex items-center gap-2 rounded-xl border-amber-800/60 bg-amber-950/30 px-3.5 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 hover:border-amber-700 transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Return Book</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md rounded-2xl border-stone-800 bg-stone-900 p-6 sm:p-8 text-stone-100 shadow-2xl">
        <AlertDialogHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-950/80 border border-amber-800/60 text-amber-400 shadow-inner">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="space-y-1.5">
            <AlertDialogTitle className="text-xl font-bold tracking-tight text-stone-100">
              Confirm Book Return
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-stone-400 leading-relaxed">
              Are you sure you want to return this book? This will remove it
              from your personal borrows and restore 1 copy to the library
              stock.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
          <AlertDialogCancel className="rounded-xl border-stone-800 bg-stone-950 text-xs font-semibold text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-all">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReturnBook}
            disabled={isReturning}
            className="rounded-xl bg-amber-600 px-5 text-xs font-semibold text-white hover:bg-amber-500 shadow-md shadow-amber-950/80 transition-all active:scale-[0.98]"
          >
            {isReturning ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                <span>Returning...</span>
              </>
            ) : (
              <span>Confirm Return</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
