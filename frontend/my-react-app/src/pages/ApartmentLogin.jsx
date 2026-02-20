import { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ added
import { apartmentLogin } from "../services/api";
import "./Form.css";

export default function ApartmentLogin() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();   // ✅ added

  const submit = async () => {
  const res = await apartmentLogin(form);

  alert(res.message || res.error);

  if (res && !res.error) {

    // ✅ extract apartment id from response
    const apartmentId = res.apartment.apartment_id;

    // ✅ redirect WITH id in URL
    navigate(`/dashboard/${apartmentId}`);
  }
};

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Apartment Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}
