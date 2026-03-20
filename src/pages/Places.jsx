import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import PlaceCard from "../components/PlaceCard";
import PlaceDetailModal from "../components/PlaceDetailModal";
import places from "../data/places.json";

const filters = [
    { id: "all", label: "All" },
    { id: "historic", label: "Historic" },
    { id: "nature", label: "Nature" },
    { id: "beaches", label: "Beaches" },
    { id: "village", label: "Villages" },
];

export default function Places() {
    const [active, setActive] = useState("all");
    const [selected, setSelected] = useState(null);

    const filtered =
        active === "all" ? places : places.filter((p) => p.category === active);

    return (
        <div>
            <ScreenHeader
                title='Places to visit'
                subtitle='Curated for your stay'
            />

            {/* Filter chips */}
            <div
                className='hide-scrollbar'
                style={{
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    padding: "14px 20px",
                    background: "var(--white)",
                    borderBottom: "1px solid var(--border)",
                }}>
                {filters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setActive(f.id)}
                        style={{
                            flexShrink: 0,
                            padding: "7px 16px",
                            borderRadius: 100,
                            fontSize: 13,
                            fontWeight: active === f.id ? 500 : 400,
                            fontFamily: "var(--font-body)",
                            border: "1px solid",
                            borderColor:
                                active === f.id
                                    ? "var(--red)"
                                    : "var(--border)",
                            background:
                                active === f.id ? "var(--red)" : "transparent",
                            color: active === f.id ? "white" : "var(--ink-2)",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            whiteSpace: "nowrap",
                            minHeight: 40,
                        }}>
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Card list */}
            <div
                style={{
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                }}>
                {filtered.length > 0 ? (
                    filtered.map((place) => (
                        <PlaceCard
                            key={place.id}
                            place={place}
                            onClick={setSelected}
                        />
                    ))
                ) : (
                    <p
                        style={{
                            fontSize: 14,
                            color: "var(--ink-4)",
                            textAlign: "center",
                            padding: "32px 0",
                        }}>
                        No places in this category yet.
                    </p>
                )}
            </div>

            {/* Detail modal — rendered at the bottom so it overlays everything */}
            <PlaceDetailModal
                place={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    );
}
