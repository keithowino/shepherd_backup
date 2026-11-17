import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { AnimeCard } from "./AnimeCard";
import { Skeleton } from "@/components/ui/skeleton";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import NextAndPrevious from "./NextAndPrevious";

const PER_PAGE = 20;

function getPageNumbers(currentPage, totalPages) {
    if (totalPages <= 1) return [1];

    const pages = [1];

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
        pages.push("ellipsis");
    }

    for (let page = start; page <= end; page++) {
        pages.push(page);
    }

    if (end < totalPages - 1) {
        pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
}

export const AnimeGrid = () => {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;

        setLoading(true);
        setError(null);

        api.recent(page, PER_PAGE)
            .then((response) => {
                if (active) {
                    setResult(response);
                }
            })
            .catch((err) => {
                if (active) {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, [page]);

    const totalPages = result?.pagination?.total_pages ?? 1;
    const pageNumbers = getPageNumbers(page, totalPages);

    const handlePageChange = (event, nextPage) => {
        event.preventDefault();

        if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
            return;
        }

        setPage(nextPage);
    };

    if (error) {
        return <p className="text-destructive">{error}</p>;
    }

    if (loading || !result) {
        return (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="aspect-3/4 rounded-lg"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <NextAndPrevious 
                handlePageChange={handlePageChange} 
                page={page} 
                pageNumbers={pageNumbers} 
                totalPages={totalPages}
            />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {result.items.map((anime) => (
                    <Link key={anime.id} to={`shepherd/anime/${anime.id}`}>
                        <AnimeCard
                        anime={anime}
                    /></Link>
                ))}
            </div>

            <NextAndPrevious 
                handlePageChange={handlePageChange} 
                page={page} 
                pageNumbers={pageNumbers} 
                totalPages={totalPages}
            />
            
        </div>
    );
};