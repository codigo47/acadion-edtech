import type { Metadata } from 'next';
import { blogSEO, defaultSEO } from './seo-data';
import { blogPosts } from '../data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seo = blogSEO[slug] || defaultSEO;
  const post = blogPosts.find((p) => p.slug === slug);

  const title = seo.title.en;
  const description = seo.description.en;
  const keywords = seo.keywords.en;

  return {
    title: `${title} | Acadion.ai Blog`,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: post?.author || 'acadion.ai team' }],
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Acadion.ai',
      locale: 'en_US',
      alternateLocale: 'es_ES',
      url: `https://acadion.ai/blog/${slug}`,
      publishedTime: post?.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://acadion.ai/blog/${slug}`,
      languages: {
        en: `https://acadion.ai/blog/${slug}?lang=en`,
        es: `https://acadion.ai/blog/${slug}?lang=es`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
