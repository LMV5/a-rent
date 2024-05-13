import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import LinkButton from "./LinkButton";

function Pagination({ page, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  }

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <LinkButton
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <FaArrowLeft />
      </LinkButton>
      <span className="mx-2">
        {" "}
        Page {page} of {totalPages}{" "}
      </span>
      <LinkButton
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <FaArrowRight />
      </LinkButton>
    </section>
  );
}

export default Pagination;
