"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookMarked,
  Star,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Book } from "./common/BookCard";
import Image from "next/image";

export default function BannerSwiper() {
  const [randomBooks, setRandomBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      try {
        const res = await fetch(`http://localhost:4000/books`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data: Book[] = await res.json();

          // Shuffle array to get random selection
          const shuffled = [...data].sort(() => 0.5 - Math.random());

          // Pick 3 random books
          setRandomBooks(shuffled.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch books for Swiper:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomBooks();
  }, []);

  // Fallback items if API is empty or offline
  const fallbackSlides = [
    {
      bookName: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Classic Literature",
      rating: 4.8,
      image: "https://i.ibb.co.com/khHN7Pk/9780143454212.jpg",
      review:
        "A timeless masterpiece exploring wealth, love, and disillusionment during the Jazz Age.",
    },
    {
      bookName: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
      review:
        "An unforgettable tale of courage, human compassion, and justice in the American South.",
    },
    {
      bookName: "1984",
      author: "George Orwell",
      category: "Dystopian Sci-Fi",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80",
      review:
        "A striking depiction of political surveillance, truth control, and individual freedom.",
    },
  ];

  const slides = randomBooks.length > 0 ? randomBooks : fallbackSlides;

  if (loading) {
    return (
      <div className="relative w-full max-w-md h-80 rounded-2xl border border-stone-800 bg-stone-900/95 flex items-center justify-center text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 bg-emerald-600/20 rounded-2xl transform rotate-3 scale-95 blur-sm" />

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="rounded-2xl border border-stone-800 bg-stone-900/95 shadow-2xl p-2 pb-8"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="p-4 sm:p-6 space-y-4">
            {/* SLIDE HEADER */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Featured Choice
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-950/80 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-emerald-800/60">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>
                  {slide.rating ? Number(slide.rating).toFixed(1) : "5.0"}
                </span>
              </div>
            </div>

            {/* TITLE & DETAILS */}
            <div className="flex gap-4 items-center">
              <Image
                src={slide.image}
                width={300}
                height={100}
                alt={slide.bookName}
                className="w-20 h-28 object-cover rounded-lg bg-stone-800 shrink-0 border border-stone-700/60 shadow-md"
              />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-stone-100 leading-snug line-clamp-1">
                  {slide.bookName}
                </h3>
                <p className="text-xs text-stone-400">by {slide.author}</p>
                <p className="text-xs text-emerald-400 font-medium">
                  {slide.category}
                </p>
              </div>
            </div>

            {/* REVIEW */}
            <p className="text-xs text-stone-300 italic line-clamp-3 bg-stone-950/70 p-3 rounded-xl border border-stone-800/80 leading-relaxed">
              {slide.review}
            </p>

            {/* BROWSE BOOKS BUTTON */}
            <div className="pt-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Selection</span>
              </div>
              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-950/80"
              >
                <span>Browse Books</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
