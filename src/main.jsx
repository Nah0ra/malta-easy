import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./index.css";
import App from "./App.jsx";

// Apply stored font size preference before first render
// so the page never flashes at the wrong size
const storedSize = localStorage.getItem("malta_app_fontsize");
if (storedSize === "large") {
    document.documentElement.style.fontSize = "20px";
}

// Fix Vite + Leaflet marker icon bug
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
