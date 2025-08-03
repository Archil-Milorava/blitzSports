import { getApiBaseUrl } from "@/utils/getBaseUrl";
import { Metadata } from "next";
import Link from "next/link";

export interface Author {
  _id: string;
  fullName: string;
  avatar: string;
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  badge: string;
  category: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const BASE_URL = getApiBaseUrl();

async function getArticle(id: string): Promise<Article | null> {
  const res = await fetch(`${BASE_URL}/article/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Blitz Sports`,
    description: article.content.slice(0, 150),
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 150),
      url: `https://www.blitzsports.live/article/${id}`,
      siteName: "Blitz Sports",
      images: [
        {
          url: article.imageUrl,
          alt: article.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.content.slice(0, 150),
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-500">
        Article not found
      </div>
    );
  }

  const shareUrl = `https://www.blitzsports.live/article/${id}`;
  const shareText = encodeURIComponent(article.title);

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-0 pb-20">
      {/* Hero Image */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h1 className="absolute bottom-4 left-4 text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          {article.title}
        </h1>
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none text-gray-800 mt-6">
        {article.content}
      </article>

      {/* Social Share Buttons */}
      <div className="flex gap-4 mt-10 flex-wrap">
        <Link
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
          target="_blank"
          className="bg-blue-400 text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Share on Twitter
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Share on Facebook
        </Link>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Share on LinkedIn
        </Link>
      </div>
    </main>
  );
}
