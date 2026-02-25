import { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS
import { apartmentRegister } from "../services/api";
import "./Form.css";

export default function ApartmentRegister() {
  const navigate = useNavigate();   // ✅ ADD THIS

  const initialState = {
    apartment_name: "",
    email: "",
    password: "",
    location: "",
    state: "",
    country: "",
    owner_phone: ""
  };

  const [form, setForm] = useState(initialState);

  const submit = async () => {
    const res = await apartmentRegister(form);

    alert(res.message || res.error);

    if (res.message) {
      setForm(initialState);
    }
  };

  return (
    <div
      className="form-container"
      style={{ backgroundImage: "url(/login-images.jpg)" }}   // ✅ SAME IMAGE
    >
      {/* ✅ Header */}
      <header className="login-header">
        <div className="logo">Apartment Pass Generator</div>

        <div className="header-right">
          <span>Already Registered?</span>
          <button onClick={() => navigate("/apartment/login")}>
            Login
          </button>
        </div>
      </header>

      {/* ✅ Blur + Dark Overlay */}
      <div className="form-overlay"></div>

      {/* ✅ Card */}
      <div className="form-card">
        <h2>Apartment Registration</h2>

        <input
          placeholder="Apartment Name"
          value={form.apartment_name}
          onChange={(e) =>
            setForm({ ...form, apartment_name: e.target.value })
          }
        />

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

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="State"
          value={form.state}
          onChange={(e) =>
            setForm({ ...form, state: e.target.value })
          }
        />

        <input
          placeholder="Country"
          value={form.country}
          onChange={(e) =>
            setForm({ ...form, country: e.target.value })
          }
        />

        <input
          placeholder="Owner Phone Number"
          value={form.owner_phone}
          onChange={(e) =>
            setForm({ ...form, owner_phone: e.target.value })
          }
        />

        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}