import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";



function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>

          {/* add other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;