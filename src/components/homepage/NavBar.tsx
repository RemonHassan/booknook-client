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
  LogOut,
  User as UserIcon,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

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

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-stone-950/80 backdrop-blur-xl border-b border-stone-800/60 text-stone-100 shadow-2xl shadow-black/40 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* BRAND LOGO & NAME */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none rounded-xl p-1"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-emerald-500 to-amber-500 opacity-30 blur-sm group-hover:opacity-75 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 group-hover:border-emerald-500/50 transition-all duration-200">
                <BookOpen className="w-5 h-5 text-emerald-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight bg-linear-to-r from-stone-100 via-stone-200 to-emerald-400 bg-clip-text text-transparent">
              Book<span className="text-emerald-400">Nook</span>
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-1.5 bg-stone-900/60 p-1.5 rounded-2xl border border-stone-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 border border-transparent hover:border-stone-700/50 transition-all duration-150"
                >
                  <Icon className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* DESKTOP AUTH / PROFILE POPOVER */}
          {user ? (
            <div className="hidden lg:block">
              <Popover>
                <PopoverTrigger
                  render={
                    <button className="flex items-center gap-3 p-1 rounded-full border border-stone-800 hover:border-emerald-500/50 bg-stone-900/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 group">
                      <Avatar className="h-9 w-9 border border-stone-700 group-hover:border-emerald-400 transition-colors">
                        <AvatarImage
                          src={user?.image as string}
                          alt={user?.name}
                        />
                        <AvatarFallback className="bg-emerald-950 text-emerald-400 font-bold text-sm">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  }
                />
                <PopoverContent className="w-72 rounded-2xl border-stone-800 bg-stone-900/95 p-5 backdrop-blur-xl text-stone-100 shadow-2xl mt-2">
                  <PopoverHeader className="space-y-3">
                    <PopoverTitle>
                      <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
                        <Avatar className="h-10 w-10 border border-emerald-500/40">
                          <AvatarImage src={user?.image as string} />
                          <AvatarFallback className="bg-emerald-950 text-emerald-400 font-bold">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-stone-100 truncate">
                            {user?.name}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <Sparkles className="w-3 h-3" /> Member
                          </span>
                        </div>
                      </div>
                    </PopoverTitle>
                    <PopoverDescription>
                      <div className="space-y-4 pt-1">
                        <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-2.5 text-xs text-stone-400 truncate">
                          {user?.email}
                        </div>
                        <Button
                          onClick={handleSignOut}
                          variant="destructive"
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-900/40 text-xs font-semibold py-2.5 transition-all shadow-sm"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </Button>
                      </div>
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4.5 py-2 text-xs font-semibold text-stone-300 hover:text-white hover:bg-stone-900 rounded-xl transition-all border border-stone-800 hover:border-stone-700"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="relative inline-flex items-center justify-center px-4.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/80 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                Register
              </Link>
            </div>
          )}

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex lg:hidden items-center gap-3">
            {user && (
              <Avatar className="h-8 w-8 border border-stone-700">
                <AvatarImage src={user?.image as string} />
                <AvatarFallback className="bg-emerald-950 text-emerald-400 text-xs">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2.5 text-stone-300 hover:text-white hover:bg-stone-900 rounded-xl transition-colors border border-stone-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-emerald-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800/80 bg-stone-950/95 px-4 pt-4 pb-6 space-y-4 backdrop-blur-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-stone-300 hover:bg-stone-900 hover:text-white border border-transparent hover:border-stone-800 transition-all"
                >
                  <Icon className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {user ? (
            <div className="pt-4 border-t border-stone-800/80 space-y-3">
              <div className="flex items-center gap-3 px-2">
                <Avatar className="h-9 w-9 border border-emerald-500/40">
                  <AvatarImage src={user?.image as string} />
                  <AvatarFallback className="bg-emerald-950 text-emerald-400 text-xs font-bold">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-200 truncate">
                    {user?.name}
                  </p>
                  <p className="text-[10px] text-stone-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOut();
                }}
                variant="destructive"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-900/40 text-xs font-semibold py-2.5 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="pt-4 border-t border-stone-800/80 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 text-center text-xs font-semibold text-stone-200 border border-stone-800 hover:bg-stone-900 rounded-xl transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 text-center text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-950/50 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
