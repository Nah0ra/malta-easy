import { useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather";

function WeatherIcon({ icon, size = 18 }) {
    if (icon === "sun")
        return (
            <svg
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(255,255,255,0.8)'
                strokeWidth='1.8'
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
        );
    if (icon === "rain")
        return (
            <svg
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(255,255,255,0.8)'
                strokeWidth='1.8'
                strokeLinecap='round'>
                <line x1='16' y1='13' x2='16' y2='21' />
                <line x1='8' y1='13' x2='8' y2='21' />
                <line x1='12' y1='15' x2='12' y2='23' />
                <path d='M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25' />
            </svg>
        );
    if (icon === "storm")
        return (
            <svg
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(255,255,255,0.8)'
                strokeWidth='1.8'
                strokeLinecap='round'>
                <path d='M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9' />
                <polyline points='13 11 9 17 15 17 11 23' />
            </svg>
        );
    // cloud (default)
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='rgba(255,255,255,0.8)'
            strokeWidth='1.8'
            strokeLinecap='round'>
            <path d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' />
        </svg>
    );
}

function QuickTile({ icon, title, subtitle, onClick }) {
    return (
        <div
            className='tap-active'
            onClick={onClick}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick?.()}
            style={{
                background: "var(--white)",
                borderRadius: "var(--r-md)",
                padding: 16,
                cursor: "pointer",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minHeight: 100,
            }}>
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--r-sm)",
                    background: "var(--red-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <span
                    style={{
                        width: 20,
                        height: 20,
                        display: "block",
                        stroke: "var(--red)",
                    }}>
                    {icon}
                </span>
            </div>
            <div>
                <p
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--ink)",
                    }}>
                    {title}
                </p>
                <p
                    style={{
                        fontSize: 12,
                        color: "var(--ink-3)",
                        fontWeight: 300,
                        marginTop: 1,
                    }}>
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default function Home() {
    const navigate = useNavigate();
    const { weather, isStale } = useWeather();

    return (
        <div>
            {/* Hero */}
            <div
                style={{
                    background: "var(--red)",
                    position: "relative",
                    overflow: "hidden",
                    padding: "36px 24px 0",
                }}>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.09,
                        backgroundImage:
                            "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
                        backgroundSize: "14px 14px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 16,
                        right: 20,
                        opacity: 0.14,
                        width: 48,
                        height: 48,
                    }}>
                    <div
                        style={{
                            position: "absolute",
                            width: 6,
                            height: 48,
                            left: 21,
                            top: 0,
                            background: "white",
                            borderRadius: 2,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            width: 48,
                            height: 6,
                            top: 21,
                            left: 0,
                            background: "white",
                            borderRadius: 2,
                        }}
                    />
                </div>

                <h1
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 38,
                        fontWeight: 500,
                        color: "white",
                        lineHeight: 1.05,
                        letterSpacing: "-0.01em",
                        position: "relative",
                    }}>
                    Welcome
                    <br />
                    to Malta
                </h1>
                <p
                    style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.72)",
                        marginTop: 4,
                        fontWeight: 300,
                        position: "relative",
                        paddingBottom: 16,
                    }}>
                    Your guide to the Maltese Islands
                </p>

                {/* Live weather strip inside hero */}
                {weather && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: "var(--r-sm)",
                            padding: "10px 14px",
                            marginBottom: 0,
                            position: "relative",
                        }}>
                        <WeatherIcon icon={weather.icon} size={22} />
                        <div>
                            <p
                                style={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    color: "white",
                                    lineHeight: 1,
                                }}>
                                {weather.temp}°C
                            </p>
                            <p
                                style={{
                                    fontSize: 11,
                                    color: "rgba(255,255,255,0.65)",
                                    fontWeight: 300,
                                    marginTop: 1,
                                }}>
                                {weather.desc} · {weather.wind} km/h
                                {isStale && " · last saved"}
                            </p>
                        </div>
                        <p
                            style={{
                                marginLeft: "auto",
                                fontSize: 11,
                                color: "rgba(255,255,255,0.5)",
                                fontWeight: 300,
                            }}>
                            Valletta
                        </p>
                    </div>
                )}

                {/* White wave cutoff */}
                <div
                    style={{
                        height: 16,
                        background: "var(--cream)",
                        marginTop: 16,
                        marginLeft: -24,
                        marginRight: -24,
                    }}
                />
            </div>

            {/* Body */}
            <div style={{ padding: "4px 20px 0" }}>
                {/* Emergency strip */}
                <div
                    className='tap-active'
                    onClick={() => navigate("/practical")}
                    role='button'
                    tabIndex={0}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "var(--red)",
                        borderRadius: "var(--r-md)",
                        padding: "14px 18px",
                        marginBottom: 22,
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(207,20,43,0.28)",
                    }}>
                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}>
                        <svg
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='white'
                            strokeWidth='2.2'
                            strokeLinecap='round'>
                            <path d='M12 2L2 7v10c0 5 10 5 10 5s10 0 10-5V7L12 2z' />
                            <line x1='12' y1='8' x2='12' y2='13' />
                            <circle cx='12' cy='16' r='0.5' fill='white' />
                        </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                        <p
                            style={{
                                fontSize: 15,
                                fontWeight: 500,
                                color: "white",
                            }}>
                            Emergency contacts
                        </p>
                        <p
                            style={{
                                fontSize: 12,
                                color: "rgba(255,255,255,0.72)",
                                fontWeight: 300,
                            }}>
                            112 · Hospital · Pharmacy
                        </p>
                    </div>
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='rgba(255,255,255,0.7)'
                        strokeWidth='2'>
                        <polyline points='9 18 15 12 9 6' />
                    </svg>
                </div>

                {/* Quick tiles */}
                <p
                    style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--ink-3)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                    }}>
                    Explore Malta
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                        marginBottom: 24,
                    }}>
                    <QuickTile
                        onClick={() => navigate("/places")}
                        title='Places'
                        subtitle='Top sights & hidden gems'
                        icon={
                            <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='inherit'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'>
                                <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                                <circle cx='12' cy='10' r='3' />
                            </svg>
                        }
                    />
                    <QuickTile
                        onClick={() => navigate("/transport")}
                        title='Transport'
                        subtitle='Buses, taxis & ferries'
                        icon={
                            <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='inherit'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'>
                                <rect
                                    x='1'
                                    y='3'
                                    width='15'
                                    height='13'
                                    rx='2'
                                />
                                <polygon points='16 8 20 8 23 11 23 16 16 16 16 8' />
                                <circle cx='5.5' cy='18.5' r='2.5' />
                                <circle cx='18.5' cy='18.5' r='2.5' />
                            </svg>
                        }
                    />
                    <QuickTile
                        onClick={() => navigate("/map")}
                        title='Map'
                        subtitle='Explore the islands'
                        icon={
                            <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='inherit'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'>
                                <polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' />
                                <line x1='8' y1='2' x2='8' y2='18' />
                                <line x1='16' y1='6' x2='16' y2='22' />
                            </svg>
                        }
                    />
                    <QuickTile
                        onClick={() => navigate("/practical")}
                        title='Practical'
                        subtitle='Currency, SIM & info'
                        icon={
                            <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='inherit'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'>
                                <circle cx='12' cy='12' r='10' />
                                <line x1='12' y1='8' x2='12' y2='12' />
                                <line x1='12' y1='16' x2='12.01' y2='16' />
                            </svg>
                        }
                    />
                </div>

                {/* Tip */}
                <p
                    style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--ink-3)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                    }}>
                    Today's tip
                </p>
                <div
                    style={{
                        background: "var(--white)",
                        borderRadius: "var(--r-md)",
                        padding: "16px 18px",
                        border: "1px solid var(--border)",
                        marginBottom: 24,
                    }}>
                    <p
                        style={{
                            fontSize: 10,
                            fontWeight: 500,
                            color: "var(--red)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 6,
                        }}>
                        Local insight
                    </p>
                    <h3
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 19,
                            fontWeight: 500,
                            color: "var(--ink)",
                            marginBottom: 6,
                        }}>
                        Take the bus — it's scenic
                    </h3>
                    <p
                        style={{
                            fontSize: 13,
                            color: "var(--ink-3)",
                            lineHeight: 1.6,
                            fontWeight: 300,
                        }}>
                        Buy a Tallinja card at the airport kiosk (€2) and top
                        up. Bus fare drops from €2.00 to €0.75 per journey. The
                        X1 and X2 go directly to Valletta and St Julian's.
                    </p>
                </div>
            </div>
        </div>
    );
}
