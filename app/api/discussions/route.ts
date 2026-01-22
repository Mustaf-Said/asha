import { createClient } from '@sanity/client';
import { NextRequest, NextResponse } from 'next/server';

// Create a write-enabled Sanity client for API routes
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN!,
});

// Read client for querying
const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, category, author } = body;

    // Validation
    if (!title?.trim()) {
      return NextResponse.json(
        { message: 'Discussion title is required' },
        { status: 400 }
      );
    }

    if (!author?.trim()) {
      return NextResponse.json(
        { message: 'Author name is required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);

    // If category is provided, try to find it by title (not by ID)
    let categoryRef = null;
    if (category) {
      try {
        const foundCategory = await readClient.fetch(
          `*[_type == "category" && title == $title][0]`,
          { title: category }
        );
        if (foundCategory?._id) {
          categoryRef = {
            _type: 'reference',
            _ref: foundCategory._id,
          };
        }
      } catch (err) {
        console.warn('Could not find category:', category);
      }
    }

    // Create the discussion document in Sanity
    const discussion = await writeClient.create({
      _type: 'discussion',
      title: title.trim(),
      slug: {
        _type: 'slug',
        current: `${slug}-${Date.now()}`,
      },
      description: description?.trim() || '',
      content: content?.trim() ? [
        {
          _type: 'block',
          _key: `block-${Date.now()}`,
          style: 'normal',
          text: content.trim(),
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `span-${Date.now()}`,
              text: content.trim(),
              marks: [],
            },
          ],
        },
      ] : [],
      author: author.trim(),
      ...(categoryRef && { category: categoryRef }),
      createdAt: new Date().toISOString(),
      replyCount: 0,
      isPinned: false,
    });

    return NextResponse.json(
      {
        message: 'Discussion created successfully',
        slug: discussion.slug.current,
        _id: discussion._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating discussion:', error);

    let errorMessage = 'Failed to create discussion';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Check for auth errors
    if (errorMessage.includes('Unauthorized') || errorMessage.includes('Not authenticated')) {
      errorMessage = 'API write token not configured. Please add SANITY_API_WRITE_TOKEN to .env.local';
    }

    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
