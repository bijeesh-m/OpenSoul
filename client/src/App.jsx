import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import LandingPage from "./pages/LandingPage";
import AdminRoutes from "./routes/AdminRoutes";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/*" element={<UserRoutes />} />
                    <Route path="/admin/*" element={<AdminRoutes />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </>
    );
}

export default App;
