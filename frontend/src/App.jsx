import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/home/home.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div>  {/* added pb-28 for footer space */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* add other routes */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}


export default App;
