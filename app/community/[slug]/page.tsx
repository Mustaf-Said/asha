import { sanityClient } from "@/lib/sanity.client";
import { discussionBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReplyForm from "@/components/ReplyForm";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  const discussion = await sanityClient.fetch(discussionBySlugQuery, { slug });

  if (!discussion) {
    return { title: "Discussion not found" };
  }

  return {
    title: `${discussion.title} | Community`,
    description: discussion.description,
  };
}

type Reply = {
  _key: string;
  text: string;
  author: string;
  createdAt: string;
};

type Discussion = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: PortableTextBlock[];
  author: string;
  createdAt: string;
  replyCount: number;
  replies?: Reply[];
  category?: {
    _id: string;
    title: string;
    slug: string;
  };
};

export default async function DiscussionPage({ params }: PageProps) {
  const { slug } = await params;

  const discussion = await sanityClient.fetch<Discussion>(
    discussionBySlugQuery,
    { slug }
  );

  if (!discussion) {
    notFound();
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className="pt-6 pb-16">
      <div className="max-w-3xl mx-auto px-6 mb-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Community", href: "/community" },
            {
              label: discussion.category?.title || "Discussions",
              href: discussion.category
                ? `/community?category=${discussion.category.slug}`
                : "/community",
            },
            { label: discussion.title },
          ]}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Category & Meta */}
        <div className="mb-6">
          {discussion.category && (
            <span className="inline-block text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-4">
              {discussion.category.title}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            {discussion.title}
          </h1>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600 border-b border-slate-200 pb-6">
            <div>
              <span className="font-medium text-slate-900">
                {discussion.author || "Anonymous"}
              </span>
            </div>
            <div>Posted {formatDate(discussion.createdAt)}</div>
            <div>
              <span className="font-medium text-slate-900">
                {discussion.replyCount}
              </span>{" "}
              replies
            </div>
          </div>
        </div>

        {/* Description */}
        {discussion.description && (
          <p className="text-lg text-slate-600 mb-8">
            {discussion.description}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-slate max-w-none mb-12">
          <PortableText value={discussion.content} />
        </div>

        {/* Reply Section */}
        <ReplyForm discussionId={discussion._id} discussionSlug={discussion.slug} />

        {/* Replies */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Replies ({discussion.replyCount})
          </h2>

          {!discussion.replies || discussion.replies.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-600">No replies yet. Be the first to join!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {discussion.replies.map((reply) => (
                <div
                  key={reply._key}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-900">
                      {reply.author || "Anonymous"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{reply.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
