"use client";
import { usePathname } from "@/i18n/routing";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  pageCount: number;
}

export default function PaginationComponent({
  pageCount,
}: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {pageCount > 1 && (
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          )}
        </PaginationItem>
        {pageCount > 1 ? (
          Array.from({ length: pageCount }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={createPageURL(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <PaginationItem key={1}>
            <PaginationLink href={createPageURL(1)} isActive>
              {1}
            </PaginationLink>
          </PaginationItem>
        )}
        {pageCount > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          {pageCount > 1 && (
            <PaginationNext href={createPageURL(currentPage + 1)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
