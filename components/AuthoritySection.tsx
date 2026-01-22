"use client";

import Link from "next/link";

export default function AuthoritySection() {
  return (
    <section className="bg-linear-to-r from-teal-600 to-teal-700 py-16 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold">
          Built by a Nurse, for Nurses
        </h2>
        <p className="mt-4 text-teal-50">
          Created by a senior nurse with 16+ years of experience in oncology,
          leadership, and international nursing.
        </p>
        <Link href="/about" className="inline-block mt-6 bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition">
          Learn More About Asha
        </Link>
      </div>
    </section>
  );
}
