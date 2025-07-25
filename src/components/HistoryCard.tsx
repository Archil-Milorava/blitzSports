export interface NewsItem {
  title: string;
  content: string;
  published: string;
  category: string;
  image_url: string;
}

interface NewsCardProps {
  history: NewsItem;
}

const HistoryCard = ({ history }: NewsCardProps) => {
  const { category, content, image_url, published, title } = history;

  const formattedDate = new Date(published).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <article className="bg-[#FFFCF1]   overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row h-auto md:h-64">
      {/* Image Section */}
      <div className="relative w-full md:w-1/3 h-48 md:h-auto ">
        <img
          src={image_url || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-primary text-secondary text-xs px-2 py-1 rounded font-semibold">
          {category}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4 md:p-6 w-full md:w-2/3">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 md:line-clamp-4">
            {content}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-500">21 ივლ 2025</span>
          <button className="text-primary hover:text-primary-dark text-sm font-medium"></button>
        </div>
      </div>
    </article>
  );
};

export default HistoryCard;
