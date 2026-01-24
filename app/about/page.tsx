import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "About Asha | Professional Nursing Platform",
  description: "Learn about Asha - a Senior Staff Nurse with 16+ years of experience dedicated to supporting nurses worldwide.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-teal-50 to-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            About Asha
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Meet the founder and mission behind this nursing platform
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Sidebar - Profile */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-slate-50 rounded-xl p-8 border border-slate-200 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-5xl">🏥</div>
              <h2 className="text-xl font-semibold text-slate-900">Asha</h2>
              <p className="text-sm text-teal-600 font-medium mt-1">
                Senior Staff Nurse
              </p>
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Experience</p>
                  <p>16+ Years</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Specialties</p>
                  <p>Pediatric & Adult Oncology</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Locations</p>
                  <p>Gulf, Europe, Local</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 prose prose-slate max-w-none">
            <h2>My Story</h2>
            <p>
              I&apos;m Asha, a Senior Staff Nurse with over 16 years of experience in pediatric and adult oncology nursing, and leadership roles. I am an international nurse, having worked across the Gulf and Europe, and a proud mother of four.
            </p>

            <h3>My Passion for Nursing</h3>
            <p>
              I strongly believe in ongoing education and the importance of always being hungry for knowledge and experience. Throughout my career, I&apos;ve witnessed both the challenges and rewards of nursing at every level.
            </p>

            <h3>Why I Created This Platform</h3>
            <p>
              This website is my way of sharing guidance, practical tips, and creating a supportive space for nurses at every stage of their career. Whether you&apos;re a nursing student taking your first steps, a new graduate navigating your first role, or an experienced nurse looking for career advancement, this platform is designed for you.
            </p>

            <h2>Our Mission</h2>
            <p>
              To empower nurses worldwide with practical guidance, peer support, and professional resources. We believe that by sharing knowledge and experience, we can build a stronger, more supportive nursing community.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>
                <strong>Structured Guidance:</strong> Evidence-based articles on career development, leadership, wellbeing, and nursing excellence
              </li>
              <li>
                <strong>Community Support:</strong> A professional forum where nurses can share experiences, ask questions, and support each other
              </li>
              <li>
                <strong>Professional Resources:</strong> Digital products including guides, templates, and checklists to support your nursing practice
              </li>
              <li>
                <strong>Career Mentorship:</strong> Insights from years of experience to help you grow professionally
              </li>
            </ul>

            <h2>Join Us</h2>
            <p>
              Whether you&apos;re looking to advance your career, develop leadership skills, or simply connect with other nursing professionals, you&apos;ve come to the right place. I&apos;m committed to building a community where every nurse feels supported, valued, and empowered to achieve their goals.
            </p>

            <p>
              Welcome to Asha. Let&apos;s grow together. 💚
            </p>
          </div>
        </div>

        {/* CTA Section with Image */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-80 rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-linear-to-br from-teal-50 to-blue-50">
            <Image
              src="/images/about/journy.png"
              fill
              alt="Nursing community"
              className="object-cover"
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="bg-teal-50 rounded-xl p-8 border border-teal-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-600 mb-6">
              Explore our guidance articles, join our community, or browse our professional resources.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guidance"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Explore Guidance
              </Link>
              <Link
                href="/community"
                className="border border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition"
              >
                Join Community
              </Link>
              <Link
                href="/shop"
                className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition"
              >
                Browse Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
