'use client'

import { useState } from 'react';

import allNews from "../dummy.json"

interface NewsItem {
  title: string;
  content: string;
  published: string;
  category: string;
  image_url: string;
}

const FootballPage = () => {
 

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  // Calculate current news to display
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = allNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(allNews.length / newsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ka-GE", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ფეხბურთი</h1>
        <p className="text-gray-600">უახლესი ამბები და სიახლეები ფეხბურთის სამყაროდან</p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentNews.map((news, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={news.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={news.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
                {news.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{news.title}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.content}</p>
              <div className="flex items-center justify-between">
                <time className="text-xs text-gray-500">{formatDate(news.published)}</time>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  წაიკითხე მეტი
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              &larr; წინა
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              შემდეგი &rarr;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default FootballPage;