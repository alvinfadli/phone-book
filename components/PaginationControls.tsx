import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  gotoPage: (pageNumber: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  lastPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  gotoPage,
  hasNextPage,
  hasPreviousPage,
  page,
  lastPage,
}) => {
  const pageNumbers = useMemo(() => {
    const maxButtons = 3;
    const delta = Math.floor(maxButtons / 2);
    let start = Math.max(1, page - delta);
    let end = Math.min(lastPage, start + maxButtons - 1);

    const showStartEllipsis = start > 1;
    const showEndEllipsis = end < lastPage;

    if (end - start < maxButtons - 1) {
      end = Math.min(lastPage, start + maxButtons - 1);
      start = Math.max(1, end - maxButtons + 1);
    }

    const pageNumbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    if (showStartEllipsis) pageNumbers.unshift(NaN);
    if (showEndEllipsis) pageNumbers.push(NaN);

    return pageNumbers;
  }, [page, lastPage]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {hasPreviousPage ? (
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => gotoPage(page - 1)}
            />
          ) : (
            <span className="cursor-not-allowed">
              <PaginationPrevious />
            </span>
          )}
        </PaginationItem>
        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={index}>
            {isNaN(pageNumber) ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className="cursor-pointer"
                onClick={() => gotoPage(pageNumber)}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          {hasNextPage ? (
            <PaginationNext
              className="cursor-pointer"
              onClick={() => gotoPage(page + 1)}
            />
          ) : (
            <span className="cursor-not-allowed">
              <PaginationNext className="" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
