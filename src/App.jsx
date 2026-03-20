import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import OfflineBanner from "./components/OfflineBanner";
import Onboarding from "./components/Onboarding";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Transport from "./pages/Transport";
import MapPage from "./pages/MapPage";
import Practical from "./pages/Practical";

export default function App() {
    return (
        <BrowserRouter>
            <OfflineBanner />
            <Onboarding />

            <div
                style={{
                    maxWidth: 480,
                    margin: "0 auto",
                    minHeight: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--cream)",
                    position: "relative",
                    overflow: "hidden",
                }}>
                <main
                    style={{
                        flex: 1,
                        overflowY: "auto",
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
                <BottomNav />
            </div>
        </BrowserRouter>
    );
}
