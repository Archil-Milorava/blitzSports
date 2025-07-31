interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 ">
      <nav className="inline-flex rounded-md shadow">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
        >
          &larr; Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 border-t border-b border-gray-300 ${
              currentPage === number
                ? "bg-secondary text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
        >
          Next &rarr;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
