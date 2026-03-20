import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import places from "../data/places.json";

const MALTA_CENTER = [35.9375, 14.3754];
const MALTA_ZOOM = 11;

const VENUE = {
    lat: 35.8988,
    lng: 14.5128,
    name: "Course Venue",
    address: "142 St. Christopher\u2019s Street, Valletta",
};

const pinColors = {
    historic: "#CF142B",
    nature: "#2D7A60",
    beaches: "#2466A8",
    village: "#8B6A52",
    default: "#CF142B",
};

function createColorPin(color) {
    return L.divIcon({
        className: "",
        html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.22);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 26],
        popupAnchor: [0, -30],
    });
}

const venuePin = L.divIcon({
    className: "",
    html: `<div style="width:36px;height:36px;border-radius:50%;background:#1C1917;border:3px solid #FAC775;box-shadow:0 3px 12px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAC775" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
});

const filters = ["All", "Historic", "Nature", "Beaches", "Villages"];

export default function MapPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selected, setSelected] = useState(null);

    const filtered =
        activeFilter === "All"
            ? places
            : places.filter(
                  (p) =>
                      p.category ===
                      activeFilter.toLowerCase().replace("villages", "village"),
              );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100dvh - var(--nav-h))",
            }}>
            <div
                style={{
                    padding: "12px 20px",
                    background: "var(--white)",
                    borderBottom: "1px solid var(--border)",
                    flexShrink: 0,
                }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "var(--stone)",
                        borderRadius: "var(--r-sm)",
                        padding: "10px 14px",
                    }}>
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='var(--ink-3)'
                        strokeWidth='2'>
                        <circle cx='11' cy='11' r='8' />
                        <line x1='21' y1='21' x2='16.65' y2='16.65' />
                    </svg>
                    <span
                        style={{
                            fontSize: 14,
                            color: "var(--ink-4)",
                            fontWeight: 300,
                        }}>
                        Search Malta...
                    </span>
                </div>
            </div>

            <div
                className='hide-scrollbar'
                style={{
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    padding: "10px 16px",
                    background: "var(--white)",
                    borderBottom: "1px solid var(--border)",
                    flexShrink: 0,
                }}>
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        style={{
                            flexShrink: 0,
                            padding: "5px 12px",
                            borderRadius: 100,
                            fontSize: 12,
                            fontWeight: activeFilter === f ? 500 : 400,
                            fontFamily: "var(--font-body)",
                            border: "1px solid",
                            borderColor:
                                activeFilter === f
                                    ? "var(--red)"
                                    : "var(--border)",
                            background:
                                activeFilter === f
                                    ? "var(--red)"
                                    : "transparent",
                            color:
                                activeFilter === f ? "white" : "var(--ink-2)",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}>
                        {f}
                    </button>
                ))}
            </div>

            <div
                style={{
                    padding: "8px 16px",
                    background: "var(--white)",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                }}>
                <div
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#1C1917",
                        border: "2px solid #FAC775",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}>
                    <svg
                        width='9'
                        height='9'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='#FAC775'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                    </svg>
                </div>
                <span
                    style={{
                        fontSize: 12,
                        color: "var(--ink-2)",
                        fontWeight: 400,
                    }}>
                    Your course venue — 142 St. Christopher&apos;s St, Valletta
                </span>
            </div>

            <div style={{ flex: 1, position: "relative" }}>
                <MapContainer
                    center={MALTA_CENTER}
                    zoom={MALTA_ZOOM}
                    style={{ width: "100%", height: "100%" }}
                    zoomControl
                    scrollWheelZoom={false}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution=''
                    />

                    <Marker
                        position={[VENUE.lat, VENUE.lng]}
                        icon={venuePin}
                        zIndexOffset={1000}
                        eventHandlers={{
                            click: () =>
                                setSelected({
                                    id: "venue",
                                    name: VENUE.name,
                                    tags: [VENUE.address],
                                    category: "venue",
                                }),
                        }}>
                        <Popup>
                            <strong
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 13,
                                }}>
                                {VENUE.name}
                            </strong>
                            <br />
                            <span
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 11,
                                    color: "#78716C",
                                }}>
                                {VENUE.address}
                            </span>
                        </Popup>
                    </Marker>

                    {filtered.map((place) => (
                        <Marker
                            key={place.id}
                            position={[place.lat, place.lng]}
                            icon={createColorPin(
                                pinColors[place.category] || pinColors.default,
                            )}
                            eventHandlers={{ click: () => setSelected(place) }}>
                            <Popup>
                                <strong
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: 13,
                                    }}>
                                    {place.name}
                                </strong>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {selected && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: 16,
                            left: 16,
                            right: 16,
                            background: "var(--white)",
                            borderRadius: "var(--r-md)",
                            padding: "14px 16px",
                            boxShadow: "0 8px 32px rgba(28,25,23,0.14)",
                            border: "1px solid var(--border)",
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                            zIndex: 1000,
                        }}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "var(--r-sm)",
                                background:
                                    selected.category === "venue"
                                        ? "#1C1917"
                                        : pinColors[selected.category] ||
                                          pinColors.default,
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            {selected.category === "venue" ? (
                                <svg
                                    width='18'
                                    height='18'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='#FAC775'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'>
                                    <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                                    <polyline points='9 22 9 12 15 12 15 22' />
                                </svg>
                            ) : (
                                <svg
                                    width='18'
                                    height='18'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='white'
                                    strokeWidth='2'
                                    strokeLinecap='round'>
                                    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                                    <circle cx='12' cy='10' r='3' />
                                </svg>
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "var(--ink)",
                                    marginBottom: 2,
                                }}>
                                {selected.name}
                            </p>
                            <p
                                style={{
                                    fontSize: 12,
                                    color: "var(--ink-3)",
                                    fontWeight: 300,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}>
                                {selected.tags.join(" · ")}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelected(null)}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                background: "var(--stone)",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                            <svg
                                width='14'
                                height='14'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='var(--ink-3)'
                                strokeWidth='2'>
                                <line x1='18' y1='6' x2='6' y2='18' />
                                <line x1='6' y1='6' x2='18' y2='18' />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
