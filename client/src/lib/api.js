const BASE =
    import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1";

async function getResponse(path) {
    const res = await fetch(`${BASE}${path}`);
    const json = await res.json();

    if (!res.ok || json?.success === false) {
        throw new Error(
            json?.error?.message ?? `Request failed (${res.status})`,
        );
    }

    return json;
}

async function get(path) {
    const json = await getResponse(path);
    return json.data;
}

export const api = {
    recent: async (page = 1, perPage = 20) => {
        const json = await getResponse(
            `/anime/recent?page=${page}&perPage=${perPage}`,
        );

        return {
            items: json.data,
            pagination: json.meta,
        };
    },

    series: (id) => get(`/anime/series/${id}`),
};