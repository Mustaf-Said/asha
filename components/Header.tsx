"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Nursing Platform
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-700">
          <Link href="/guidance" className="hover:text-slate-900">
            Guidance
          </Link>
          <Link href="/community" className="hover:text-slate-900">
            Community
          </Link>
          <Link href="/shop" className="hover:text-slate-900">
            Shop
          </Link>
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/community"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition"
          >
            Join Community
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-700"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-6 py-4 flex flex-col gap-4 text-sm text-slate-700">
            <Link href="/guidance" onClick={() => setOpen(false)}>
              Guidance
            </Link>
            <Link href="/community" onClick={() => setOpen(false)}>
              Community
            </Link>
            <Link href="/shop" onClick={() => setOpen(false)}>
              Shop
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link
              href="/community"
              onClick={() => setOpen(false)}
              className="mt-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-center"
            >
              Join Community
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
