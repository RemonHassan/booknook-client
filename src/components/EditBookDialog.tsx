"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Pencil, Save, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "./common/BookCard";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Classic",
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Fantasy",
  "Mystery",
  "Biography",
  "History",
  "Self-Help",
];

interface EditBookDialogProps {
  book: Book;
}

export default function EditBookDialog({ book }: EditBookDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Book>(book);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = (field: keyof Book, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { _id, id, ...rest } = form;

    const payload = {
      ...rest,
      yearOfPublishing: Number(form.yearOfPublishing),
      totalPages: Number(form.totalPages),
      rating: Number(form.rating),
    };
    // Getting middelware token
    const token = await getTokenFromClient();

    try {
      const bookId = _id || id;
      const res = await fetch(`http://localhost:4000/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Book updated successfully!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to update the book. Please try again.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="inline-flex items-center gap-2 rounded-xl border-stone-800 bg-stone-900 px-4 py-2 text-xs font-semibold text-stone-300 transition-all hover:border-emerald-800/60 hover:bg-stone-800 hover:text-white"
        >
          <Pencil className="h-3.5 w-3.5 text-emerald-400" />
          <span>Edit Book</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-stone-800 bg-stone-900 p-6 sm:p-8 text-stone-100 shadow-2xl">
        <DialogHeader className="border-b border-stone-800 pb-4">
          <DialogTitle className="text-xl font-bold tracking-tight text-stone-100">
            Edit Book Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Book Title */}
          <div className="grid gap-2">
            <Label
              htmlFor="bookName"
              className="text-xs font-semibold uppercase tracking-wider text-stone-300"
            >
              Book Title
            </Label>
            <Input
              id="bookName"
              value={form.bookName}
              onChange={(e) => update("bookName", e.target.value)}
              required
              placeholder="The Great Gatsby"
              className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Author & Category */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label
                htmlFor="author"
                className="text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Author
              </Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                required
                placeholder="F. Scott Fitzgerald"
                className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(value) => update("category", value as string)}
              >
                <SelectTrigger className="w-full rounded-xl border-stone-800 bg-stone-950 text-stone-100 focus:ring-emerald-500">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="border-stone-800 bg-stone-900 text-stone-100">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Publisher & Year */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label
                htmlFor="publisher"
                className="text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Publisher
              </Label>
              <Input
                id="publisher"
                value={form.publisher}
                onChange={(e) => update("publisher", e.target.value)}
                required
                placeholder="Scribner"
                className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="yearOfPublishing"
                className="text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Year of Publishing
              </Label>
              <Input
                id="yearOfPublishing"
                type="number"
                min="1000"
                value={form.yearOfPublishing}
                onChange={(e) => update("yearOfPublishing", e.target.value)}
                required
                placeholder="1925"
                className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Total Pages & Rating */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label
                htmlFor="totalPages"
                className="text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Total Pages
              </Label>
              <Input
                id="totalPages"
                type="number"
                min="1"
                value={form.totalPages}
                onChange={(e) => update("totalPages", e.target.value)}
                required
                placeholder="192"
                className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="rating"
                className="text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Rating (1-5)
              </Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) => update("rating", e.target.value)}
                required
                placeholder="4.5"
                className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div className="grid gap-2">
            <Label
              htmlFor="image"
              className="text-xs font-semibold uppercase tracking-wider text-stone-300"
            >
              Image URL
            </Label>
            <Input
              id="image"
              type="url"
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              required
              placeholder="https://example.com/cover.jpg"
              className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Synopsis / Review */}
          <div className="grid gap-2">
            <Label
              htmlFor="review"
              className="text-xs font-semibold uppercase tracking-wider text-stone-300"
            >
              Review / Synopsis
            </Label>
            <Textarea
              id="review"
              rows={4}
              value={form.review || ""}
              onChange={(e) => update("review", e.target.value)}
              required
              placeholder="Describe the book experience..."
              className="resize-none rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-stone-800">
            <DialogClose>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-stone-800 bg-stone-950 text-stone-400 hover:bg-stone-800 hover:text-stone-200"
              >
                <X className="mr-1.5 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-950/80 hover:bg-emerald-500 active:scale-[0.98] transition-all"
            >
              <Save className="mr-1.5 h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
