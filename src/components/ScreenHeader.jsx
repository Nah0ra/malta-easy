export default function ScreenHeader({ title, subtitle }) {
    return (
        <div
            style={{
                padding: "16px 24px 12px",
                background: "var(--white)",
                borderBottom: "1px solid var(--border)",
            }}>
            <h1
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    fontWeight: 500,
                    color: "var(--ink)",
                    lineHeight: 1.15,
                }}>
                {title}
            </h1>
            {subtitle && (
                <p
                    style={{
                        fontSize: 14,
                        color: "var(--ink-3)",
                        marginTop: 3,
                        fontWeight: 300,
                    }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
