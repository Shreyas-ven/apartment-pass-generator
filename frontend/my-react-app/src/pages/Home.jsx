import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-background"></div>
      <div className="home-overlay"></div>

      <header className="home-header">
        <div className="header-title">
          Apartment Visitor System
        </div>

        <div className="header-menu">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/contact")}>Contact</span>
          <span onClick={() => navigate("/terms")}>Terms & Conditions</span>
        </div>
      </header>

      <div className="home-content">
        <div className="home-card">
          <h1>Apartment Visitor Management</h1>
          <p className="subtitle">Secure • Simple • Smart</p>

          <button
            className="btn primary"
            onClick={() => navigate("/apartment/register")}
          >
            Apartment Registration
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/apartment/login")}
          >
            Apartment Login
          </button>

          <button
            className="btn visitor"
            onClick={() => navigate("/visitor/login")}
          >
            Visitor Entry
          </button>
        </div>
      </div>

      <footer className="home-footer">
        © 2026 Apartment Security • All Rights Reserved
      </footer>
    </div>
  );
}