const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1";

async function get(path) {
    const res = await fetch(`${BASE}${path}`);
    const json = await res.json();
    if (!res.ok || json?.success === false) {
        throw new Error(json?.error?.message ?? `Request failed (${res.status})`);
    }
    return json.data;
}

export const api = {
    recent: (page = 1, perPage = 20) =>
        get(`/anime/recent?page=${page}&perPage=${perPage}`),
    series: (id) => get(`/anime/series/${id}`),
};