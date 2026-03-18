import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Transport from "./pages/Transport";
import MapPage from "./pages/MapPage";
import Practical from "./pages/Practical";

export default function App() {
    return (
        <BrowserRouter>
            <div className='flex flex-col min-h-screen max-w-lg mx-auto'>
                <main className='flex-1 overflow-y-auto pb-20'>
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
