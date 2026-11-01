import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone, Heart } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* COL 1: BRANDING & ABOUT */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 group-hover:bg-emerald-500 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-linear-to-r from-stone-100 via-amber-100 to-emerald-400 bg-clip-text text-transparent">
                BookNook
              </span>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Your ultimate personal digital library. Catalog your collection,
              track your reading journey, and borrow books seamlessly with a
              passionate reader community.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-emerald-400 hover:border-emerald-800/60 transition-all"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-emerald-400 hover:border-emerald-800/60 transition-all"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-emerald-400 hover:border-emerald-800/60 transition-all"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-emerald-400 hover:border-emerald-800/60 transition-all"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: QUICK NAVIGATION LINKS */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Explore Books
                </Link>
              </li>
              <li>
                <Link
                  href="/add-book"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Add a Book
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: CONTACT INFORMATION */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@booknook.dev</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+880-12 3456 7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>BookNook HQ </span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR / COPYRIGHT */}
        <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} BookNook. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for book lovers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
