import { anikotoFetch } from "./anikoto.client.js";

export const anikotoProvider = {
    async fetchRecent({ page = 1, perPage = 20 } = {}) {
        return anikotoFetch("/recent-anime", {
            query: { page, per_page: perPage },
        });
    },

    async fetchSeries(id) {
        return anikotoFetch(`/series/${encodeURIComponent(id)}`);
    },
};