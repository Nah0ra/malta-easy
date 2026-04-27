import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import transportData from "../data/transport.json";

const tabs = ["Bus", "Taxi", "Ferry", "Walking"];

function InfoCard({ children, style }) {
    return (
        <div
            style={{
                background: "var(--red-light)",
                borderRadius: "var(--r-md)",
                padding: 16,
                border: "1px solid var(--red-mid)",
                ...style,
            }}>
            {children}
        </div>
    );
}

function RouteCard({ number, route, description, price, frequency, color }) {
    return (
        <div
            className='tap-active'
            style={{
                background: "var(--white)",
                borderRadius: "var(--r-md)",
                padding: 16,
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
            }}>
            <div
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--r-sm)",
                    background: color || "var(--red)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 500,
                    flexShrink: 0,
                    letterSpacing: "0.03em",
                }}>
                {number}
            </div>
            <div style={{ flex: 1 }}>
                <p
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: 2,
                    }}>
                    {route}
                </p>
                <p
                    style={{
                        fontSize: 12,
                        color: "var(--ink-3)",
                        fontWeight: 300,
                    }}>
                    {description}
                </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p
                    style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--ink)",
                    }}>
                    {price}
                </p>
                <p
                    style={{
                        fontSize: 11,
                        color: "var(--ink-3)",
                        fontWeight: 300,
                    }}>
                    {frequency}
                </p>
            </div>
        </div>
    );
}

export default function Transport() {
    const [activeTab, setActiveTab] = useState("Bus");
    const { buses, taxis, ferries, walking } = transportData;

    return (
        <div>
            <ScreenHeader
                title='Getting around'
                subtitle='Buses, taxis & ferries'
            />

            {/* Tabs */}
            <div
                style={{
                    display: "flex",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--white)",
                    padding: "0 20px",
                }}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            padding: "14px 0",
                            fontSize: 13,
                            fontWeight: activeTab === tab ? 500 : 400,
                            fontFamily: "var(--font-body)",
                            color:
                                activeTab === tab
                                    ? "var(--red)"
                                    : "var(--ink-3)",
                            background: "none",
                            border: "none",
                            borderBottom: "2px solid",
                            borderBottomColor:
                                activeTab === tab
                                    ? "var(--red)"
                                    : "transparent",
                            cursor: "pointer",
                            transition: "all 0.18s",
                        }}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div
                style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                }}>
                {/* BUS */}
                {activeTab === "Bus" && (
                    <>

                    </>
                )}

                {/* TAXI */}
                {activeTab === "Taxi" && (
                    <>
                        {taxis.map((taxi) => (
                            <div
                                key={taxi.id}
                                style={{
                                    background: "var(--white)",
                                    borderRadius: "var(--r-md)",
                                    padding: 16,
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                }}>
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "var(--r-sm)",
                                        background: taxi.color,
                                        color: taxi.textColor,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        flexShrink: 0,
                                    }}>
                                    {taxi.name.slice(0, 4)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: "var(--ink)",
                                        }}>
                                        {taxi.name}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: "var(--ink-3)",
                                            fontWeight: 300,
                                        }}>
                                        {taxi.description}
                                    </p>
                                </div>
                                <a
                                    href={taxi.appUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: 100,
                                        background: "var(--stone)",
                                        color: "var(--ink-2)",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        border: "1px solid var(--border)",
                                        textDecoration: "none",
                                        whiteSpace: "nowrap",
                                        fontFamily: "var(--font-body)",
                                    }}>
                                    Open app
                                </a>
                            </div>
                        ))}
                        <InfoCard>
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "var(--red-dark)",
                                    marginBottom: 4,
                                }}>
                                Rough fare guide
                            </p>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--ink-2)",
                                    lineHeight: 1.55,
                                    fontWeight: 300,
                                }}>
                                Airport → Valletta: €15–20 · Airport → St
                                Julian's: €18–25 · Valletta → Mdina: €12–16.
                                Fares increase after 11 pm.
                            </p>
                        </InfoCard>
                    </>
                )}

                {/* FERRY */}
                {activeTab === "Ferry" && (
                    <>
                        {ferries.map((ferry, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "var(--white)",
                                    borderRadius: "var(--r-md)",
                                    padding: 16,
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 14,
                                    }}>
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: "var(--r-sm)",
                                            background: ferry.color,
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 12,
                                            fontWeight: 500,
                                            flexShrink: 0,
                                        }}>
                                        Ferry
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                color: "var(--ink)",
                                                marginBottom: 2,
                                            }}>
                                            {ferry.name}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 12,
                                                color: "var(--ink-3)",
                                                fontWeight: 300,
                                            }}>
                                            {ferry.route}
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "right",
                                            flexShrink: 0,
                                        }}>
                                        <p
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 500,
                                                color: "var(--ink)",
                                            }}>
                                            {ferry.price}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 11,
                                                color: "var(--ink-3)",
                                                fontWeight: 300,
                                            }}>
                                            {ferry.frequency}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    style={{
                                        fontSize: 12,
                                        color: "var(--ink-3)",
                                        fontWeight: 300,
                                        lineHeight: 1.55,
                                        paddingTop: 10,
                                        borderTop: "1px solid var(--border)",
                                    }}>
                                    {ferry.note}
                                </p>
                            </div>
                        ))}
                    </>
                )}

                {/* WALKING */}
                {activeTab === "Walking" && (
                    <>
                        <InfoCard>
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "var(--red-dark)",
                                    marginBottom: 4,
                                }}>
                                Valletta is very walkable
                            </p>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--ink-2)",
                                    lineHeight: 1.55,
                                    fontWeight: 300,
                                }}>
                                {walking.intro}
                            </p>
                        </InfoCard>
                        {walking.routes.map((route, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "var(--white)",
                                    borderRadius: "var(--r-md)",
                                    padding: 16,
                                    border: "1px solid var(--border)",
                                }}>
                                <p
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: "var(--ink)",
                                        marginBottom: 6,
                                    }}>
                                    {route.name}
                                </p>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "var(--ink-3)",
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}>
                                    {route.description}
                                </p>
                            </div>
                        ))}
                        <InfoCard
                            style={{
                                background: "var(--stone)",
                                borderColor: "var(--border)",
                            }}>
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "var(--ink)",
                                    marginBottom: 4,
                                }}>
                                Summer heat warning
                            </p>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--ink-2)",
                                    lineHeight: 1.55,
                                    fontWeight: 300,
                                }}>
                                {walking.warning}
                            </p>
                        </InfoCard>
                    </>
                )}
            </div>
        </div>
    );
}
