type PostMeta = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
};

type PostModule = {
  meta: PostMeta;
  default: React.ComponentType;
};

// Auto-discover all MDX files
const modules = import.meta.glob<PostModule>('./*.mdx', { eager: true });

export const posts = Object.values(modules)
  .map((mod) => ({
    ...mod.meta,
    Component: mod.default,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);
