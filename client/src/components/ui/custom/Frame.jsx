import { AspectRatio } from "@/components/ui/aspect-ratio";

export const Frame = ({ src, title = "Anime Player" }) => {
    if (!src) return null;
    return (
        <AspectRatio ratio={16 / 9} className="w-full rounded-lg overflow-hidden bg-muted">
            <iframe
                src={src}
                title={title}
                width="100%"
                height="100%"
                allowFullScreen
                allow="fullscreen; encrypted-media; picture-in-picture"
                className="border-0"
            />
        </AspectRatio>
    );
};