import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import transportData from "../data/transport.json";
import busMap from "/images/buses.png"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const tabs = ["Bus", "Taxi", "Ferry"];

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
                        <Zoom>
                            <img
                                alt = "Bus map"
                                src = {busMap}
                                width = "500"
                            />
                        </Zoom>
                        <div>
                            <p
                            style={{
                                fontSize: 15,
                            }}
                            >
                                Please refer to the official Tal-Linja app for more detailed information like bus routes, bus schedules and recommended routes
                            </p>
                            <br/>
                            <a
                                href={"https://www.publictransport.com.mt/tallinja-app/"}
                                target='_blank'
                                rel='noreferrer'
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: 100,
                                    background: "var(--stone)",
                                    display: "inline-block",
                                    color: "var(--ink-2)",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    border: "1px solid var(--border)",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    fontFamily: "var(--font-body)",
                                    }}>
                                Download Tal-Linja app
                            </a>
                            <br/>
                            <br/>
                            <br/>
                            <p
                            style={{
                                fontSize: 15
                            }}
                            >
                                We also recommend Moovit, a public transit guide which can give you detailed information on how to get where you need to go, bus routes and navigation included (includes ads)
                            </p>
                            <br/>
                            <a
                                href={"https://moovitapp.com/"}
                                target='_blank'
                                rel='noreferrer'
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: 100,
                                    background: "var(--stone)",
                                    display: "inline-block",
                                    color: "var(--ink-2)",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    border: "1px solid var(--border)",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    fontFamily: "var(--font-body)",
                                    }}>
                                Download Moovit
                            </a>
                        </div>
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
                                    Visit Site
                                </a>
                            </div>
                        ))}
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
                                        <a href="https://www.vallettaferryservices.com/" target='_blank' rel='noreferrer' style={{
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
                                        Visit Site
                                        </a>
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
            </div>
        </div>
    );
}
