import React from "react";
import PropTypes from "prop-types";
import IconButton from "./IconButton";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);
    let start = Math.max(currentPage - halfVisible, 1);
    let end = start + visiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - visiblePages + 1, 1);
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        padding: "16px",
      }}
    >
      <IconButton
        iconClass="fa-solid fa-arrow-left"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "8px 16px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      />

      {getPageNumbers().map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          style={{
            padding: "8px 16px",
            backgroundColor:
              number === currentPage
                ? "var(--color-primary)"
                : "var(--color-secondary)",
            color:
              number === currentPage
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {number}
        </button>
      ))}

      <IconButton
        iconClass="fa-solid fa-arrow-right"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px 16px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      />
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
