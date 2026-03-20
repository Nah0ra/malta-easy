import { useState, useEffect } from "react";

const CACHE_KEY = "malta-weather-cache";
const TTL = 30 * 60 * 1000; // 30 minutes

const WMO_CODES = {
    0: { desc: "Clear sky", icon: "sun" },
    1: { desc: "Mainly clear", icon: "sun" },
    2: { desc: "Partly cloudy", icon: "cloud" },
    3: { desc: "Overcast", icon: "cloud" },
    45: { desc: "Foggy", icon: "cloud" },
    48: { desc: "Foggy", icon: "cloud" },
    51: { desc: "Light drizzle", icon: "rain" },
    53: { desc: "Drizzle", icon: "rain" },
    55: { desc: "Heavy drizzle", icon: "rain" },
    61: { desc: "Light rain", icon: "rain" },
    63: { desc: "Rain", icon: "rain" },
    65: { desc: "Heavy rain", icon: "rain" },
    80: { desc: "Rain showers", icon: "rain" },
    81: { desc: "Rain showers", icon: "rain" },
    82: { desc: "Heavy showers", icon: "rain" },
    95: { desc: "Thunderstorm", icon: "storm" },
    96: { desc: "Thunderstorm", icon: "storm" },
    99: { desc: "Thunderstorm", icon: "storm" },
};

function loadCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function useWeather() {
    const [weather, setWeather] = useState(() => loadCache());
    const [isStale, setIsStale] = useState(false);

    useEffect(() => {
        const cached = loadCache();
        if (cached && Date.now() - cached.fetchedAt < TTL) {
            setWeather(cached);
            return;
        }

        fetch(
            "https://api.open-meteo.com/v1/forecast" +
                "?latitude=35.8997&longitude=14.5147" +
                "&current=temperature_2m,weather_code,wind_speed_10m" +
                "&timezone=Europe%2FMalta",
        )
            .then((r) => r.json())
            .then((data) => {
                const c = data.current;
                const code = c.weather_code;
                const meta = WMO_CODES[code] || {
                    desc: "Partly cloudy",
                    icon: "cloud",
                };
                const result = {
                    temp: Math.round(c.temperature_2m),
                    wind: Math.round(c.wind_speed_10m),
                    desc: meta.desc,
                    icon: meta.icon,
                    fetchedAt: Date.now(),
                };
                setWeather(result);
                setIsStale(false);
                localStorage.setItem(CACHE_KEY, JSON.stringify(result));
            })
            .catch(() => {
                if (cached) {
                    setWeather(cached);
                    setIsStale(true);
                }
            });
    }, []);

    return { weather, isStale };
}
