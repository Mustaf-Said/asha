const categories = [
  {
    title: "Nursing Students",
    slug: "nursing-students",
    description: "Study support & early career guidance",
    image: "/images/categories/students.png",
  },
  {
    title: "Career Development",
    slug: "career-development",
    description: "Grow, specialize, advance",
    image: "/images/categories/career.png",
  },
  {
    title: "Leadership",
    slug: "leadership",
    description: "From bedside to management",
    image: "/images/categories/leadership.png",
  },
  {
    title: "Wellbeing",
    slug: "wellbeing",
    description: "Stress, balance & burnout prevention",
    image: "/images/categories/wellbeing.png",
  },
  {
    title: "International Nursing",
    slug: "international-nursing",
    description: "Work abroad & global careers",
    image: "/images/categories/international.png",
  },
];


import Link from "next/link";
import Image from "next/image";

export default function CategoryGrid() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-teal-900 mb-10">
          Explore Guidance Areas
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/guidance?category=${cat.slug}`}
              className="group rounded-xl border border-teal-200 p-6 bg-white hover:shadow-md transition block"
            >
              {/* Image */}
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-teal-100">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  loading="eager"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>


              {/* Text */}
              <h3 className="text-lg font-medium text-teal-900">
                {cat.title}
              </h3>
              <p className="mt-2 text-teal-600 text-sm">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
