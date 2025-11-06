import Link from "next/link";
import { HistoryItem } from "../types/Article.types";
import getPlainTextExcerpt from "@/utils/getPlainTextExcerpt";
import ImageMain from "./ImageMain";

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
    <Link
      href={`/article/${_id}`}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row h-auto md:h-64 group cursor-pointer relative"
    >
      {/* Hover border animation */}
      <div className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-1" />

      {/* Image Section */}
      <div className="relative w-full md:w-2/5 h-56 md:h-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={
            imageUrl || "https://via.placeholder.com/800x450?text=Sports+News"
          }
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-100"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-primary text-black tracking-wider text-xs px-2 py-1 rounded font-semibold capitalize z-10">
          {category.toUpperCase()}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5 md:p-6 w-full md:w-3/5 transition-transform duration-300 group-hover:translate-x-1">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-secondary transition-colors duration-200">
            {title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 group-hover:text-gray-800 transition-colors duration-200">
            {getPlainTextExcerpt(content)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-200">
            {formattedDate}
          </div>
          <span className="text-black group-hover:text-secondary  text-sm font-medium transition-all duration-300">
            სრულად →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HistoryCard;
