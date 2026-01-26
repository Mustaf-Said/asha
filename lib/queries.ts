import { groq } from "next-sanity";

/* ---------------------------------
   Categories
---------------------------------- */
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

/* ---------------------------------
   GUIDANCE ARTICLES
---------------------------------- */
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    title_so,
    title_ar,
    excerpt,
    excerpt_so,
    excerpt_ar,
    mainImage,
    publishedAt,
    "slug": slug.current,
    category->{
      title,
      "slug": slug.current
    }
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    title_so,
    title_ar,
    excerpt,
    excerpt_so,
    excerpt_ar,
    content,
    soContent,
    arContent,
    mainImage,
    seoTitle,
    seoDescription,
    category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

export const relatedArticlesQuery = groq`
  *[
    _type == "article" &&
    category._ref == $categoryId &&
    slug.current != $slug
  ][0...3] {
    _id,
    title,
    title_so,
    title_ar,
    excerpt,
    excerpt_so,
    excerpt_ar,
    "slug": slug.current
  }
`;

export const articlesByCategoryQuery = groq`
  *[
    _type == "article" &&
    (!defined($category) || category->slug.current == $category)
  ] | order(publishedAt desc) {
    _id,
    title,
    title_so,
    title_ar,
    excerpt,
    excerpt_so,
    excerpt_ar,
    mainImage,
    publishedAt,
    "slug": slug.current,
    category->{
      title,
      "slug": slug.current
    }
  }
`;

/* ---------------------------------
   COMMUNITY DISCUSSIONS
---------------------------------- */
export const discussionsQuery = groq`
  *[_type == "discussion"] | order(isPinned desc, createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category->{
      title,
      "slug": slug.current
    },
    author,
    createdAt,
    replyCount,
    isPinned
  }
`;

export const discussionBySlugQuery = groq`
  *[_type == "discussion" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    content,
    category->{
      _id,
      title,
      "slug": slug.current
    },
    author,
    createdAt,
    replyCount,
    replies[]{
      _key,
      text,
      author,
      createdAt
    }
  }
`;

export const discussionsByCategoryQuery = groq`
  *[
    _type == "discussion" &&
    (!defined($category) || category->slug.current == $category)
  ] | order(isPinned desc, createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category->{
      title,
      "slug": slug.current
    },
    author,
    createdAt,
    replyCount,
    isPinned
  }
`;

/* ---------------------------------
   SHOP PRODUCTS
---------------------------------- */
export const productsQuery = groq`
  *[_type == "product" && isAvailable == true] | order(publishedAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    mainImage,
    productType,
    publishedAt
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    description,
    content,
    price,
    mainImage,
    productType,
    downloadUrl,
    publishedAt
  }
`;

export const productsByTypeQuery = groq`
  *[_type == "product" && productType == $type && isAvailable == true] | order(publishedAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    mainImage,
    productType
  }
`;


