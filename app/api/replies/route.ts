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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, author, discussionId } = body;

    // Validation
    if (!text?.trim()) {
      return NextResponse.json(
        { message: 'Reply text is required' },
        { status: 400 }
      );
    }

    if (!author?.trim()) {
      return NextResponse.json(
        { message: 'Author name is required' },
        { status: 400 }
      );
    }

    if (!discussionId?.trim()) {
      return NextResponse.json(
        { message: 'Discussion ID is required' },
        { status: 400 }
      );
    }

    // Create a reply object (stored inline or as a separate document)
    // We'll store it inline in the discussion's replies array
    const reply = {
      _key: `reply-${Date.now()}`,
      _type: 'reply',
      text: text.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString(),
    };

    // Update the discussion document to increment replyCount and add the reply
    const updatedDiscussion = await writeClient
      .patch(discussionId)
      .inc({ replyCount: 1 })
      .append('replies', [reply])
      .commit();

    return NextResponse.json(
      {
        message: 'Reply posted successfully',
        reply: reply,
        replyCount: updatedDiscussion.replyCount,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error posting reply:', error);

    let errorMessage = 'Failed to post reply';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (errorMessage.includes('Unauthorized') || errorMessage.includes('Not authenticated')) {
      errorMessage = 'Authentication failed. Please check your credentials.';
    }

    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
