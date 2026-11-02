"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

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

interface DeleteBookDialogProps {
  id: string;
}

export default function DeleteBookDialog({ id }: DeleteBookDialogProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteBook = async () => {
    setIsDeleting(true);
    // middleware
    const token = await getTokenFromClient();

    try {
      const res = await fetch(`http://localhost:4000/books/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Book deleted successfully!");
        router.push("/books");
        router.refresh();
      } else {
        toast.error("Failed to delete the book. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("An error occurred while deleting the book.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="outline"
          className="inline-flex items-center gap-2 rounded-xl border-stone-800 bg-stone-900 px-4 py-2 text-xs font-semibold text-rose-400 hover:border-rose-900/50 hover:bg-rose-950/30 hover:text-rose-300 transition-all duration-150"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Book</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md rounded-2xl border-stone-800 bg-stone-900 p-6 sm:p-8 text-stone-100 shadow-2xl">
        <AlertDialogHeader className="space-y-4">
          {/* ICON BADGE */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/80 border border-rose-800/60 text-rose-400 shadow-inner">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="space-y-1.5">
            <AlertDialogTitle className="text-xl font-bold tracking-tight text-stone-100">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-stone-400 leading-relaxed">
              This action cannot be undone. This will permanently remove this
              book title and its review data from the library database.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
          <AlertDialogCancel className="rounded-xl border-stone-800 bg-stone-950 text-xs font-semibold text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-all">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteBook}
            disabled={isDeleting}
            className="rounded-xl bg-rose-600 px-5 text-xs font-semibold text-white hover:bg-rose-500 shadow-md shadow-rose-950/80 transition-all active:scale-[0.98]"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Confirm Delete</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
