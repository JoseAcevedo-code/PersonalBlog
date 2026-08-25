import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { sortPosts } from '../utils';

export async function GET(context: APIContext) {
  const posts = sortPosts(await getCollection('blog')).filter(
    (post) => !post.data.draft
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/writing/${post.id}/`,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
