import { anikotoProvider, AnikotoError } from "../providers/index.js";
import { animeRepository } from "../repositories/anime.repository.js";
import { episodeRepository } from "../repositories/episode.repository.js";
import { AppError, env, ErrorCodes, HTTP_STATUS } from "../../../app/index.js";

export const mediaService = {
    async getRecent({ page = 1, perPage = 20 } = {}) {
        try {
            const json = await anikotoProvider.fetchRecent({ page, perPage });
            const fetchedAt = new Date();
            await animeRepository.upsertMany(json.data, fetchedAt);

            return {
                items: json.data,          // normalized Mongo docs would also work
                pagination: json.pagination,
            };
        } catch (err) {
            // Fallback: if Anikoto is down/rate-limited, serve whatever is cached
            if (err instanceof AnikotoError) {
                throw new AppError(
                    err.status === HTTP_STATUS.TOO_MANY_REQUESTS
                        ? "Rate limited by upstream anime API, try again shortly."
                        : "Upstream anime API unavailable.",
                    HTTP_STATUS.BAD_GATEWAY,
                    ErrorCodes.BAD_GATEWAY,
                );
            }
            throw err;
        }
    },

    async getSeries(id) {
        const fresh = await animeRepository.isFresh(
            id,
            env.anikoto.cacheTtlMs,
        );

        // Cache hit: serve from Mongo, no upstream call
        if (fresh) {
            const [anime, episodes] = await Promise.all([
                animeRepository.findById(id),
                episodeRepository.findByAnimeId(id),
            ]);
            if (anime) {
                return { anime, episodes, cached: true };
            }
        }

        // Cache miss: fetch, normalize, persist, return
        try {
            const json = await anikotoProvider.fetchSeries(id);
            const fetchedAt = new Date();
            const { anime, episodes } = json.data;

            await animeRepository.upsertMany([anime], fetchedAt);
            await episodeRepository.replaceForAnime(id, episodes, fetchedAt);

            const [storedAnime, storedEpisodes] = await Promise.all([
                animeRepository.findById(id),
                episodeRepository.findByAnimeId(id),
            ]);

            return { anime: storedAnime, episodes: storedEpisodes, cached: false };
        } catch (err) {
            if (err instanceof AnikotoError) {
                // Last-resort: stale cache beats a 502
                const [anime, episodes] = await Promise.all([
                    animeRepository.findById(id),
                    episodeRepository.findByAnimeId(id),
                ]);
                if (anime) return { anime, episodes, cached: true, stale: true };

                throw new AppError(
                    err.status === HTTP_STATUS.TOO_MANY_REQUESTS
                        ? "Rate limited by upstream anime API."
                        : "Upstream anime API unavailable.",
                    HTTP_STATUS.BAD_GATEWAY,
                    ErrorCodes.BAD_GATEWAY,
                );
            }
            throw err;
        }
    },
};