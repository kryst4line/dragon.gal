import { getCollection, type CollectionEntry } from 'astro:content'
import type { YearGroupedPosts } from '@/types'

/**
 * Get all posts, filtering out posts whose filenames start with _
 */
export async function getFilteredPosts() {
  const posts = await getCollection('posts')
  return posts.filter((post: CollectionEntry<'posts'>) => !post.id.startsWith('_'))
}

/**
 * Get all posts sorted by publication date, filtering out posts whose filenames start with _
 */
export async function getSortedFilteredPosts() {
  const posts = await getFilteredPosts()
  return posts.sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}

/**
 * Get all posts grouped by year, sorted by publication date, filtering out posts whose filenames start with _
 */
export async function getGroupedSortedFilteredPosts(): Promise<YearGroupedPosts[]> {
  const posts = await getSortedFilteredPosts();
  const years: YearGroupedPosts[] = [];
  posts.forEach((post: CollectionEntry<'posts'>) => {
    const year = post.data.pubDate.getFullYear();
    if (!years.some((y) => y.year == year)) years.push({ year: year, posts: [] });
    years.find((y) => y.year == year)?.posts.push(post);
  });
  return years;
}
