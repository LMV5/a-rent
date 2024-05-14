import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Pagination({ page, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  }

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        disabled={page === 1}
        className={page === 1 ? "opacity-30" : ""}
        onClick={() => handlePageChange(page - 1)}
      >
        <FaArrowLeft />
      </button>
      <span className="mx-2">
        {" "}
        Page {page} of {totalPages}{" "}
      </span>
      <button
        disabled={page === totalPages}
        className={page === totalPages ? "opacity-30" : ""}
        onClick={() => handlePageChange(page + 1)}
      >
        <FaArrowRight />
      </button>
    </section>
  );
}

export default Pagination;
