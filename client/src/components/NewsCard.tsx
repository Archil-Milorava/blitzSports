import Link from "next/link";
import { NewsItem } from "../types/Article.types";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { category, content, author, title, badge, createdAt, _id, imageUrl } =
    news;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getPlainTextExcerpt = (html: string, length: number = 100) => {
    const plainText = html.replace(/<[^>]*>?/gm, "");
    return plainText.length > length
      ? plainText.substring(0, length) + "..."
      : plainText;
  };
  return (
    <Link
      href={`article/${_id}`}
      className="group relative bg-[#FFFCF1] rounded-sm overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Image with gradient overlay */}
<div className="relative w-full aspect-video overflow-hidden">
  <img
    src={
      imageUrl || "https://via.placeholder.com/800x450?text=Sports+News"
    }
    alt={title}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

  {/* Floating category chip */}
  <div className="absolute top-4 left-4">
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-secondary text-white tracking-wider backdrop-blur-sm">
      {category.toUpperCase()}
    </span>
  </div>
</div>

      {/* Content section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Date above title */}
        <span className="text-xs font-medium text-gray-500 mb-1.5">
          {formattedDate}
        </span>

        <h2 className="text-xl font-bold text-gray-900 mb-2.5 line-clamp-2 leading-tight">
          {title}
        </h2>

        {/* Content excerpt with fade effect */}
        <div className="relative mb-4">
          <p className="text-gray-600 text-sm line-clamp-2">
            {getPlainTextExcerpt(content)}
          </p>
        </div>
      </div>

      {/* Hover state indicator */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};

export default NewsCard;
