import { ChevronLeft, ChevronRight } from "lucide-react";

import React from "react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6">
      <div className="join">        
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="join-item btn btn-outline disabled:opacity-50"
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`join-item btn ${
              currentPage === page ? "btn-success" : "btn-outline"
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="join-item btn btn-outline disabled:opacity-50"
          aria-label="Página siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
