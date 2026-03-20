import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { useFontSizeContext } from "../context/FontSizeContext";
import { useWeather } from "../hooks/useWeather";
import { useCurrency, CURRENCIES } from "../hooks/useCurrency";
import emergency from "../data/emergency.json";

const phrases = [
    { en: "Hello", mt: "Bonġu" },
    { en: "Thank you", mt: "Grazzi" },
    { en: "Please", mt: "Jekk jogħġbok" },
    { en: "Where is...?", mt: "Fejn hu...?" },
    { en: "How much?", mt: "Kemm jiswu?" },
    { en: "Excuse me", mt: "Skużani" },
    { en: "Yes / No", mt: "Iva / Le" },
];

const iconMap = {
    emergency: (
        <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='var(--red)'
            strokeWidth='2'
            strokeLinecap='round'>
            <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' />
        </svg>
    ),
    hospital: (
        <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='var(--red)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M12 2L2 7v10c0 5 10 5 10 5s10 0 10-5V7L12 2z' />
            <line x1='12' y1='8' x2='12' y2='16' />
            <line x1='8' y1='12' x2='16' y2='12' />
        </svg>
    ),
    police: (
        <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='var(--red)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <circle cx='12' cy='12' r='10' />
            <line x1='12' y1='8' x2='12' y2='12' />
            <line x1='12' y1='16' x2='12.01' y2='16' />
        </svg>
    ),
    ambulance: (
        <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='var(--red)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <rect x='1' y='3' width='15' height='13' rx='2' />
            <polygon points='16 8 20 8 23 11 23 16 16 16 16 8' />
            <circle cx='5.5' cy='18.5' r='2.5' />
            <circle cx='18.5' cy='18.5' r='2.5' />
        </svg>
    ),
};

function SectionTitle({ children }) {
    return (
        <p
            style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--ink-3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 10,
                marginTop: 6,
            }}>
            {children}
        </p>
    );
}

function InfoCard({ title, children }) {
    return (
        <div
            style={{
                background: "var(--white)",
                borderRadius: "var(--r-md)",
                padding: 16,
                border: "1px solid var(--border)",
                marginBottom: 8,
            }}>
            {title && (
                <h3
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 19,
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: 8,
                    }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}

function WeatherCard({ weather, isStale }) {
    const icons = {
        sun: (
            <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(255,255,255,0.65)'
                strokeWidth='1.5'
                strokeLinecap='round'>
                <circle cx='12' cy='12' r='5' />
                <line x1='12' y1='1' x2='12' y2='3' />
                <line x1='12' y1='21' x2='12' y2='23' />
                <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
                <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
                <line x1='1' y1='12' x2='3' y2='12' />
                <line x1='21' y1='12' x2='23' y2='12' />
                <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
                <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
            </svg>
        ),
        cloud: (
            <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(255,255,255,0.65)'
                strokeWidth='1.5'
                strokeLinecap='round'>
                <path d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' />
            </svg>
        ),
        rain: (
            <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(255,255,255,0.65)'
                strokeWidth='1.5'
                strokeLinecap='round'>
                <line x1='16' y1='13' x2='16' y2='21' />
                <line x1='8' y1='13' x2='8' y2='21' />
                <line x1='12' y1='15' x2='12' y2='23' />
                <path d='M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25' />
            </svg>
        ),
        storm: (
            <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(255,255,255,0.65)'
                strokeWidth='1.5'
                strokeLinecap='round'>
                <path d='M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9' />
                <polyline points='13 11 9 17 15 17 11 23' />
            </svg>
        ),
    };

    if (!weather) {
        return (
            <div
                style={{
                    background: "linear-gradient(135deg, var(--red), #A0102A)",
                    borderRadius: "var(--r-md)",
                    padding: 18,
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}>
                <div
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "white",
                        animation: "spin 0.8s linear infinite",
                    }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p
                    style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 14,
                        fontWeight: 300,
                    }}>
                    Loading weather...
                </p>
            </div>
        );
    }

    const updatedStr = weather.fetchedAt
        ? new Date(weather.fetchedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })
        : null;

    return (
        <div
            style={{
                background: "linear-gradient(135deg, var(--red), #A0102A)",
                borderRadius: "var(--r-md)",
                padding: 18,
                marginBottom: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
            <div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 2,
                    }}>
                    <p
                        style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 400,
                        }}>
                        Valletta, Malta
                    </p>
                    {isStale && (
                        <span
                            style={{
                                fontSize: 10,
                                padding: "1px 7px",
                                borderRadius: 100,
                                background: "rgba(255,255,255,0.18)",
                                color: "rgba(255,255,255,0.7)",
                            }}>
                            offline
                        </span>
                    )}
                </div>
                <p
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 52,
                        fontWeight: 400,
                        color: "white",
                        lineHeight: 1,
                    }}>
                    {weather.temp}°
                </p>
                <p
                    style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: 300,
                        marginTop: 4,
                    }}>
                    {weather.desc} · {weather.wind} km/h
                </p>
                {updatedStr && (
                    <p
                        style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.45)",
                            marginTop: 4,
                        }}>
                        Updated {updatedStr}
                    </p>
                )}
            </div>
            {icons[weather.icon] || icons.cloud}
        </div>
    );
}

function CurrencyConverter({ rates, updatedAt, isStale }) {
    const [amount, setAmount] = useState("1");
    const parsed = parseFloat(amount) || 0;

    const formatted = (val) => {
        if (val >= 1000)
            return val.toLocaleString("en", { maximumFractionDigits: 0 });
        if (val < 1) return val.toFixed(3);
        return val.toFixed(2);
    };

    const dateStr = updatedAt
        ? new Date(updatedAt).toLocaleDateString("en", {
              day: "numeric",
              month: "short",
          })
        : null;

    return (
        <InfoCard>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                }}>
                <h3
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 19,
                        fontWeight: 500,
                        color: "var(--ink)",
                    }}>
                    Currency converter
                </h3>
                {dateStr && (
                    <span
                        style={{
                            fontSize: 11,
                            color: isStale ? "var(--red)" : "var(--ink-4)",
                            fontWeight: isStale ? 500 : 300,
                        }}>
                        {isStale ? "offline cache" : `Rates: ${dateStr}`}
                    </span>
                )}
            </div>

            {/* EUR input */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--stone)",
                    borderRadius: "var(--r-sm)",
                    padding: "12px 16px",
                    marginBottom: 16,
                    border: "1px solid var(--border)",
                }}>
                <span
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 26,
                        fontWeight: 500,
                        color: "var(--red)",
                        lineHeight: 1,
                        flexShrink: 0,
                    }}>
                    €
                </span>
                <input
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min='0'
                    step='any'
                    placeholder='Enter amount'
                    aria-label='Amount in Euro'
                    style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        outline: "none",
                        fontFamily: "var(--font-display)",
                        fontSize: 28,
                        fontWeight: 500,
                        color: "var(--ink)",
                        width: 0,
                        minWidth: 0,
                    }}
                />
                <span
                    style={{
                        fontSize: 13,
                        color: "var(--ink-3)",
                        fontWeight: 400,
                        flexShrink: 0,
                    }}>
                    EUR
                </span>
            </div>

            {/* Rates grid */}
            {rates ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {CURRENCIES.map((cur, i) => {
                        const rate = rates[cur.code];
                        const converted = rate ? parsed * rate : null;
                        return (
                            <div
                                key={cur.code}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "10px 0",
                                    borderTop:
                                        i > 0
                                            ? "1px solid var(--border)"
                                            : "none",
                                }}>
                                <div>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: "var(--ink)",
                                        }}>
                                        {cur.code}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: "var(--ink-4)",
                                            fontWeight: 300,
                                        }}>
                                        {cur.name}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: 20,
                                        fontWeight: 500,
                                        color: "var(--ink)",
                                    }}>
                                    {converted !== null
                                        ? formatted(converted)
                                        : "—"}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px 0",
                        gap: 10,
                    }}>
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            border: "2px solid var(--border)",
                            borderTopColor: "var(--red)",
                            animation: "spin 0.8s linear infinite",
                        }}
                    />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <p style={{ fontSize: 14, color: "var(--ink-4)" }}>
                        Loading rates...
                    </p>
                </div>
            )}
        </InfoCard>
    );
}

export default function Practical() {
    const { largeText, toggle } = useFontSizeContext();
    const { weather, isStale: weatherStale } = useWeather();
    const { rates, updatedAt, isStale: ratesStale } = useCurrency();

    return (
        <div>
            <ScreenHeader
                title='Practical info'
                subtitle='Everything you need to know'
            />

            <div style={{ padding: "20px 20px 0" }}>
                {/* Live weather */}
                <WeatherCard weather={weather} isStale={weatherStale} />

                {/* Emergency numbers */}
                <SectionTitle>Emergency numbers</SectionTitle>
                {emergency.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            background: "var(--white)",
                            borderRadius: "var(--r-md)",
                            padding: "14px 16px",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 8,
                        }}>
                        <div
                            style={{
                                width: 42,
                                height: 42,
                                borderRadius: "var(--r-sm)",
                                background: "var(--red-light)",
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            {iconMap[item.type]}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "var(--ink)",
                                    marginBottom: 2,
                                }}>
                                {item.label}
                            </p>
                            <p
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 22,
                                    fontWeight: 500,
                                    color: "var(--red)",
                                    letterSpacing: "0.05em",
                                    lineHeight: 1,
                                }}>
                                {item.number}
                            </p>
                        </div>
                        <a
                            href={`tel:${item.number.replace(/\s/g, "")}`}
                            style={{
                                padding: "9px 18px",
                                borderRadius: 100,
                                background: "var(--red)",
                                color: "white",
                                fontSize: 13,
                                fontWeight: 500,
                                textDecoration: "none",
                                flexShrink: 0,
                                fontFamily: "var(--font-body)",
                                minHeight: 40,
                                display: "flex",
                                alignItems: "center",
                            }}>
                            Call
                        </a>
                    </div>
                ))}

                {/* Currency converter */}
                <SectionTitle>Currency converter</SectionTitle>
                <CurrencyConverter
                    rates={rates}
                    updatedAt={updatedAt}
                    isStale={ratesStale}
                />

                {/* Money */}
                <SectionTitle>Money &amp; currency</SectionTitle>
                <InfoCard title='Currency: Euro (€)'>
                    <p
                        style={{
                            fontSize: 13,
                            color: "var(--ink-2)",
                            lineHeight: 1.6,
                            fontWeight: 300,
                        }}>
                        Malta uses the Euro. ATMs are widely available in
                        Valletta, Sliema and St Julian's. Most restaurants and
                        shops accept Visa/Mastercard. Tip 10% in restaurants if
                        not included.
                    </p>
                </InfoCard>

                {/* SIM */}
                <SectionTitle>SIM &amp; internet</SectionTitle>
                <InfoCard title='Stay connected'>
                    <p
                        style={{
                            fontSize: 13,
                            color: "var(--ink-2)",
                            lineHeight: 1.6,
                            fontWeight: 300,
                        }}>
                        EU roaming applies for EU phones — no extra charge.
                        Non-EU visitors: buy a GO or Epic prepaid SIM at the
                        airport (from €10, includes 5GB data). Free Wi-Fi in
                        most cafés and at the course venue.
                    </p>
                </InfoCard>

                {/* Phrases */}
                <SectionTitle>Useful Maltese phrases</SectionTitle>
                <InfoCard>
                    <table
                        style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            {phrases.map((p, i) => (
                                <tr
                                    key={i}
                                    style={{
                                        borderTop:
                                            i > 0
                                                ? "1px solid var(--border)"
                                                : "none",
                                    }}>
                                    <td
                                        style={{
                                            padding: "9px 0",
                                            fontSize: 13,
                                            color: "var(--ink-2)",
                                        }}>
                                        {p.en}
                                    </td>
                                    <td
                                        style={{
                                            padding: "9px 0",
                                            textAlign: "right",
                                            fontFamily: "var(--font-display)",
                                            fontSize: 15,
                                            fontStyle: "italic",
                                            fontWeight: 500,
                                            color: "var(--red-dark)",
                                        }}>
                                        {p.mt}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </InfoCard>

                {/* Text size toggle */}
                <SectionTitle>Display</SectionTitle>
                <div
                    style={{
                        background: "var(--white)",
                        borderRadius: "var(--r-md)",
                        border: "1px solid var(--border)",
                        marginBottom: 8,
                        overflow: "hidden",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            padding: "16px 18px",
                        }}>
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: "var(--r-sm)",
                                background: largeText
                                    ? "var(--red-light)"
                                    : "var(--stone)",
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "background 0.2s",
                            }}>
                            <span
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: largeText
                                        ? "var(--red)"
                                        : "var(--ink-3)",
                                    lineHeight: 1,
                                    userSelect: "none",
                                    transition: "color 0.2s",
                                }}>
                                Aa
                            </span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "var(--ink)",
                                    marginBottom: 2,
                                }}>
                                Text size
                            </p>
                            <p
                                style={{
                                    fontSize: 12,
                                    color: "var(--ink-3)",
                                    fontWeight: 300,
                                }}>
                                {largeText
                                    ? "Large — easier to read"
                                    : "Normal — default size"}
                            </p>
                        </div>
                        <button
                            role='switch'
                            aria-checked={largeText}
                            aria-label='Toggle large text'
                            onClick={toggle}
                            style={{
                                width: 50,
                                height: 28,
                                borderRadius: 14,
                                background: largeText
                                    ? "var(--red)"
                                    : "var(--border)",
                                border: "none",
                                cursor: "pointer",
                                position: "relative",
                                flexShrink: 0,
                                transition: "background 0.22s",
                                padding: 0,
                            }}>
                            <span
                                style={{
                                    position: "absolute",
                                    top: 3,
                                    left: largeText ? 25 : 3,
                                    width: 22,
                                    height: 22,
                                    borderRadius: "50%",
                                    background: "white",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                                    transition:
                                        "left 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                                    display: "block",
                                }}
                            />
                        </button>
                    </div>
                    <div
                        style={{
                            padding: "10px 18px 14px",
                            borderTop: "1px solid var(--border)",
                            background: largeText
                                ? "var(--red-light)"
                                : "var(--stone)",
                            transition: "background 0.2s",
                        }}>
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 300,
                                lineHeight: 1.55,
                                color: largeText
                                    ? "var(--red-dark)"
                                    : "var(--ink-3)",
                                transition: "color 0.2s",
                            }}>
                            {largeText
                                ? "Large text is on — all content is scaled up for easier reading."
                                : "Turn on large text if you find the default size hard to read."}
                        </p>
                    </div>
                </div>

                <div style={{ height: 16 }} />
            </div>
        </div>
    );
}
