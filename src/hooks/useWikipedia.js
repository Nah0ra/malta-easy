import { useState, useEffect } from "react";

const memCache = {};

function cacheKey(title) {
    return `malta-wiki-v2-${title}`;
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

/**
 * Two-step fetch:
 *  1. REST summary endpoint  → extract text + mobile Wikipedia link
 *  2. Action API pageimages  → server-rendered 1200px thumbnail
 *     (guaranteed to exist, unlike URL-pattern substitution)
 */
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

        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

        const imageUrl =
            "https://en.wikipedia.org/w/api.php" +
            `?action=query&titles=${encodeURIComponent(title)}` +
            "&prop=pageimages&piprop=thumbnail&pithumbsize=1200" +
            "&format=json&origin=*";

        Promise.all([
            fetch(summaryUrl).then((r) => r.json()),
            fetch(imageUrl).then((r) => r.json()),
        ])
            .then(([summary, imageData]) => {
                // Extract the thumbnail from the Action API response
                const pages = imageData?.query?.pages || {};
                const page = Object.values(pages)[0] || {};
                const imgSrc = page?.thumbnail?.source || null;

                const result = {
                    extract: summary.extract || "",
                    imageUrl: imgSrc,
                    pageUrl: summary.content_urls?.mobile?.page || null,
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
