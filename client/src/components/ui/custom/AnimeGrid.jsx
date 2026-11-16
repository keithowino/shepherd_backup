import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { AnimeCard } from "./AnimeCard";
import { Skeleton } from "@/components/ui/skeleton";

export const AnimeGrid = ({ onSelect }) => {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.recent(1, 20)
            .then(setItems)
            .catch((e) => setError(e.message));
    }, []);

    if (error) return <p className="text-destructive">{error}</p>;
    if (!items) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-3/4 rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((a) => (
                <AnimeCard key={a.id} anime={a} onClick={() => onSelect(a.id)} />
            ))}
        </div>
    );
};