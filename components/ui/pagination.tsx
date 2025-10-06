'use client';

import React from 'react';
import { Button } from './button';

interface PaginationProps {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

function getPages(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  let pages: (number | string)[] = [];
  if (current <= 3) {
    pages = [1, 2, 3, 4, '...', total];
  } else if (current >= total - 2) {
    pages = [1, '...', total - 3, total - 2, total - 1, total];
  } else {
    pages = [1, '...', current - 1, current, current + 1, '...', total];
  }
  return pages;
}

const Pagination: React.FC<PaginationProps> = ({ setCurrentPage, currentPage, totalPages }) => {
  const pages = getPages(currentPage, totalPages);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Prev */}
      <Button
        variant="ghost"
        size="sm"
        className="text-primary flex items-center gap-1 px-2 font-semibold sm:px-3"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        &laquo; <span className="hidden sm:inline">Trang trước</span>
      </Button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={idx} className="text-muted-foreground mx-1 text-lg select-none">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? 'outline' : 'ghost'}
            size="sm"
            className={`h-8 w-8 rounded-full px-0 text-lg font-normal ${
              page === currentPage ? 'border-primary text-primary font-semibold' : 'text-foreground'
            }`}
            onClick={() => setCurrentPage(Number(page))}
          >
            {page}
          </Button>
        )
      )}

      {/* Next */}
      <Button
        variant="ghost"
        size="sm"
        className="text-primary flex items-center gap-1 px-2 font-semibold sm:px-3"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <span className="hidden sm:inline">Trang sau</span> &raquo;
      </Button>
    </div>
  );
};

export default Pagination;
