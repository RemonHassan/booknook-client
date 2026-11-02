import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Calendar,
  Building2,
  Tag,
  Hash,
  User,
  FileText,
} from "lucide-react";

import { Book } from "@/components/common/BookCard";

import Image from "next/image";
import PopoverBtn from "@/components/button/PopoverBtn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { toast } from "react-toastify";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BookdetailsPage = async ({
  params,
}: PageProps): Promise<React.JSX.Element> => {
  const { id } = await params;
  let book: Book | null = null;
  const token = await getTokenFromServer();
  try {
    const res = await fetch(`http://localhost:4000/books/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      book = await res.json();
    }
  } catch (error) {
    toast.error("Failed to fetch books");
  }

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* TOP NAVIGATION & ACTIONS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-stone-100 bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Back to All Books</span>
          </Link>
        </div>

        {/* MAIN DETAILS CARD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-stone-900 border border-stone-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* LEFT: COVER IMAGE */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative aspect-3/4 w-full max-w-sm rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl">
              <Image
                src={book.image}
                width={700}
                height={600}
                alt={book.bookName}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-3 left-3 rounded-full bg-stone-950/80 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md border border-stone-800">
                {book.category}
              </span>
            </div>
          </div>

          {/* RIGHT: CONTENT & METADATA */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* TITLE & RATING */}
              <div className="flex items-start justify-between gap-4 border-b border-stone-800/80 pb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 leading-tight">
                    {book.bookName}
                  </h1>
                  <p className="text-stone-400 text-sm font-medium mt-1 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>by {book.author}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-stone-950 px-3 py-1.5 text-sm font-bold text-amber-400 border border-stone-800 shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{Number(book.rating).toFixed(1)}</span>
                </div>
              </div>

              {/* SPECIFICATIONS GRID */}
              <div className="grid grid-cols-2 gap-4 bg-stone-950/60 rounded-xl p-4 border border-stone-800/80 text-xs">
                <div className="space-y-1">
                  <span className="text-stone-500 uppercase font-semibold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    Publisher
                  </span>
                  <p className="text-stone-200 font-medium truncate">
                    {book.publisher}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 uppercase font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    Published
                  </span>
                  <p className="text-stone-200 font-medium">
                    {book.yearOfPublishing}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 uppercase font-semibold flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-emerald-400" />
                    Pages
                  </span>
                  <p className="text-stone-200 font-medium">
                    {book.totalPages} pages
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 uppercase font-semibold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    Category
                  </span>
                  <p className="text-stone-200 font-medium">{book.category}</p>
                </div>
              </div>

              {/* REVIEW / SYNOPSIS */}
              {book.review && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    Review & Synopsis
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed bg-stone-950/40 p-4 rounded-xl border border-stone-800/60">
                    {book.review}
                  </p>
                </div>
              )}
            </div>

            {/* ACTION BUTTON */}
            <PopoverBtn book={book}></PopoverBtn>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookdetailsPage;
