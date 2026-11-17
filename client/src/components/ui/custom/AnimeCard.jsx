import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const AnimeCard = ({ anime, onClick }) => (
    <Card
        onClick={onClick}
        className="relative mx-auto w-full max-w-sm pt-0 cursor-pointer overflow-hidden bg-card hover:ring-2 hover:ring-primary transition"
    >
        <AspectRatio>{anime.poster && (
            <img
                src={anime.poster}
                alt={anime.title}
                className="h-full w-full object-cover"
                loading="lazy"
            />
        )}</AspectRatio>
        <CardContent className="p-2">
            <p className="line-clamp-2 text-sm font-medium">{anime.title}</p>
            <p className="text-xs text-muted-foreground">
                {anime.status} · {anime.year ?? "—"}
            </p>
        </CardContent>
    </Card>
);