import { useState, useEffect } from "react";
import ScreenHeader from "../components/ScreenHeader";
import emergency from "../data/emergency.json";

const FONT_KEY = "malta_app_fontsize";

const phrases = [
    { en: "Hello", mt: "Bong\u0121u" },
    { en: "Thank you", mt: "Grazzi" },
    { en: "Please", mt: "Jekk jo\u0121\u0121bok" },
    { en: "Where is...?", mt: "Fejn hu...?" },
    { en: "How much?", mt: "Kemm jiswu?" },
    { en: "Excuse me", mt: "Sku\u017cani" },
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

export default function Practical() {
    const [largText, setLargeText] = useState(() => {
        return localStorage.getItem(FONT_KEY) === "large";
    });

    useEffect(() => {
        applyFontSize(largText);
    }, [largText]);

    function applyFontSize(large) {
        document.documentElement.style.fontSize = large ? "20px" : "16px";
        localStorage.setItem(FONT_KEY, large ? "large" : "normal");
    }

    function toggleFontSize() {
        setLargeText((prev) => {
            const next = !prev;
            applyFontSize(next);
            return next;
        });
    }

    return (
        <div>
            <ScreenHeader
                title='Practical info'
                subtitle='Everything you need to know'
            />

            <div style={{ padding: "20px 20px 0" }}>
                {/* Weather card */}
                <div
                    style={{
                        background:
                            "linear-gradient(135deg, var(--red), #A0102A)",
                        borderRadius: "var(--r-md)",
                        padding: 18,
                        marginBottom: 20,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <div>
                        <p
                            style={{
                                fontSize: 13,
                                color: "rgba(255,255,255,0.7)",
                                fontWeight: 400,
                                marginBottom: 2,
                            }}>
                            Valletta, Malta
                        </p>
                        <p
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 52,
                                fontWeight: 400,
                                color: "white",
                                lineHeight: 1,
                            }}>
                            28°
                        </p>
                        <p
                            style={{
                                fontSize: 13,
                                color: "rgba(255,255,255,0.8)",
                                fontWeight: 300,
                                marginTop: 4,
                            }}>
                            Sunny · Light breeze
                        </p>
                    </div>
                    <svg
                        width='52'
                        height='52'
                        viewBox='0 0 48 48'
                        fill='none'
                        stroke='rgba(255,255,255,0.65)'
                        strokeWidth='1.5'
                        strokeLinecap='round'>
                        <circle cx='24' cy='24' r='10' />
                        <line x1='24' y1='4' x2='24' y2='10' />
                        <line x1='24' y1='38' x2='24' y2='44' />
                        <line x1='4' y1='24' x2='10' y2='24' />
                        <line x1='38' y1='24' x2='44' y2='24' />
                        <line x1='8.7' y1='8.7' x2='13' y2='13' />
                        <line x1='35' y1='35' x2='39.3' y2='39.3' />
                        <line x1='39.3' y1='8.7' x2='35' y2='13' />
                        <line x1='13' y1='35' x2='8.7' y2='39.3' />
                    </svg>
                </div>

                {/* ── Text size toggle ── */}
                <SectionTitle>Display</SectionTitle>
                <div
                    style={{
                        background: "var(--white)",
                        borderRadius: "var(--r-md)",
                        padding: "14px 16px",
                        border: "1px solid var(--border)",
                        marginBottom: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                    }}>
                    <div style={{ flex: 1 }}>
                        <p
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: "var(--ink)",
                                marginBottom: 3,
                            }}>
                            Text size
                        </p>
                        <p
                            style={{
                                fontSize: 12,
                                color: "var(--ink-3)",
                                fontWeight: 300,
                                lineHeight: 1.5,
                            }}>
                            {largText
                                ? "Large text is on — easier to read"
                                : "Switch to larger text if needed"}
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0,
                            border: "1px solid var(--border)",
                            borderRadius: "var(--r-sm)",
                            overflow: "hidden",
                            flexShrink: 0,
                        }}>
                        <button
                            onClick={() => {
                                if (largText) toggleFontSize();
                            }}
                            style={{
                                padding: "9px 16px",
                                fontSize: 15,
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                                background: !largText
                                    ? "var(--red)"
                                    : "transparent",
                                color: !largText ? "white" : "var(--ink-3)",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.18s",
                                lineHeight: 1,
                            }}>
                            A
                        </button>
                        <div
                            style={{
                                width: 1,
                                alignSelf: "stretch",
                                background: "var(--border)",
                            }}
                        />
                        <button
                            onClick={() => {
                                if (!largText) toggleFontSize();
                            }}
                            style={{
                                padding: "9px 16px",
                                fontSize: 20,
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                                background: largText
                                    ? "var(--red)"
                                    : "transparent",
                                color: largText ? "white" : "var(--ink-3)",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.18s",
                                lineHeight: 1,
                            }}>
                            A
                        </button>
                    </div>
                </div>

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
                            }}>
                            Call
                        </a>
                    </div>
                ))}

                {/* Money */}
                <SectionTitle>Money &amp; currency</SectionTitle>
                <InfoCard title='Currency: Euro (\u20ac)'>
                    <p
                        style={{
                            fontSize: 13,
                            color: "var(--ink-2)",
                            lineHeight: 1.6,
                            fontWeight: 300,
                        }}>
                        Malta uses the Euro. ATMs are widely available in
                        Valletta, Sliema and St Julian&apos;s. Most restaurants
                        and shops accept Visa/Mastercard. Tip 10% in restaurants
                        if not included.
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
                        most cafés and the course venue.
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

                <div style={{ height: 16 }} />
            </div>
        </div>
    );
}
