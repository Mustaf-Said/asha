'use client';

import { useState } from 'react';

type Reply = {
  _key: string;
  text: string;
  author: string;
  createdAt: string;
};

type RepliesSectionProps = {
  replies: Reply[] | undefined;
  replyCount: number;
  user: any;
};

export default function RepliesSection({ replies, replyCount, user }: RepliesSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="mt-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-xl font-semibold text-slate-900 hover:text-teal-600 transition cursor-pointer"
      >
        <span>{isOpen ? '▼' : '▶'}</span>
        <span>Replies ({replyCount})</span>
      </button>

      {isOpen && (
        <div className="mt-6">
          {!user ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-600 mb-4">Please log in to view replies.</p>
              <a href="/login" className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                Log In to View Replies
              </a>
            </div>
          ) : !replies || replies.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-600">No replies yet. Be the first to join the discussion!</p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {replies.map((reply) => (
                <div
                  key={reply._key}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-semibold text-slate-900">
                      {reply.author || "Anonymous"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{reply.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
