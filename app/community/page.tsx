import { sanityClient } from "@/lib/sanity.client";
import { discussionsQuery, categoriesQuery } from "@/lib/queries";
import GuidanceHeader from "@/components/GuidanceHeader";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import { getSession } from "@/auth.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Forum | Asha Nursing Platform",
  description: "Connect with nursing professionals, share experiences, and ask questions in our supportive community forum.",
};

type Discussion = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  createdAt: string;
  replyCount: number;
  isPinned: boolean;
  category?: {
    title: string;
    slug: string;
  };
};

type Category = {
  _id: string;
  title: string;
  slug: string;
};

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function CommunityPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const [discussions, categories, user] = await Promise.all([
    sanityClient.fetch<Discussion[]>(discussionsQuery),
    sanityClient.fetch<Category[]>(categoriesQuery),
    getSession(),
  ]);

  // Filter discussions by category if selected
  const filteredDiscussions = category
    ? discussions.filter((d) => d.category?.slug === category)
    : discussions;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Update props based on GuidanceHeader component definition */}
      <GuidanceHeader />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar Filter */}
          <aside className="md:w-56 shrink-0 ">
            <div className="sticky top-24 rounded-2xl border border-slate-200 p-4 bg-slate-100">
              <CategoryFilter categories={categories} />
            </div>
          </aside>



          {/* Main Content */}
          <main className="flex-1">
            <div className=" bg-slate-100 rounded-2xl border border-slate-200 p-6">
              <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">
                  Recent Discussions
                </h1>
                {user ? (
                  <Link
                    href="/community/new"
                    className="bg-teal-600 text-white px-5 py-2.5 rounded-xl hover:bg-teal-700 transition font-medium"
                  >
                    Start Discussion
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="bg-slate-400 text-white px-5 py-2.5 rounded-xl hover:bg-slate-500 transition font-medium"
                  >
                    Log In to Post
                  </Link>
                )}
              </div>
              <div className="space-y-4">
                {filteredDiscussions.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                    <p className="text-slate-600 text-lg font-medium mb-2">No discussions here</p>
                    <p className="text-slate-500 text-sm">There are no discussions in this category yet. {category ? 'Be the first to start one!' : ''}</p>
                  </div>
                ) : (
                  filteredDiscussions.map((discussion) => (
                    <Link
                      key={discussion._id}
                      href={`/community/${discussion.slug}`}
                      className="group block rounded-2xl border-2 border-slate-200 p-6 transition
                   hover:border-teal-300 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-6">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {discussion.isPinned && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full mb-2">
                              📌 Pinned
                            </span>
                          )}

                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition">
                            {discussion.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                            {discussion.description}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span>{discussion.author || "Anonymous"}</span>
                            <span>•</span>
                            <span>{formatDate(discussion.createdAt)}</span>

                            {discussion.category && (
                              <>
                                <span>•</span>
                                <span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium">
                                  {discussion.category.title}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Replies bubble */}
                        <div className="shrink-0 text-center">
                          <div className="w-12 h-12  rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                            {discussion.replyCount}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">replies</div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
