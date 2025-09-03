import MmaBanner from "@/components/MmaBanner";
import SocMediaShare from "@/components/SocMediaShare";
import { getApiBaseUrl } from "@/utils/getBaseUrl";
import { Metadata } from "next";

import "./article-styles.css";

import getPlainTextExcerpt from "@/utils/getPlainTextExcerpt";
import EditButton from "@/components/EditButton";
import Logo from "@/assets/Logo.png"
import DeleteButton from "@/components/DeleteButton";

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

  const shareText = getPlainTextExcerpt(article.content);

  return {
    title: `${article.title} | Blitz Sports`,
    description: shareText,
    openGraph: {
      title: article.title,
      description: shareText,
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
      description: shareText,
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
  const publishDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  

  return (
    <main className="min-h-screen  px-4 sm:px-6 md:px-40 lg:px-72 py-[5rem] bg-[#D9D9D9] overflow-hidden">
      {/* image */}
      <div className="mb-8 rounded-xl max-h-[40rem] overflow-hidden shadow-lg">
        <img
          src={article.imageUrl || Logo.src}
          alt={article.title}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full h-full  flex items-center justify-end gap-2">
      <EditButton articleId={article._id} />
      <DeleteButton articleId={article._id} />
      </div>
  
      <div>
        <div className="flex items-center gap-2 pb-4">
          <p className="text-sm text-gray-500">{publishDate}</p>
          <p className="text-xs text-white bg-secondary px-4 py-1 rounded-full">
            {article.category}
          </p>
        </div>
      </div>
      {/* titile */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
        {article.title}
      </h1>
      {/* content */}
      <article>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
      {/* soc media */}
      <SocMediaShare shareText={shareText} shareUrl={shareUrl} />
      {/* author */}
      <div className="flex items-center space-x-4 mt-11  border-accent  border-t border-b p-2">
        <div className="flex items-center">
          <img
            src={article.author?.avatar}
            alt={article.author?.fullName}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {article.author?.fullName}
            </p>
            <p className="text-xs text-gray-500">{publishDate}</p>
          </div>
        </div>
      </div>
      <MmaBanner />
    </main>
  );
}
