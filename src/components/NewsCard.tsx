export interface NewsItem {
  title: string;
  content: string;
  published: string;
  category: string;
  image_url: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { category, content, image_url, published, title } = news;
  
  // Format the date nicely
  const formattedDate = new Date(published).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <article className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Image with hover effect */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <img
          src={image_url || 'https://via.placeholder.com/400x300?text=News+Image'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h2>
        
        {/* Divider */}
        <div className="w-12 h-0.5 bg-primary my-2"></div>
        
        {/* Footer with date and read more */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-500">{formattedDate}</span>
          <button className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;