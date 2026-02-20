import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { visitorLogin } from "../services/api";
import "./Form.css";

export default function VisitorLogin() {
  const [form, setForm] = useState({
    name: "",
    apartment_id: "",
    phone: "",
    block: "",
    room: "",
    purpose: ""
  });

  const navigate = useNavigate();

  const submit = async () => {

  if (!form.name || !form.phone || !form.block || !form.room || !form.purpose) {
    alert("Please fill all required fields");
    return;
  }

  const res = await visitorLogin(form);

  if (res.pass_key) {
    alert(`Entry Successful!\nYour Pass Key: ${res.pass_key}`);
  } else {
    alert(res.message);
  }
};


  const checkPass = () => {
    navigate("/visitor/pass");
  };

 return (
  <div className="form-container">

    <div className="card-wrapper">
      {/* Card */}
      <div className="form-card">
        <h2>Visitor Entry</h2>

        <input
          placeholder="Visitor Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Apartment Block"
          value={form.block}
          onChange={(e) => setForm({ ...form, block: e.target.value })}
        />

        <input
          placeholder="Room / Flat Number"
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
        />

        <input
          placeholder="Purpose of Visit"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />

        <input
        placeholder="Apartment ID"
        value={form.apartment_id}
        onChange={(e) => setForm({ ...form, apartment_id: e.target.value })}
      />

        <button onClick={submit}>Submit Entry</button>
      </div>

      

      {/* Button BELOW card */}
      <button className="pass-btn" onClick={checkPass}>
        Check Status & Download Pass
      </button>
    </div>

  </div>
);
}
