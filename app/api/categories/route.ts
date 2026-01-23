import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create client inside handler to avoid build-time execution
    const readClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    });

    // If no project ID, return default categories
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const defaultCategories = [
        { _id: 'career', title: 'Career Development', slug: { current: 'career' } },
        { _id: 'leadership', title: 'Leadership', slug: { current: 'leadership' } },
        { _id: 'wellbeing', title: 'Wellbeing', slug: { current: 'wellbeing' } },
        { _id: 'clinical', title: 'Clinical Practice', slug: { current: 'clinical' } },
        { _id: 'education', title: 'Education & Learning', slug: { current: 'education' } },
        { _id: 'general', title: 'General Discussion', slug: { current: 'general' } },
      ];
      return NextResponse.json(defaultCategories, { status: 200 });
    }

    const categories = await readClient.fetch(
      `*[_type == "category"] | order(title asc) { _id, title, slug }`
    );

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);

    // Return default categories if query fails
    const defaultCategories = [
      { _id: 'career', title: 'Career Development', slug: { current: 'career' } },
      { _id: 'leadership', title: 'Leadership', slug: { current: 'leadership' } },
      { _id: 'wellbeing', title: 'Wellbeing', slug: { current: 'wellbeing' } },
      { _id: 'clinical', title: 'Clinical Practice', slug: { current: 'clinical' } },
      { _id: 'education', title: 'Education & Learning', slug: { current: 'education' } },
      { _id: 'general', title: 'General Discussion', slug: { current: 'general' } },
    ];

    return NextResponse.json(defaultCategories, { status: 200 });
  }
}
