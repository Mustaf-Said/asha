import Link from "next/link";

const featuredGuidance = [
  {
    title: "Career Paths & Specializations in Nursing",
    description:
      "Explore different nursing career paths, specializations, required qualifications, and how to plan your professional growth.",
    href: "http://localhost:3000/guidance/career-paths",
    image: "/images/featuredGuinense/guidance-career.png",
  },
  {
    title: "International Nursing: How to Work Abroad as a Nurse",
    description:
      "Explore career paths, job opportunities, CV tips, and long-term professional growth.",
    href: "http://localhost:3000/guidance/international-nursing",
    image: "/images/featuredGuinense/International-Nursing.png",
  },
  {
    title: "Burnout Prevention & Wellbeing for Nurses",
    description:
      "Learn how to recognize burnout, manage stress, and build a sustainable nursing career without sacrificing your wellbeing.",
    href: "/guidance/wellbeing",
    image: "/images/featuredGuinense/guidance-wellbeing.png",
  },
];

export default function FeaturedGuidance() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-10">
          Featured Guidance
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredGuidance.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              target="_blank"
              className="group relative h-[320px] rounded-2xl overflow-hidden border border-slate-200"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  {item.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-300">
                  Read more
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
