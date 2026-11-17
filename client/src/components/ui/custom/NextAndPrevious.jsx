import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const NextAndPrevious = ({ 
    handlePageChange, 
    page, 
    pageNumbers, 
    totalPages

}) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={page === 1}
                        className={
                            page === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                        onClick={(event) =>
                            handlePageChange(event, page - 1)
                        }
                    />
                </PaginationItem>

                {pageNumbers.map((pageNumber, index) => (
                    <PaginationItem key={`${pageNumber}-${index}`}>
                        {pageNumber === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={pageNumber === page}
                                onClick={(event) =>
                                    handlePageChange(event, pageNumber)
                                }
                            >
                                {pageNumber}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        aria-disabled={page === totalPages}
                        className={
                            page === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                        onClick={(event) =>
                            handlePageChange(event, page + 1)
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default NextAndPrevious