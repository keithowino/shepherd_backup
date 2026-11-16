import { Episode } from "../models/index.js";

export const episodeRepository = {
    async replaceForAnime(animeId, rawEpisodes, fetchedAt = new Date()) {
        await Episode.deleteMany({ animeId: Number(animeId) });
        if (!rawEpisodes.length) return;

        const docs = rawEpisodes.map((e) => ({
            _id: e.id,
            animeId: Number(animeId),
            number: e.number,
            title: e.title,
            jpTitle: e.jp_title,
            embedId: e.episode_embed_id,
            embedUrls: {
                sub: e.embed_url?.sub,
                dub: e.embed_url?.dub,
            },
            sourceUpdatedAt: e.updated_at ? new Date(e.updated_at) : undefined,
            fetchedAt,
        }));

        await Episode.insertMany(docs, { ordered: false });
    },

    async findByAnimeId(animeId) {
        return Episode.find({ animeId: Number(animeId) })
            .sort({ number: 1 })
            .lean();
    },
};