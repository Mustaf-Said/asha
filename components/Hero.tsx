"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-linear-to-br from-slate-50 to-teal-50 py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
          Supporting Nurses & Nursing Students Worldwide
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          Practical guidance, leadership support, and a professional nursing
          community built by nurses, for nurses.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/guidance" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition">
            Explore Guidance
          </Link>
          <Link href="/community" className="border border-slate-300 px-6 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition">
            Join Community
          </Link>
        </div>
      </div>
    </section>
  );
}
