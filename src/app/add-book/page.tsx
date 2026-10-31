"use client";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

const initialForm = {
  bookName: "",
  author: "",
  category: "",
  publisher: "",
  yearOfPublishing: "",
  totalPages: "",
  rating: "",
  image: "",
  review: "",
};

export default function AddBookPage() {
  const [form, setForm] = useState(initialForm);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Calling the API
    const res = await fetch(`http://localhost:4000/add-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(`A book was is added`);
      router.push("/books"); // 3. Redirect to the books page
    } else {
      toast.error("Failed to add the book. Please try again.");
    }

    // const payload = {
    //   ...form,
    //   yearOfPublishing: Number(form.yearOfPublishing),
    //   totalPages: Number(form.totalPages),
    //   rating: Number(form.rating),
    // };

    // console.log("Submitted Book Data:", payload);
  };
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-12 text-stone-100">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-light tracking-tight text-stone-100 md:text-5xl">
          Add New Book
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-sm border border-stone-800 bg-stone-900 p-8 shadow-sm"
        >
          <div className="grid gap-5">
            {/* Book Name */}
            <div className="grid gap-2">
              <Label htmlFor="bookName" className="text-stone-300">
                Book Title
              </Label>
              <Input
                id="bookName"
                placeholder="The Great Gatsby"
                value={form.bookName}
                onChange={(event) => update("bookName", event.target.value)}
                required
                className="border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
              />
            </div>

            {/* Author + Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="author" className="text-stone-300">
                  Author
                </Label>
                <Input
                  id="author"
                  placeholder="F. Scott Fitzgerald"
                  value={form.author}
                  onChange={(event) => update("author", event.target.value)}
                  required
                  className="border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-stone-300">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => update("category", value ?? "")}
                >
                  <SelectTrigger className="w-full border-stone-800 bg-stone-950 text-stone-100 focus:ring-emerald-500">
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

            {/* Publisher + Year of Publishing */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="publisher" className="text-stone-300">
                  Publisher
                </Label>
                <Input
                  id="publisher"
                  placeholder="Scribner"
                  value={form.publisher}
                  onChange={(event) => update("publisher", event.target.value)}
                  required
                  className="border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="yearOfPublishing" className="text-stone-300">
                  Year of Publishing
                </Label>
                <Input
                  id="yearOfPublishing"
                  type="number"
                  placeholder="1925"
                  value={form.yearOfPublishing}
                  onChange={(event) =>
                    update("yearOfPublishing", event.target.value)
                  }
                  required
                  min="1000"
                  className="border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            {/* Total Pages + Rating */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="totalPages" className="text-stone-300">
                  Total Pages
                </Label>
                <Input
                  id="totalPages"
                  type="number"
                  placeholder="192"
                  value={form.totalPages}
                  onChange={(event) => update("totalPages", event.target.value)}
                  required
                  min="1"
                  className="border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating" className="text-stone-300">
                  Rating (1-5)
                </Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  placeholder="4.5"
                  value={form.rating}
                  onChange={(event) => update("rating", event.target.value)}
                  required
                  min="1"
                  max="5"
                  className="border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="image" className="text-stone-300">
                Image URL
              </Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/cover.jpg"
                value={form.image}
                onChange={(event) => update("image", event.target.value)}
                required
                className="border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
              />
            </div>

            {/* Review / Description */}
            <div className="grid gap-2">
              <Label htmlFor="review" className="text-stone-300">
                Review / Synopsis
              </Label>
              <Textarea
                id="review"
                placeholder="Describe the book experience..."
                className="min-h-36 border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500"
                value={form.review}
                onChange={(event) => update("review", event.target.value)}
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-rose-900/50 bg-stone-950 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
            >
              <Trash2 className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <PlusCircle className="w-4 h-4" />
              Add Book
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
