import { useEffect } from "react";
import { useWikipedia } from "../hooks/useWikipedia";

const catColors = {
    historic: "#CF142B",
    nature: "#2D7A60",
    beaches: "#2466A8",
    village: "#8B6A52",
    default: "#CF142B",
};

export default function PlaceDetailModal({ place, onClose }) {
    const isOpen = Boolean(place);
    const { data, loading } = useWikipedia(place?.wikipediaTitle);

    // Block body scroll while open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const accentColor = catColors[place?.category] || catColors.default;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(28,25,23,0.5)",
                    zIndex: 500,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "all" : "none",
                    transition: "opacity 0.28s ease",
                }}
            />

            {/* Sheet */}
            <div
                role='dialog'
                aria-modal='true'
                aria-label={place?.name}
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: isOpen
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(100%)",
                    width: "100%",
                    maxWidth: 480,
                    background: "var(--white)",
                    borderRadius: "22px 22px 0 0",
                    zIndex: 600,
                    transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
                    maxHeight: "85dvh",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}>
                {/* Drag handle */}
                <div
                    style={{
                        width: 40,
                        height: 4,
                        borderRadius: 2,
                        background: "var(--border)",
                        margin: "12px auto 0",
                        flexShrink: 0,
                    }}
                />

                {/* Image */}
                <div
                    style={{
                        height: 200,
                        flexShrink: 0,
                        position: "relative",
                        overflow: "hidden",
                        background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "12px 16px 0",
                        borderRadius: "var(--r-md)",
                    }}>
                    {data?.imageUrl && (
                        <img
                            src={data.imageUrl}
                            alt={place?.name}
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    )}
                    {!data?.imageUrl && (
                        <span
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 28,
                                fontWeight: 400,
                                color: "rgba(255,255,255,0.9)",
                                letterSpacing: "0.03em",
                                textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                                position: "relative",
                                zIndex: 1,
                            }}>
                            {place?.name}
                        </span>
                    )}

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label='Close'
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "rgba(0,0,0,0.35)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                        }}>
                        <svg
                            width='14'
                            height='14'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='white'
                            strokeWidth='2.5'>
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                    </button>
                </div>

                {/* Scrollable content */}
                <div
                    style={{
                        overflowY: "auto",
                        flex: 1,
                        padding: "16px 20px 32px",
                    }}>
                    {/* Name + tags */}
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 26,
                            fontWeight: 500,
                            color: "var(--ink)",
                            marginBottom: 8,
                        }}>
                        {place?.name}
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginBottom: 16,
                        }}>
                        {place?.tags?.map((tag, i) => (
                            <span
                                key={i}
                                style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    padding: "4px 11px",
                                    borderRadius: 100,
                                    background:
                                        i === 0
                                            ? `${accentColor}18`
                                            : "var(--stone)",
                                    color:
                                        i === 0 ? accentColor : "var(--ink-2)",
                                    border:
                                        i === 0
                                            ? `1px solid ${accentColor}40`
                                            : "1px solid var(--border)",
                                }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description from Wikipedia */}
                    {loading && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                            }}>
                            {[90, 75, 60].map((w) => (
                                <div
                                    key={w}
                                    style={{
                                        height: 14,
                                        width: `${w}%`,
                                        background: "var(--stone)",
                                        borderRadius: 4,
                                        animation: "shimmer 1.4s ease infinite",
                                    }}
                                />
                            ))}
                            <style>{`@keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }`}</style>
                        </div>
                    )}

                    {data?.extract && !loading && (
                        <p
                            style={{
                                fontSize: 15,
                                color: "var(--ink-2)",
                                lineHeight: 1.7,
                                fontWeight: 300,
                            }}>
                            {data.extract}
                        </p>
                    )}

                    {!data?.extract && !loading && (
                        <p
                            style={{
                                fontSize: 14,
                                color: "var(--ink-4)",
                                fontStyle: "italic",
                            }}>
                            {place?.description}
                        </p>
                    )}

                    {/* Wikipedia link */}
                    {data?.pageUrl && (
                        <a
                            href={data.pageUrl}
                            target='_blank'
                            rel='noreferrer'
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                marginTop: 16,
                                fontSize: 13,
                                color: "var(--red)",
                                fontWeight: 500,
                                textDecoration: "none",
                            }}>
                            Read more on Wikipedia
                            <svg
                                width='12'
                                height='12'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='var(--red)'
                                strokeWidth='2'>
                                <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                                <polyline points='15 3 21 3 21 9' />
                                <line x1='10' y1='14' x2='21' y2='3' />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
