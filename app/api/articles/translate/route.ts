import { createClient } from '@sanity/client';
import { NextRequest, NextResponse } from 'next/server';
import { translatePortableText } from '@/lib/portableTextTranslate';
import { translateTexts } from '@/lib/translate';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Basic env validation
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const token = process.env.SANITY_API_WRITE_TOKEN;

    if (!projectId) {
      return NextResponse.json({ message: 'Sanity projectId missing' }, { status: 500 });
    }
    if (!token) {
      return NextResponse.json({ message: 'SANITY_API_WRITE_TOKEN missing' }, { status: 500 });
    }
    // Allow local development fallback without Azure Translator
    const useMockTranslation = !process.env.AZURE_TRANSLATOR_KEY || process.env.DEV_TRANSLATION_FAKE === 'true';

    // Clients
    const readClient = createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
      useCdn: true,
    });
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
      useCdn: false,
      token,
    });

    const body = await request.json();

    // Accept various id shapes from webhook
    const id: string | undefined = body?._id || body?.id || body?.documentId || body?.ids?.[0];
    if (!id) {
      return NextResponse.json({ message: 'Missing article id in webhook payload' }, { status: 400 });
    }

    // Fetch article
    const article = await readClient.fetch(
      `*[_type == "article" && _id == $id][0]{
        _id,
        title,
        excerpt,
        content,
        soContent,
        arContent,
        title_so,
        title_ar,
        excerpt_so,
        excerpt_ar,
        translationMeta
      }`,
      { id }
    );

    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    const content = article.content || [];

    // Only translate if missing
    let soContent = article.soContent || [];
    let arContent = article.arContent || [];

    const ops: Array<Promise<any>> = [];

    if (!soContent || soContent.length === 0) {
      const soBlocks = useMockTranslation
        ? (Array.isArray(content) ? content : [])
        : await translatePortableText(content, 'so', 'en');
      soContent = soBlocks;
      ops.push(
        writeClient.patch(article._id).set({ soContent: soBlocks }).commit()
      );
    }

    if (!arContent || arContent.length === 0) {
      const arBlocks = useMockTranslation
        ? (Array.isArray(content) ? content : [])
        : await translatePortableText(content, 'ar', 'en');
      arContent = arBlocks;
      ops.push(
        writeClient.patch(article._id).set({ arContent: arBlocks }).commit()
      );
    }

    // Titles
    const baseTitle: string = article.title || '';
    if (baseTitle) {
      if (!article.title_so) {
        const [tso] = useMockTranslation ? [baseTitle] : await translateTexts([baseTitle], 'so', 'en');
        ops.push(writeClient.patch(article._id).set({ title_so: tso }).commit());
      }
      if (!article.title_ar) {
        const [tar] = useMockTranslation ? [baseTitle] : await translateTexts([baseTitle], 'ar', 'en');
        ops.push(writeClient.patch(article._id).set({ title_ar: tar }).commit());
      }
    }

    // Excerpts
    const baseExcerpt: string = article.excerpt || '';
    if (baseExcerpt) {
      if (!article.excerpt_so) {
        const [eso] = useMockTranslation ? [baseExcerpt] : await translateTexts([baseExcerpt], 'so', 'en');
        ops.push(writeClient.patch(article._id).set({ excerpt_so: eso }).commit());
      }
      if (!article.excerpt_ar) {
        const [ear] = useMockTranslation ? [baseExcerpt] : await translateTexts([baseExcerpt], 'ar', 'en');
        ops.push(writeClient.patch(article._id).set({ excerpt_ar: ear }).commit());
      }
    }

    if (ops.length === 0) {
      return NextResponse.json({ message: 'Translations already present; nothing to do' }, { status: 200 });
    }

    // Update translation metadata (non-destructive)
    ops.push(
      writeClient
        .patch(article._id)
        .set({
          translationMeta: {
            ...(article.translationMeta || {}),
            autoTranslatedAt: new Date().toISOString(),
            sourceLang: 'en',
          },
        })
        .commit()
    );

    await Promise.all(ops);

    return NextResponse.json({
      message: useMockTranslation ? 'Article translated (mock) and saved' : 'Article translated and saved',
      updated: {
        soContent: !!soContent?.length,
        arContent: !!arContent?.length,
        title_so: !!article.title_so,
        title_ar: !!article.title_ar,
        excerpt_so: !!article.excerpt_so,
        excerpt_ar: !!article.excerpt_ar,
      },
    });
  } catch (error) {
    console.error('Translation webhook error', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
