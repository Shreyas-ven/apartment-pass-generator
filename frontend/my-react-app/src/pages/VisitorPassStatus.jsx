import { useState } from "react";
import { checkVisitorStatus } from "../services/api";
import "./Form.css";

export default function VisitorPassStatus() {

  const [passKey, setPassKey] = useState("");
  const [data, setData] = useState(null);

  const checkStatus = async () => {
    const res = await checkVisitorStatus(passKey);

    if (res.error) {
      alert(res.error);
    } else {
      setData(res);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Check Visitor Pass</h2>

        <input
          placeholder="Enter Pass Key"
          value={passKey}
          onChange={(e) => setPassKey(e.target.value)}
        />

        <button onClick={checkStatus}>Check Status</button>

        {data && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Block:</b> {data.block}</p>
            <p><b>Room:</b> {data.room}</p>
            <p><b>Purpose:</b> {data.purpose}</p>
            <p><b>Status:</b> {data.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
