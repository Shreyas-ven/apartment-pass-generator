import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apartmentLogin } from "../services/api";
import "./Form.css";

export default function ApartmentLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    const res = await apartmentLogin(form);

    alert(res.message || res.error);

    if (res && !res.error) {
      const apartmentId = res.apartment.apartment_id;
      navigate(`/dashboard/${apartmentId}`);
    }
  };

  return (
    <div
      className="form-container"
      style={{ backgroundImage: "url(/login-images.jpg)" }}
    >
      {/* ✅ Header */}
      <header className="login-header">
        <div className="logo">Apartment Pass Generator</div>

        <div className="header-right">
          <span>New User?</span>
          <button onClick={() => navigate("/apartment/register")}>
            Register
          </button>
        </div>
      </header>

      <div className="form-overlay"></div>

      <div className="form-card">
        <h2>Apartment Login</h2>

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}