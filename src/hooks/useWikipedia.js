import { useState, useEffect } from "react";

const memCache = {};

function cacheKey(title) {
    return `malta-wiki-${title}`;
}

function loadFromStorage(title) {
    try {
        const raw = localStorage.getItem(cacheKey(title));
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveToStorage(title, data) {
    try {
        localStorage.setItem(cacheKey(title), JSON.stringify(data));
    } catch {}
}

export function useWikipedia(title) {
    const [data, setData] = useState(
        () => memCache[title] || loadFromStorage(title),
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!title) return;
        if (memCache[title]) {
            setData(memCache[title]);
            return;
        }
        const stored = loadFromStorage(title);
        if (stored) {
            memCache[title] = stored;
            setData(stored);
            return;
        }

        setLoading(true);
        fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
        )
            .then((r) => r.json())
            .then((json) => {
                const result = {
                    extract: json.extract || "",
                    imageUrl: json.thumbnail?.source || null,
                    pageUrl: json.content_urls?.mobile?.page || null,
                };
                memCache[title] = result;
                saveToStorage(title, result);
                setData(result);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [title]);

    return { data, loading };
}
