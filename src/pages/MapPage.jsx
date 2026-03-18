import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import places from "../data/places.json";

const MALTA_CENTER = [35.9375, 14.3754];
const MALTA_ZOOM = 11;

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
        html: `
      <div style="
        width:28px; height:28px; border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${color};
        border:2.5px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
      "></div>
    `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
    });
}

const filters = ["All", "Historic", "Nature", "Beaches", "Villages"];

export default function MapPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selected, setSelected] = useState(places[0]);

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
            {/* Search bar */}
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

            {/* Filter chips */}
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

            {/* Map */}
            <div style={{ flex: 1, position: "relative" }}>
                <MapContainer
                    center={MALTA_CENTER}
                    zoom={MALTA_ZOOM}
                    style={{ width: "100%", height: "100%" }}
                    zoomControl={true}
                    scrollWheelZoom={false}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution=''
                    />
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

                {/* Selected place card */}
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
                                    pinColors[selected.category] ||
                                    pinColors.default,
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
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
