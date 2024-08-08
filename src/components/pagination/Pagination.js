import React from "react";
import { Link } from "react-router-dom";

function Pagination({ pageName, currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <Link to={`/${pageName}/?page=${pageNumber}`}>
              <button
                onClick={() => onPageChange(pageNumber)}
                className={
                  pageNumber === currentPage
                    ? "paginationItem paginationItemActive"
                    : "paginationItem"
                }
              >
                {pageNumber}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
