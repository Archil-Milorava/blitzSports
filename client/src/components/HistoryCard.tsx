import { HistoryItem } from "../../types/Article.types";

interface NewsCardProps {
  history: HistoryItem;
}

const HistoryCard = ({ history }: NewsCardProps) => {
  const { category, content, author, title, createdAt, badge, _id, imageUrl } =
    history;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row h-auto md:h-64 group">
      {/* Image Section */}
      <div className="relative w-full md:w-2/5 h-48 md:h-full overflow-hidden">
        <img
          src={imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width={300}
          height={200}
        />
        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded font-semibold capitalize">
          {category.toLowerCase()}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5 md:p-6 w-full md:w-3/5">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors duration-200">
            {title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
            {content}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="text-xs text-gray-500 font-medium">
            {formattedDate}
          </div>
          <button
            className="text-primary hover:text-primary-dark text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1 transition-colors"
            aria-label={`Read more about ${title}`}
          >
            Read more →
          </button>
        </div>
      </div>
    </article>
  );
};

export default HistoryCard;
