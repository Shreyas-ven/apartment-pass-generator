import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ApartmentRegister from "./pages/ApartmentRegister";
import ApartmentLogin from "./pages/ApartmentLogin";
import VisitorLogin from "./pages/VisitorLogin";
import ApartmentPass from "./pages/ApartmentPass";
import VisitorPassStatus from "./pages/VisitorPassStatus";
import ApartmentDashboard from "./pages/ApartmentDashboard";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartment/register" element={<ApartmentRegister />} />
        <Route path="/apartment/login" element={<ApartmentLogin />} />
        <Route path="/visitor/login" element={<VisitorLogin />} />
        <Route path="/apartment/pass" element={<ApartmentPass />} />
        <Route path="/visitor/pass" element={<VisitorPassStatus />} />
        <Route path="/dashboard/:id" element={<ApartmentDashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
