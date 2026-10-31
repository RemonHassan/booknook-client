"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  Library,
  Bookmark,
  Home,
  Menu,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Links Configuration
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Books", href: "/books", icon: BookOpen },
    { name: "Add Book", href: "/add-book", icon: PlusCircle },
    { name: "My Books", href: "/my-books", icon: Library },
    { name: "My Borrows", href: "/my-borrows", icon: Bookmark },
  ];
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  return (
    <nav className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-stone-800/80 text-stone-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* BRAND LOGO & NAME */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 group-hover:bg-emerald-500 group-hover:scale-105 transition-all duration-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-stone-100 via-amber-100 to-emerald-400 bg-clip-text text-transparent">
              BookNook
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/80 border border-transparent hover:border-stone-700/50 transition-all duration-150"
                >
                  <Icon className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 transition-colors" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* DESKTOP AUTH BUTTONS */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/80 rounded-lg transition-colors border border-transparent hover:border-stone-700/80"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-4.5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md shadow-emerald-950/60 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            >
              Register
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-xl transition-colors border border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800/80 bg-stone-900/98 px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-stone-300 hover:bg-stone-800/80 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5 text-stone-400 group-hover:text-emerald-400 transition-colors" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-800/80 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center py-2.5 text-center text-sm font-medium text-stone-200 border border-stone-700/80 hover:bg-stone-800 rounded-xl transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center py-2.5 text-center text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-950/50 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
