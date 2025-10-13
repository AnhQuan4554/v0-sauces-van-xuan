'use client';

import React from 'react';
import { Button } from './button';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
type PaginationProps = {
  totalPages: number;
};

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

const Pagination = ({ totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const componentT = useTranslations('Component');
  const current_page = Number(searchParams?.get('current_page')) || 1;
  const pages = getPages(current_page, totalPages);
  const pathname = usePathname();
  const router = useRouter();
  const handlePrev = () => {
    if (current_page > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('current_page', String(current_page - 1));
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleNext = () => {
    if (current_page < totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('current_page', String(current_page + 1));
      router.replace(`${pathname}?${params.toString()}`);
    }
  };
  const handleChangePage = (currentPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('current_page', String(currentPage));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Prev */}
      <Button
        variant="ghost"
        size="sm"
        className="text-primary flex items-center gap-1 px-2 font-semibold sm:px-3"
        disabled={current_page === 1}
        onClick={handlePrev}
      >
        &laquo; <span className="hidden sm:inline">{componentT('Button.prePage')}</span>
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
            variant={page === current_page ? 'outline' : 'ghost'}
            size="sm"
            className={`h-8 w-8 rounded-full px-0 text-lg font-normal ${
              page === current_page
                ? 'border-primary text-primary font-semibold'
                : 'text-foreground'
            }`}
            onClick={() => handleChangePage(Number(page))}
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
        disabled={current_page === totalPages}
        onClick={handleNext}
      >
        <span className="hidden sm:inline">{componentT('Button.nextPage')}</span> &raquo;
      </Button>
    </div>
  );
};

export default Pagination;
