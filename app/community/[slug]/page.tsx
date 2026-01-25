import { sanityClient } from "@/lib/sanity.client";
import { discussionBySlugQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReplyForm from "@/components/ReplyForm";
import RepliesSection from "@/components/RepliesSection";
import { getSession } from "@/auth.config";
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
  const user = await getSession();

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

        {/* Replies Section with Toggle */}
        <RepliesSection
          replies={discussion.replies}
          replyCount={discussion.replyCount}
          user={user}
        />

        {/* Reply Form - at the bottom */}
        <div className="mt-12">
          <ReplyForm discussionId={discussion._id} discussionSlug={discussion.slug} />
        </div>
      </div>
    </article>
  );
}
