import { env } from "../../../app/index.js";

export class AnikotoError extends Error {
    constructor(message, { status, path, cause } = {}) {
        super(message);
        this.name = "AnikotoError";
        this.status = status;
        this.path = path;
        this.cause = cause;
    }
}

export async function anikotoFetch(path, { query } = {}) {
    const url = new URL(path, env.anikoto.baseUrl);
    if (query) {
        for (const [k, v] of Object.entries(query)) {
            if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
        }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), env.anikoto.timeoutMs);

    let res;
    try {
        res = await fetch(url, {
            signal: controller.signal,
            headers: { Accept: "application/json" },
        });
    } catch (err) {
        throw new AnikotoError(`Anikoto request failed: ${err.message}`, {
            path,
            cause: err,
        });
    } finally {
        clearTimeout(timer);
    }

    if (!res.ok) {
        // 429 / 403 etc. Surface it clearly; the service will decide fallback.
        throw new AnikotoError(`Anikoto responded ${res.status}`, {
            status: res.status,
            path,
        });
    }

    const json = await res.json();
    if (json?.ok === false) {
        throw new AnikotoError("Anikoto returned ok:false", { path });
    }
    return json;
}