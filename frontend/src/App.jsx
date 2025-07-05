import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>

          {/* add other routes */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;