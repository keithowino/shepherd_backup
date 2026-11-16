import { Card, CardContent } from "@/components/ui/card";

export const AnimeCard = ({ anime, onClick }) => (
    <Card
        onClick={onClick}
        className="cursor-pointer overflow-hidden bg-card hover:ring-2 hover:ring-primary transition"
    >
        <div className="aspect-3/4 bg-muted">
            {anime.poster && (
                <img
                    src={anime.poster}
                    alt={anime.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            )}
        </div>
        <CardContent className="p-2">
            <p className="line-clamp-2 text-sm font-medium">{anime.title}</p>
            <p className="text-xs text-muted-foreground">
                {anime.status} · {anime.year ?? "—"}
            </p>
        </CardContent>
    </Card>
);