"use client";

import LoadingSmall from "@/components/LoadingSmall";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import { getApiBaseUrl } from "@/utils/getBaseUrl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NewsItem } from "../../../types/Article.types";

const baseUrl = getApiBaseUrl();

const FootballPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const updateQuery = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/article/histories?page=${page}`);
        const data = await res.json();
        setArticles(Array.isArray(data.articles) ? data.articles : []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  useEffect(() => {
    const queryPage = parseInt(searchParams.get("page") || "1", 10);
    if (queryPage !== page) {
      setPage(queryPage);
    }
  }, [searchParams, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateQuery(newPage);
  };

  return (
    <main className="min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16 flex flex-col gap-12 flex-1">
        {/* Title */}
        <h1 className="text-4xl py-2 md:text-5xl font-extrabold text-gray-900 text-center capitalize tracking-wide drop-shadow-sm">
          ისტორიები
        </h1>

        {/* Articles Grid */}
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loading ? (
            <LoadingSmall />
          ) : articles.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-8 text-lg">
              სტატია ვერ მოიძებნა.
            </p>
          ) : (
            articles.map((article) => (
              <NewsCard news={article} key={article._id} />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={page}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default FootballPage;
