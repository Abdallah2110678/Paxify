import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/home/home.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import BookSession from "./pages/book/BookSession.jsx";
import FindTherapists from "./pages/therapists/FindTherapists.jsx";
import Games from "./pages/games/Games.jsx";
import About from "./pages/about/About.jsx";
import Settings from "./pages/settings/Settings.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div className="pt-20 pb-16 min-h-screen bg-gray-50">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book" element={<BookSession />} />
                    <Route path="/therapists" element={<FindTherapists />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
