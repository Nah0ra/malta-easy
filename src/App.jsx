import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontSizeProvider, FontSizeContext } from "./context/FontSizeContext";
import OfflineBanner from "./components/OfflineBanner";
import OnboardingScreen from "./components/OnboardingScreen";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Transport from "./pages/Transport";
import MapPage from "./pages/MapPage";
import Practical from "./pages/Practical";

function AppShell() {
    const { largeText } = useContext(FontSizeContext);
    const scale = largeText ? 1.2 : 1;

    return (
        /*
         * Outer wrapper: full-viewport, clips overflow.
         * OfflineBanner + OnboardingScreen are position:fixed and sit
         * OUTSIDE the scale wrapper so they are never distorted.
         */
        <div
            style={{
                maxWidth: 480,
                margin: "0 auto",
                height: "100dvh",
                position: "relative",
                overflow: "hidden",
                background: "var(--cream)",
            }}>
            <OfflineBanner />
            <OnboardingScreen />

            {/*
             * Scale wrapper — uses scale3d (GPU-accelerated, iOS-safe).
             * Width and height are divided by scale so the visual result
             * fills the parent exactly after the transform is applied.
             * This avoids the iOS Safari bug where `zoom` on a scrollable
             * element doesn't work reliably.
             */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${100 / scale}%`,
                    height: `${100 / scale}dvh`,
                    transformOrigin: "top left",
                    transform: `scale3d(${scale}, ${scale}, 1)`,
                    display: "flex",
                    flexDirection: "column",
                }}>
                <main
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                        WebkitOverflowScrolling: "touch",
                        paddingBottom: "var(--nav-h)",
                    }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/places' element={<Places />} />
                        <Route path='/transport' element={<Transport />} />
                        <Route path='/map' element={<MapPage />} />
                        <Route path='/practical' element={<Practical />} />
                    </Routes>
                </main>

                {/* BottomNav sits in the flex flow — NOT position:fixed,
            which would break inside a transformed ancestor on iOS. */}
                <BottomNav />
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <FontSizeProvider>
                <AppShell />
            </FontSizeProvider>
        </BrowserRouter>
    );
}
