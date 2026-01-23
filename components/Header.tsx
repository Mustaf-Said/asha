"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const guidanceCategories = [
  { title: "Nursing Students", slug: "nursing-students" },
  { title: "Career Development", slug: "career" },
  { title: "Leadership", slug: "leadership" },
  { title: "Wellbeing", slug: "wellbeing" },
  { title: "International Nursing", slug: "international-nursing" },
];

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const isGuidanceActive = pathname === "/guidance";

  // 🔹 Separate states (IMPORTANT)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopGuidanceOpen, setDesktopGuidanceOpen] = useState(false);
  const [mobileGuidanceOpen, setMobileGuidanceOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopGuidanceOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkBase = "transition";
  const linkActive = "text-teal-600 font-medium";
  const linkInactive = "text-slate-700 hover:text-slate-900";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-lg font-semibold ${pathname === "/" ? linkActive : "text-slate-900"
            }`}
        >
          Nursing Platform
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {/* Guidance Dropdown (Desktop) */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() =>
                setDesktopGuidanceOpen((prev) => !prev)
              }
              className={`flex items-center gap-1 ${isGuidanceActive || activeCategory
                  ? linkActive
                  : linkInactive
                } ${linkBase}`}
              aria-expanded={desktopGuidanceOpen}
            >
              Guidance <span className="text-xs">▾</span>
            </button>

            {desktopGuidanceOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg p-2">
                {guidanceCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/guidance?category=${cat.slug}`}
                    onClick={() =>
                      setDesktopGuidanceOpen(false)
                    }
                    className={`block px-4 py-2 rounded-lg ${activeCategory === cat.slug
                        ? "bg-teal-50 text-teal-700 font-medium"
                        : "hover:bg-slate-100"
                      }`}
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/community"
            className={`${pathname === "/community" ? linkActive : linkInactive} ${linkBase}`}
          >
            Community
          </Link>

          <Link
            href="/shop"
            className={`${pathname === "/shop" ? linkActive : linkInactive} ${linkBase}`}
          >
            Shop
          </Link>

          <Link
            href="/about"
            className={`${pathname === "/about" ? linkActive : linkInactive} ${linkBase}`}
          >
            About
          </Link>
        </nav>

        {/* CTA Desktop */}
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
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden text-slate-700"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-6 py-4 flex flex-col gap-4 text-sm">
            {/* Mobile Guidance */}
            <div>
              <button
                onClick={() =>
                  setMobileGuidanceOpen((prev) => !prev)
                }
                className={`w-full flex justify-between items-center ${isGuidanceActive || activeCategory
                    ? linkActive
                    : linkInactive
                  }`}
              >
                Guidance <span>▾</span>
              </button>

              {mobileGuidanceOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  {guidanceCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/guidance?category=${cat.slug}`}
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileGuidanceOpen(false);
                      }}
                      className={
                        activeCategory === cat.slug
                          ? "text-teal-600 font-medium"
                          : "text-slate-600 hover:text-slate-900"
                      }
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/community"
              onClick={() => setMobileOpen(false)}
              className={pathname === "/community" ? linkActive : linkInactive}
            >
              Community
            </Link>

            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className={pathname === "/shop" ? linkActive : linkInactive}
            >
              Shop
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className={pathname === "/about" ? linkActive : linkInactive}
            >
              About
            </Link>

            <Link
              href="/community"
              onClick={() => setMobileOpen(false)}
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
