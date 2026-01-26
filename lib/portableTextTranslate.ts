import { translateTexts } from './translate';

// Minimal Portable Text types used here
export type PortableTextSpan = {
  _type: 'span';
  _key?: string;
  text: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _type: 'block';
  _key?: string;
  style?: string;
  markDefs?: any[];
  children?: PortableTextSpan[];
  // Some content may have a duplicate top-level text field; preserve if present
  text?: string;
};

export async function translatePortableText(
  blocks: PortableTextBlock[] = [],
  to: string,
  from: string = 'en'
): Promise<PortableTextBlock[]> {
  // Collect spans
  const spanLocations: Array<{ blockIdx: number; childIdx: number }> = [];
  const texts: string[] = [];

  blocks.forEach((block, blockIdx) => {
    if (block._type !== 'block') return;
    const children = block.children || [];
    children.forEach((child, childIdx) => {
      if (child._type !== 'span') return;
      spanLocations.push({ blockIdx, childIdx });
      texts.push(child.text || '');
    });
  });

  // Translate in batch
  const translated = await translateTexts(texts, to, from);

  // Apply translations
  const out = blocks.map((block) => ({ ...block, children: block.children ? block.children.map((c) => ({ ...c })) : [] }));

  spanLocations.forEach((loc, i) => {
    const { blockIdx, childIdx } = loc;
    const newText = translated[i] ?? '';
    const child = out[blockIdx]?.children?.[childIdx];
    if (child) child.text = newText;
    // If block has top-level text, update accordingly if identical
    const original = blocks[blockIdx];
    if (original && typeof original.text === 'string') {
      // Only replace if the top-level text equals concatenation of children
      const originalChildrenText = (original.children || []).map((c) => c.text).join('');
      if (original.text === originalChildrenText) {
        const newChildrenText = (out[blockIdx].children || []).map((c) => c.text).join('');
        out[blockIdx].text = newChildrenText;
      }
    }
  });

  return out;
}
