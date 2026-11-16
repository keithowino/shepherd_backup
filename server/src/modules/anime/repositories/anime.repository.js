import { Anime } from "../models/index.js";

export const animeRepository = {
    async upsertMany(rawAnimes, fetchedAt = new Date()) {
        if (!rawAnimes.length) return;

        const ops = rawAnimes.map((a) => ({
            updateOne: {
                filter: { _id: a.id },
                update: {
                    $set: {
                        // _id: a.id,
                        title: a.title,
                        alternative: a.alternative,
                        titles: a.titles,
                        native: a.native,
                        slug: a.slug,
                        rating: a.rating,
                        poster: a.poster,
                        description: a.description,
                        aired: a.aired,
                        season: a.season,
                        year: a.year,
                        status: a.status,
                        score: a.score,
                        malId: a.mal_id,
                        episodesCount: a.episodes,
                        isDub: a.is_dub,
                        isSub: a.is_sub,
                        termsByType: a.terms_by_type || {},
                        sourceUpdatedAt: a.updated_at
                            ? new Date(a.updated_at)
                            : undefined,
                        fetchedAt,
                    },
                },
                upsert: true,
            },
        }));

        await Anime.bulkWrite(ops, { ordered: false });
    },

    async findById(id) {
        return Anime.findById(Number(id)).lean();
    },

    async findManyByIds(ids) {
        return Anime.find({ _id: { $in: ids.map(Number) } }).lean();
    },

    async isFresh(id, ttlMs) {
        const doc = await Anime.findById(Number(id))
            .select("fetchedAt")
            .lean();
        if (!doc?.fetchedAt) return false;
        return Date.now() - new Date(doc.fetchedAt).getTime() < ttlMs;
    },

    async isSeriesFresh(id, ttlMs) {
        const doc = await Anime.findById(Number(id))
            .select("seriesFetchedAt")
            .lean();

        if (!doc?.seriesFetchedAt) return false;

        return Date.now() - new Date(doc.seriesFetchedAt).getTime() < ttlMs;
    },

    async markSeriesFetched(id, fetchedAt = new Date()) {
        await Anime.updateOne(
            { _id: Number(id) },
            { $set: { seriesFetchedAt: fetchedAt } },
        );
    },
};