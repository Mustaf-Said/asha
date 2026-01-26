"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useTranslations } from "@/lib/translations";

const guidanceCategories = [
  { title: "Nursing Students", slug: "nursing-students", icon: "👨‍🎓" },
  { title: "Career Development", slug: "career", icon: "💼" },
  { title: "Leadership", slug: "leadership", icon: "👥" },
  { title: "Wellbeing", slug: "wellbeing", icon: "🧘" },
  { title: "International Nursing", slug: "international-nursing", icon: "🌍" },
];

// Icon components
const Icons = {
  Globe: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 10a3 3 0 11-6 0 3 3 0 016 0zM12.935 16H7.065a1 1 0 00-.995 1.1A4 4 0 0011 16a4 4 0 004.995-1.1 1 1 0 00-.995-1.1z" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  ),
};

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, logout } = useUser();

  const activeCategory = searchParams.get("category");
  const activeLang = searchParams.get("lang") || "en";
  const { t } = useTranslations(activeLang);
  const isGuidanceActive = pathname === "/guidance";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopGuidanceOpen, setDesktopGuidanceOpen] = useState(false);
  const [mobileGuidanceOpen, setMobileGuidanceOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const languages = [
    { code: "en", label: "English" },
    { code: "so", label: "Somali" },
    { code: "ar", label: "Arabic" },
  ];

  const buildLangHref = (code: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (code === "en") {
      params.delete("lang");
    } else {
      params.set("lang", code);
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-teal-600 via-teal-500 to-cyan-500 shadow-lg border-b border-teal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90 transition"
          >
            <Icons.Globe />
            <span>GlobalNurse</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Guidance Dropdown (Desktop) */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() =>
                  setDesktopGuidanceOpen((prev) => !prev)
                }
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/20 transition font-medium"
                aria-expanded={desktopGuidanceOpen}
              >
                {t('guidance')}
                <Icons.ChevronDown />
              </button>

              {desktopGuidanceOpen && (
                <div className="absolute left-0 top-full mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50">
                  {guidanceCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/guidance?category=${cat.slug}${activeLang !== 'en' ? `&lang=${activeLang}` : ''}`}
                      onClick={() =>
                        setDesktopGuidanceOpen(false)
                      }
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition ${activeCategory === cat.slug
                        ? "bg-teal-100 text-teal-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/community${activeLang !== 'en' ? `?lang=${activeLang}` : ''}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition font-medium ${pathname === "/community"
                ? "bg-white/20 text-white"
                : "text-white hover:bg-white/10"
                }`}
            >
              <Icons.Users />
              {t('community')}
            </Link>

            <Link
              href={`/shop${activeLang !== 'en' ? `?lang=${activeLang}` : ''}`}
              className={`px-3 py-2 rounded-lg transition font-medium ${pathname === "/shop"
                ? "bg-white/20 text-white"
                : "text-white hover:bg-white/10"
                }`}
            >
              {t('shop')}
            </Link>

            <Link
              href={`/about${activeLang !== 'en' ? `?lang=${activeLang}` : ''}`}
              className={`px-3 py-2 rounded-lg transition font-medium ${pathname === "/about"
                ? "bg-white/20 text-white"
                : "text-white hover:bg-white/10"
                }`}
            >
              {t('about')}
            </Link>
          </nav>

          {/* Desktop Lang Switch + User Section */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white">
              {languages.map((lang) => {
                const isActive = activeLang === lang.code || (!searchParams.get("lang") && lang.code === "en");
                return (
                  <Link
                    key={lang.code}
                    href={buildLangHref(lang.code)}
                    className={`px-3 py-1 rounded-full transition ${isActive
                      ? "bg-white text-teal-600 shadow"
                      : "hover:bg-white/20"
                      }`}
                  >
                    {lang.label}
                  </Link>
                );
              })}
            </div>

            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
                  <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-white font-medium truncate max-w-xs">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-sm font-medium transition"
                >
                  <Icons.LogOut />
                  {t('signOut')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20 transition"
                >
                  {t('signIn')}
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-white text-teal-600 font-bold hover:bg-gray-100 transition shadow-lg"
                >
                  {t('getStarted')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/20 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-teal-700 border-t border-teal-600 p-4 pb-6">
            <nav className="flex flex-col gap-2">
              <div className="flex gap-2 mb-3">
                {languages.map((lang) => {
                  const isActive = activeLang === lang.code || (!searchParams.get("lang") && lang.code === "en");
                  return (
                    <Link
                      key={lang.code}
                      href={buildLangHref(lang.code)}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition ${isActive
                        ? "bg-white text-teal-700 shadow"
                        : "bg-teal-600 text-white hover:bg-teal-500"
                        }`}
                    >
                      {lang.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Guidance */}
              <div>
                <button
                  onClick={() =>
                    setMobileGuidanceOpen((prev) => !prev)
                  }
                  className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-white font-medium hover:bg-teal-600 transition"
                  aria-expanded={mobileGuidanceOpen}
                >
                  <span>{t('guidance')}</span>
                  <span className={`transition-transform duration-200 ${mobileGuidanceOpen ? 'rotate-180' : ''}`}>
                    <Icons.ChevronDown />
                  </span>
                </button>

                {mobileGuidanceOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1 bg-teal-600 p-3 rounded-lg">
                    {guidanceCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/guidance?category=${cat.slug}${activeLang !== 'en' ? `&lang=${activeLang}` : ''}`}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileGuidanceOpen(false);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${activeCategory === cat.slug
                          ? "bg-white text-teal-700 font-semibold"
                          : "text-white hover:bg-teal-500"
                          }`}
                      >
                        <span>{cat.icon}</span>
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={`/community${activeLang !== 'en' ? `?lang=${activeLang}` : ''}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition font-medium ${pathname === "/community"
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-teal-600"
                  }`}
              >
                <Icons.Users />
                {t('community')}
              </Link>

              <Link
                href={`/shop${activeLang !== 'en' ? `?lang=${activeLang}` : ''}`}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg transition font-medium ${pathname === "/shop"
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-teal-600"
                  }`}
              >
                {t('shop')}
              </Link>

              <Link
                href={`/about${activeLang !== 'en' ? `?lang=${activeLang}` : ''}`}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg transition font-medium ${pathname === "/about"
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-teal-600"
                  }`}
              >
                {t('about')}
              </Link>

              <div className="mt-4 pt-4 border-t border-teal-600 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-white font-medium">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                    >
                      <Icons.LogOut />
                      {t('signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-teal-600 transition text-center"
                    >
                      {t('signIn')}
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg bg-white text-teal-600 font-bold hover:bg-gray-100 transition text-center"
                    >
                      {t('getStarted')}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header >
  );
}
