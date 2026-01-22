'use client';

import { useState } from 'react';

type ReplyFormProps = {
  discussionId: string;
  discussionSlug: string;
  onReplyAdded?: () => void;
};

export default function ReplyForm({ discussionId, discussionSlug, onReplyAdded }: ReplyFormProps) {
  const [replyText, setReplyText] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      if (!replyText.trim()) {
        throw new Error('Reply cannot be empty');
      }

      if (!author.trim()) {
        throw new Error('Name is required');
      }

      const response = await fetch('/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: replyText.trim(),
          author: author.trim(),
          discussionId,
          discussionSlug,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post reply');
      }

      setReplyText('');
      setAuthor('');
      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

      // Refresh replies if callback provided
      if (onReplyAdded) {
        onReplyAdded();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Join the Discussion
      </h2>
      <p className="text-slate-600 mb-6">
        Share your thoughts, experiences, and advice with the nursing community.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-700 mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isLoading}
          />
        </div>

        {/* Reply Text */}
        <div>
          <label htmlFor="reply" className="block text-sm font-medium text-slate-700 mb-2">
            Your Reply <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reply"
            placeholder="Share your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={4}
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">Reply posted successfully!</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Posting...' : 'Post Reply'}
        </button>
      </form>
    </div>
  );
}
