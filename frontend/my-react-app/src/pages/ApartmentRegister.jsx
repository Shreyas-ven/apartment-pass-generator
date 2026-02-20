import { useState } from "react";
import { apartmentRegister } from "../services/api";
import "./Form.css";

export default function ApartmentRegister() {
  const [form, setForm] = useState({});

  const submit = async () => {
    const res = await apartmentRegister(form);
    alert(res.message || res.error);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Apartment Registration</h2>

        <input
          placeholder="Apartment Name"
          onChange={(e) =>
            setForm({ ...form, apartment_name: e.target.value })
          }
        />

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

        <input
         placeholder="Location"
        onChange={(e) =>
        setForm({ ...form, location: e.target.value })
          }
        />

        <input
          placeholder="State"
          onChange={(e) =>
          setForm({ ...form, state: e.target.value })
          }
          />

        <input
        placeholder="Country"
        onChange={(e) =>
        setForm({ ...form, country: e.target.value })
      }
      />

        <input
        placeholder="Owner Phone Number"
        onChange={(e) =>
        setForm({ ...form, owner_phone: e.target.value })
      }
      />

        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}
