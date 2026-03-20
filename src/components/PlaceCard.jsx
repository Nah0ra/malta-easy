import { useWikipedia } from "../hooks/useWikipedia";

const gradients = {
    valletta: "linear-gradient(135deg, #7B2C3A, #CF142B)",
    mdina: "linear-gradient(135deg, #4A3728, #8B6A52)",
    gozo: "linear-gradient(135deg, #1A4A3A, #2D7A60)",
    marsaxlokk: "linear-gradient(135deg, #1A3A5C, #2466A8)",
    blueLagoon: "linear-gradient(135deg, #1A4A6A, #1A7AAA)",
    goldenBay: "linear-gradient(135deg, #6A4A1A, #C8841A)",
    mellieha: "linear-gradient(135deg, #1A3A5C, #2D6A9E)",
    stPetersPool: "linear-gradient(135deg, #1A4A5A, #1A8A9A)",
    dingli: "linear-gradient(135deg, #2A3A1A, #3A6A2A)",
    buskett: "linear-gradient(135deg, #1A3A1A, #2A6A2A)",
    popeyeVillage: "linear-gradient(135deg, #3A2A1A, #8A5A2A)",
    hagarQim: "linear-gradient(135deg, #4A3A2A, #9A7A4A)",
    sliema: "linear-gradient(135deg, #1A3A5A, #2A5A8A)",
    fortStAngelo: "linear-gradient(135deg, #3A1A1A, #8A2A2A)",
    default: "linear-gradient(135deg, #8B0D1C, #CF142B)",
};

export default function PlaceCard({ place, onClick }) {
    const { data } = useWikipedia(place.wikipediaTitle);
    const gradient = gradients[place.id] || gradients.default;

    return (
        <div
            className='tap-active'
            onClick={() => onClick?.(place)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick?.(place)}
            aria-label={`View details for ${place.name}`}
            style={{
                background: "var(--white)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                cursor: "pointer",
            }}>
            {/* Image — Wikipedia thumbnail with gradient fallback */}
            <div
                style={{
                    height: 160,
                    background: gradient,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                {data?.imageUrl && (
                    <img
                        src={data.imageUrl}
                        alt={place.name}
                        loading='lazy'
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                )}
                {/* Category pill overlaid on image */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 10,
                        left: 12,
                        zIndex: 2,
                    }}>
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 500,
                            padding: "3px 10px",
                            borderRadius: 100,
                            background: "rgba(0,0,0,0.45)",
                            color: "rgba(255,255,255,0.92)",
                            backdropFilter: "blur(4px)",
                            WebkitBackdropFilter: "blur(4px)",
                            letterSpacing: "0.04em",
                            textTransform: "capitalize",
                        }}>
                        {place.category}
                    </span>
                </div>
                {/* Subtle gradient scrim so text is legible */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 50%)",
                        pointerEvents: "none",
                    }}
                />
            </div>

            {/* Info */}
            <div style={{ padding: "14px 16px" }}>
                <h3
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: 4,
                    }}>
                    {place.name}
                </h3>
                <p
                    style={{
                        fontSize: 13,
                        color: "var(--ink-3)",
                        lineHeight: 1.55,
                        fontWeight: 300,
                        marginBottom: 10,
                    }}>
                    {place.description}
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}>
                    {place.tags.map((tag, i) => (
                        <span
                            key={i}
                            style={{
                                fontSize: 11,
                                fontWeight: 500,
                                padding: "3px 10px",
                                borderRadius: 100,
                                background:
                                    i === 0
                                        ? "var(--red-light)"
                                        : "var(--stone)",
                                color:
                                    i === 0
                                        ? "var(--red-dark)"
                                        : "var(--ink-2)",
                            }}>
                            {tag}
                        </span>
                    ))}
                    <span
                        style={{
                            marginLeft: "auto",
                            fontSize: 12,
                            color: "var(--ink-4)",
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                        }}>
                        View details
                        <svg
                            width='12'
                            height='12'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='var(--ink-4)'
                            strokeWidth='2'>
                            <polyline points='9 18 15 12 9 6' />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}
