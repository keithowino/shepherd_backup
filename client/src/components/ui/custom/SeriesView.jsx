import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Frame } from "./Frame";
import { Button } from "@/components/ui/button";

export const SeriesView = ({ id, onBack }) => {
    const [data, setData] = useState(null);
    const [active, setActive] = useState(null);
    const [mode, setMode] = useState("sub");
    const [error, setError] = useState(null);

    useEffect(() => {
        setData(null);
        setError(null);
        api.series(id)
            .then((d) => {
                setData(d);
                setActive(d.episodes[0] ?? null);
            })
            .catch((e) => setError(e.message));
    }, [id]);

    if (error) return <p className="text-destructive">{error}</p>;
    if (!data) return <p>Loading…</p>;
    if (!data.anime) return <p className="text-destructive">Series not found.</p>;

    const { anime, episodes } = data;

    const src = active?.embedUrls?.[mode] ?? active?.embedUrls?.sub;

    return (
        <div className="space-y-4">
            <Button variant="ghost" onClick={onBack}>← Back</Button>

            <div className="flex gap-4">
                {data.anime.poster && (
                    <img
                        src={data.anime.poster}
                        alt={data.anime.title}
                        className="w-32 rounded-lg"
                    />
                )}
                <div>
                    <h2 className="text-xl font-semibold">{data.anime.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {data.anime.description}
                    </p>
                </div>
            </div>

            {src && <Frame src={src} title={`${data.anime.title} – EP ${active.number}`} />}

            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant={mode === "sub" ? "default" : "outline"}
                    onClick={() => setMode("sub")}
                >
                    SUB
                </Button>
                <Button
                    size="sm"
                    variant={mode === "dub" ? "default" : "outline"}
                    disabled={!active?.embedUrls?.dub}
                    onClick={() => setMode("dub")}
                >
                    DUB
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {data.episodes.map((ep) => (
                    <Button
                        key={ep._id ?? ep.id}
                        size="sm"
                        variant={active?._id === ep._id || active?.id === ep.id ? "default" : "outline"}
                        onClick={() => setActive(ep)}
                    >
                        EP {ep.number}
                    </Button>
                ))}
            </div>
        </div>
    );
};