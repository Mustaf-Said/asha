import { sanityClient } from "@/lib/sanity.client";
import { discussionsQuery, categoriesQuery } from "@/lib/queries";
import GuidanceHeader from "@/components/GuidanceHeader";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
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

export default async function CommunityPage() {
  const [discussions, categories] = await Promise.all([
    sanityClient.fetch<Discussion[]>(discussionsQuery),
    sanityClient.fetch<Category[]>(categoriesQuery),
  ]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <GuidanceHeader
        title="Community Forum"
        description="Connect with nurses, share experiences, and ask questions in a professional, supportive environment."
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="md:w-48 shrink-0">
            <CategoryFilter categories={categories} />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-slate-900">
                Recent Discussions
              </h1>
              <Link href="/community/new" className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-medium">
                Start Discussion
              </Link>
            </div>

            <div className="space-y-4">
              {discussions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600">
                    No discussions yet. Be the first to start one!
                  </p>
                </div>
              ) : (
                discussions.map((discussion) => (
                  <Link
                    key={discussion._id}
                    href={`/community/${discussion.slug}`}
                    className="block border border-slate-200 rounded-lg p-5 hover:shadow-md transition hover:border-teal-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {discussion.isPinned && (
                          <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2">
                            📌 Pinned
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-slate-900 break-word">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {discussion.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                          <span>{discussion.author || "Anonymous"}</span>
                          <span>•</span>
                          <span>{formatDate(discussion.createdAt)}</span>
                          <span>•</span>
                          <span>{discussion.replyCount} replies</span>
                          {discussion.category && (
                            <>
                              <span>•</span>
                              <span className="text-teal-600 font-medium">
                                {discussion.category.title}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-sm font-medium text-teal-600">
                          {discussion.replyCount}
                        </div>
                        <div className="text-xs text-slate-500">replies</div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
