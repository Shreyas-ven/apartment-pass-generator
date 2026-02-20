import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
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
  );
}
