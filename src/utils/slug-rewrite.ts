import type { CollectionEntry } from 'astro:content'

export function slugRewrite(post: CollectionEntry<'posts'>) {
  return {
    ...post,
    id: post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '')
  } as CollectionEntry<'posts'>;
}
