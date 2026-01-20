import { groq } from "next-sanity";

/* ---------------------------------
   Categories (Guidance dropdown)
---------------------------------- */
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

/* ---------------------------------
   All guidance articles (list page)
---------------------------------- */
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
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
    excerpt,
    content,
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
    excerpt,
    "slug": slug.current
  }
`;



/* ---------------------------------
   Articles (optionally filtered)
---------------------------------- */
export const articlesByCategoryQuery = groq`
  *[
    _type == "article" &&
    (!defined($category) || category->slug.current == $category)
  ] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    publishedAt,
    "slug": slug.current,
    category->{
      title,
      "slug": slug.current
    }
  }
`;



