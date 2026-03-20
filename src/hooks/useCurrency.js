import { useState, useEffect } from "react";

const CACHE_KEY = "malta-currency-cache";
const TTL = 6 * 60 * 60 * 1000; // 6 hours

export const CURRENCIES = [
    { code: "GBP", name: "British Pound", flag: "GB" },
    { code: "USD", name: "US Dollar", flag: "US" },
    { code: "PLN", name: "Polish Złoty", flag: "PL" },
    { code: "CZK", name: "Czech Koruna", flag: "CZ" },
    { code: "HUF", name: "Hungarian Forint", flag: "HU" },
    { code: "CHF", name: "Swiss Franc", flag: "CH" },
    { code: "SEK", name: "Swedish Krona", flag: "SE" },
    { code: "NOK", name: "Norwegian Krone", flag: "NO" },
];

function loadCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function useCurrency() {
    const [rates, setRates] = useState(() => loadCache()?.rates || null);
    const [updatedAt, setUpdatedAt] = useState(
        () => loadCache()?.fetchedAt || null,
    );
    const [isStale, setIsStale] = useState(false);

    useEffect(() => {
        const cached = loadCache();
        if (cached && Date.now() - cached.fetchedAt < TTL) {
            setRates(cached.rates);
            setUpdatedAt(cached.fetchedAt);
            return;
        }

        const symbols = CURRENCIES.map((c) => c.code).join(",");
        fetch(`https://api.frankfurter.app/latest?from=EUR&to=${symbols}`)
            .then((r) => r.json())
            .then((data) => {
                const result = { rates: data.rates, fetchedAt: Date.now() };
                setRates(data.rates);
                setUpdatedAt(result.fetchedAt);
                setIsStale(false);
                localStorage.setItem(CACHE_KEY, JSON.stringify(result));
            })
            .catch(() => {
                if (cached) {
                    setRates(cached.rates);
                    setUpdatedAt(cached.fetchedAt);
                    setIsStale(true);
                }
            });
    }, []);

    return { rates, updatedAt, isStale };
}
