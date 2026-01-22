'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GuidanceHeader from '@/components/GuidanceHeader';

type FormData = {
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
};

type Category = {
  _id: string;
  title: string;
  slug?: { current: string };
};

export default function NewDiscussionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    category: '',
    author: '',
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Discussion title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.author.trim()) {
        throw new Error('Author name is required');
      }

      // Call API endpoint to create discussion
      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          content: formData.content.trim() || formData.description.trim(),
          category: formData.category || null,
          author: formData.author.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create discussion');
      }

      const data = await response.json();

      // Redirect to the new discussion
      router.push(`/community/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <GuidanceHeader
        title="Start a New Discussion"
        description="Share your thoughts, ask questions, or start a conversation with the nursing community."
      />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Author Name */}
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-slate-900 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                disabled={isLoading}
              />
              <p className="text-xs text-slate-500 mt-1">
                Your name will be displayed with your discussion
              </p>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
                Discussion Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                disabled={isLoading}
              />
              <p className="text-xs text-slate-500 mt-1">
                Keep it clear and concise (5-100 characters)
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
                Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief summary of your discussion"
                rows={2}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Full Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-slate-900 mb-2">
                Full Discussion
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Share more details about what you'd like to discuss..."
                rows={6}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                disabled={isLoading}
              >
                <option value="">Select a category (optional)</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Publishing...' : 'Publish Discussion'}
              </button>
              <Link
                href="/community"
                className="flex-1 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition font-medium text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Community Guidelines</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Be respectful and professional in all discussions</li>
            <li>• Avoid sharing personal or protected health information</li>
            <li>• Focus on constructive feedback and support</li>
            <li>• Stay on topic and relevant to nursing practice</li>
            <li>• No spam, self-promotion, or commercial solicitation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
