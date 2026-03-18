const gradients = {
    valletta: "linear-gradient(135deg, #7B2C3A, #CF142B)",
    mdina: "linear-gradient(135deg, #4A3728, #8B6A52)",
    gozo: "linear-gradient(135deg, #1A4A3A, #2D7A60)",
    marsaxlokk: "linear-gradient(135deg, #1A3A5C, #2466A8)",
    default: "linear-gradient(135deg, #8B0D1C, #CF142B)",
};

export default function PlaceCard({ place }) {
    const gradient = gradients[place.id] || gradients.default;

    return (
        <div
            className='tap-active'
            style={{
                background: "var(--white)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                cursor: "pointer",
            }}>
            {/* Image area */}
            <div
                style={{
                    height: 140,
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}>
                <span
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 24,
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.92)",
                        letterSpacing: "0.03em",
                        textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    }}>
                    {place.name}
                </span>
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
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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
                </div>
            </div>
        </div>
    );
}
